// const { admin } = require('../admin');

const sortLeaderboardYearTop100 = () => new Promise(((resolve, reject) => {
  const { admin, leaderboardDb } = require('../admin');

  let position = 0;
  //  let lastPoints = null;
  //  let equalUsers = [];

  admin.database(leaderboardDb).ref('yearLeaderboardPoints')
    .orderByChild('tP')
    .limitToLast(100)
    .once('value', (snapshot) => {
      const snapshotLength = snapshot.numChildren();

      const value = snapshot.val();

      const valuesArray = [];

      Object.keys(value).map((key) => {
        valuesArray.push({ key, tP: value[key].tP, bal: value[key].bal });
        return null;
      });

      valuesArray.sort((a, b) => {
        if (a.tP === b.tP) {
          return b.bal - a.bal;
        }

        return b.tP - a.tP;
      });

      const leaderboardUpdates = {};
      //  const usersUpdates = {};

      for (let i = 0; i < snapshotLength; i += 1) {
        const pos = snapshotLength - position;

        position += 1;

        if (valuesArray[pos] && valuesArray[pos].key) {
          leaderboardUpdates[`${valuesArray[pos].key}/pos`] = pos + 1;
        } else {
        //  console.log(pos);
        //  console.log(valuesArray[pos]);
        }

      //  leaderboardUpdates[`${valuesArray[pos].key}/pos`] = pos + 1;
        //    usersUpdates[`${valuesArray[pos].key}/pos`] = pos + 1;
      }

    //  admin.database().ref('leaderboard/year').update(leaderboardUpdates);
      admin.database(leaderboardDb).ref('leaderboard/year').update(leaderboardUpdates);

      /*  snapshot.forEach((childSnapshot) => {
        const { tP, bal } = childSnapshot.val();
        //  const pos = snapshotLength - position;

        if (lastPoints === tP || tP === null || tP === undefined) {
          equalUsers.push({ key: childSnapshot.key, tP, bal });
        } else {
          equalUsers.sort((a, b) => {
            if (a.bal && b.bal) {
              return parseInt(a.bal, 10) - parseInt(b.bal, 10);
            } if (a.bal) {
              return true;
            }
            return false;
          });

          equalUsers.map((user) => {
            const pos = snapshotLength - position;

            admin.database().ref(`leaderboard/year/${user.key}`).update({
              pos,
            });

            position += 1;
            return null;
          });
          const pos = snapshotLength - position;

          admin.database().ref(`leaderboard/year/${childSnapshot.key}`).update({
            pos,
          });

          position += 1;
          equalUsers = [];
        }
        lastPoints = tP;
      });

      equalUsers.sort((a, b) => {
        if (a.bal && b.bal) {
          return parseInt(a.bal, 10) - parseInt(b.bal, 10);
        } if (a.bal) {
          return true;
        }
        return false;
      });

      equalUsers.map((user) => {
        const pos = snapshotLength - position;

        admin.database().ref(`leaderboard/year/${user.key}`).update({
          pos,
        });

        position += 1;
        return null;
      }); */
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
}));

module.exports = sortLeaderboardYearTop100;
