import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'react-i18next';

import Joyride, {
  CallBackProps, STATUS,
} from 'react-joyride';

/* import {
  Row,
  Col,
  NavLink,
  TabPane,
  TabContent,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
} from 'reactstrap'; */

import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import NavLink from 'reactstrap/lib/NavLink';
import Media from 'reactstrap/lib/Media';
import Button from 'reactstrap/lib/Button';
import TabPane from 'reactstrap/lib/TabPane';
import TabContent from 'reactstrap/lib/TabContent';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';

import LoadingPage from '../UI/Loading';
import BlockedPage from '../UI/Blocked';

import MyInfo from './MyInfo';
import NewGame from './NewGame';
import ShopBonus from './ShopBonus';
// import LevelProgress from './LevelProgress';
import RoomsTable from './RoomsTable';
import BonusPage from './BonusPage';
import BuyPage from './BuyPage';
// import SendMoneyToFriend from './SendMoneyToFriend';
import TopPage from './TopPage';
import Tournaments from './Tournaments';
import TournamentsHistory from './TournamentsHistory';
import ContactSupport from '../ContactSupport';
import MoneyHistory from './MoneyHistory';
import BannedUsers from './BannedUsers';
// import OnlineUsers from './OnlineUsers';
import Friends from './Friends';
import IgnoredUsers from './IgnoredUsers';
import Achievements from './Achievements';

import CustomTooltip from './CustomTooltip';
import SoundButton from '../UI/SoundButton';
import LanguageSelect from '../UI/LanguageSelect';

import Notification from '../Notification';

import 'react-circular-progressbar/dist/styles.css';

// import logo from '../../../images/zole-logo.png';
import fast from '../../../images/icons/aatraa_istaba.svg';

// import lastRoundImg from '../../../images/icons/quit_round.png';
// import quitRoundImg from '../../../images/icons/last_round.png';
import helpImg from '../../../images/icons/help2.png';
import quickHelpImg from '../../../images/icons/quick_help.png';
import moneyHistoryImg from '../../../images/icons/money_history.png';
import blockedUsersImg from '../../../images/icons/blocked_users.png';
import gameHelpImg from '../../../images/icons/game_help.png';
import coinImg from '../../../images/coin.svg';
import closeImg from '../../../images/icons/close.png';
import config from '../../../constants/config';
import defaultImage from '../../../images/Game/defaultImage.jpg';

// import pointsImage from '../../../images/points.jpg';
// import trumpjiImage from '../../../images/trumpji.jpg';

import logoutImg from '../../../images/Menu/logout.svg';

import chatInSound from '../../../sounds/chat_notification.wav';
// import buttonClickedSound from '../../../sounds/click_feedback.flac';

import NewVersion from './NewVersion';

const currentVersion = require('./../../../../package.json').version;

const GameTypeMap = {
  "P": "P",
  "PM": "PM",
  "G": "G",
  "MG": "MG"
};

const GameBetMap = {
  "1:1": "1:1",
  "1:5": "1:5",
  "1:10": "1:10",
  "1:25": "1:25",
  "1:50": "1:50",
  "1:100": "1:100",
  "1:500": "1:500",
  "1:1000": "1:1000",
  "1:5000": "1:5000",
  "1:10000": "1:10000"
};


class Menu extends React.Component {
  static propTypes = {
    rooms: PropTypes.shape(),
    myRooms: PropTypes.shape(),
    leaderboard: PropTypes.shape(),
    myLeaderboard: PropTypes.shape(),
    tournaments: PropTypes.shape(),
    tournamentPlayers: PropTypes.shape(),
    myTournamentsData: PropTypes.shape(),
    //  myTournamentsData2: PropTypes.shape(),
    tournamentsHistory: PropTypes.shape(),
    tournamentsHistoryPlayers: PropTypes.shape(),
    lastRoom: PropTypes.string,
    bannedUsers: PropTypes.shape(),
    bannedUsersCount: PropTypes.number,
  //  onlineUsersLazy: PropTypes.shape(),
    userSettings: PropTypes.shape(),
    //  roomCount: PropTypes.number,
    //  userCount: PropTypes.number,
    joinRoom: PropTypes.func.isRequired,
    createRoom: PropTypes.func.isRequired,
    uid: PropTypes.string,
    loadingProgress: PropTypes.number.isRequired,
    member: PropTypes.shape().isRequired,
    loading: PropTypes.bool.isRequired,
    spinWheel: PropTypes.func.isRequired,
    claimSpin: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    //  handleFBLogin: PropTypes.func.isRequired,
    //  fetchPositionInLeaderboard: PropTypes.func.isRequired,
    //  fetchLeaderboard: PropTypes.func.isRequired,
    sendMoney: PropTypes.func.isRequired,
    joinTournament: PropTypes.func.isRequired,
    joinTournamentRoom: PropTypes.func.isRequired,
    fetchTournamentPlayers: PropTypes.func.isRequired,
    fetchTournamentsHistory: PropTypes.func.isRequired,
    fetchTournamentHistory: PropTypes.func.isRequired,
    resetErrorNotif: PropTypes.func.isRequired,
    submitError: PropTypes.func.isRequired,
    errorNotification: PropTypes.string,
    ignoredMessageName: PropTypes.string,
    showNotification: PropTypes.func.isRequired,
    lastJoinedRoom: PropTypes.string,
    resetCloseErrorSubmit: PropTypes.func.isRequired,
    closeErrorSubmit: PropTypes.bool.isRequired,
    buyTournamentMoney: PropTypes.func.isRequired,
    cancelWaitRoom: PropTypes.func.isRequired,
    leaveTournament: PropTypes.func.isRequired,
    initFBPayment: PropTypes.func.isRequired,
    fbPaymentCallback: PropTypes.func.isRequired,
    initDraugiemPayment: PropTypes.func.isRequired,
    disableFirstTimeNotif: PropTypes.func.isRequired,
    disableTutorial: PropTypes.func.isRequired,
    sendSupportMessage: PropTypes.func.isRequired,
    setSupportAsRead: PropTypes.func.isRequired,
    fetchBalanceHistory: PropTypes.func.isRequired,
    fetchFBFriends: PropTypes.func.isRequired,
    fetchIgnoredPlayers: PropTypes.func.isRequired,
    unBlockUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    fetchLeaderboard: PropTypes.func.isRequired,
    fetchLeaderboardYear: PropTypes.func.isRequired,
    fetchLeaderboardMonth: PropTypes.func.isRequired,
    fetchLeaderboardWeek: PropTypes.func.isRequired,
    fetchLeaderboardDaily: PropTypes.func.isRequired,
    fetchPositionInLeaderboard: PropTypes.func.isRequired,
    fetchPositionInLeaderboardYear: PropTypes.func.isRequired,
    fetchPositionInLeaderboardMonth: PropTypes.func.isRequired,
    fetchPositionInLeaderboardWeek: PropTypes.func.isRequired,
    fetchPositionInLeaderboardDaily: PropTypes.func.isRequired,
    initStripePayment: PropTypes.func.isRequired,
    fetchAchievements: PropTypes.func.isRequired,
  //  fetchOnlineUsersLazy: PropTypes.func.isRequired,
  //  changeSortDirection: PropTypes.func.isRequired,
  //  changeSortFilter: PropTypes.func.isRequired,
    readSupportChat: PropTypes.func.isRequired,
    closePrivateRoomPassword: PropTypes.func.isRequired,
    leaveRoom: PropTypes.func.isRequired,
    toggleNewGameParameter: PropTypes.func.isRequired,
    setNewBet: PropTypes.func.isRequired,
    setCheckedVersion: PropTypes.func.isRequired,
    playButtonSound: PropTypes.func.isRequired,
  //  userAchievements: PropTypes.shape({}),

    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  }

  static defaultProps = {
    uid: '',
    errorNotification: '',
    ignoredMessageName: '',
    leaderboard: [],
    rooms: {},
    myRooms: {},
    myLeaderboard: {},
    tournaments: {},
    tournamentPlayers: {},
    myTournamentsData: {},
    //  myTournamentsData2: {},
    tournamentsHistory: {},
    tournamentsHistoryPlayers: {},
    lastRoom: {},
    lastJoinedRoom: '',
    bannedUsers: {},
    bannedUsersCount: 0,
    onlineUsersLazy: {},
    userSettings: {},
    //  roomCount: 0,
    //  userCount: 0,
  //  userAchievements: {},
  }

  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {
      activeTab: '1',
      helpTab: '1',
      rulesModalOpen: false,
      //  helpModalOpen: false,
      supportModalOpen: false,
      balanceHistoryModalOpen: false,
      run: false,
      //  showLoadingLogin: false,
      steps: [
        {
          disableBeacon: true,
          target: '.start-game-button',
          content: t('tutorial.startStep'),
        //  pacement: 'top',
        },
        /*  {
          disableBeacon: true,
          target: '.rules-button',
          content: t('tutorial.rulesStep'),
        }, */
        {
          disableBeacon: false,
          target: '.top-tab',
          content: t('tutorial.topStep'),
        //  pacement: 'bottom',
        },
        {
          disableBeacon: false,
          target: '.my-info-tab',
          content: t('tutorial.myInfoStep'),
        //  pacement: 'center',
        },
        {
          disableBeacon: false,
          target: '.tournaments-tab',
          content: t('tutorial.tournamentsStep'),
        //  pacement: 'bottom',
        },
        {
          disableBeacon: false,
          target: '.shop-tab',
          content: t('tutorial.shopStep'),
        //  pacement: 'top',
        },
        {
          disableBeacon: false,
          target: '.bonus-tab',
          content: t('tutorial.bonusStep'),
        //  pacement: 'right',
        },
      ],
      helpPageOpen: false,
      insufficientBalanceAmount: null,
      insufficientBalanceBet: null,
    };

    this.refetchLeaderboard = this.refetchLeaderboard.bind(this);
    this.newVersionChecked = this.newVersionChecked.bind(this);
    this.logout = this.logout.bind(this);
    this.chatInAudio = new Audio(chatInSound);
  //  this.buttonClickedAudio = new Audio(buttonClickedSound);
  }

  componentWillMount() {
    const { member } = this.props;

    if (member && member.firstTimeModal && !member.tutorialShown) {
      this.setState({ run: true });
    }

  //  setTimeout(() => {
  //    this.setState({ showLoadingLogin: true });
  //  }, 2000);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      member,
      errorNotification,
      insufficientBalanceAmount,
      insufficientBalanceBet,
      userSettings
    //  ignoredMessageName,
    } = this.props;

    const { openModal, modalType } = prevState;
    const { member: oldMember } = prevProps;

    if (errorNotification) {
      if (errorNotification === 'insufficient balance') {
        if (!(openModal && modalType === 'noBalanceMenu')) {
          this.UpdateModal(true, 'noBalanceMenu', null);
          this.setState({ insufficientBalanceAmount, insufficientBalanceBet })
        }
      } else if (errorNotification === 'pro room') {
        if (!(openModal && modalType === 'proRoomMenu')) {
          this.UpdateModal(true, 'proRoomMenu', null);
        }
      } else if (errorNotification === 'pro bet') {
        if (!(openModal && modalType === 'proBetMenu')) {
          this.UpdateModal(true, 'proBetMenu', null);
        }
      } else if (errorNotification === 'insuf bal tournament') {
        if (!(openModal && modalType === 'noBalanceTournament')) {
          this.UpdateModal(true, 'noBalanceTournament', null);
        }
      } else if (errorNotification === 'You ignored player') {
        if (!(openModal && modalType === 'youIgnoredPlayer')) {
          this.UpdateModal(true, 'youIgnoredPlayer', null);
        }
      } else if (errorNotification === 'Player ignored you') {
        if (!(openModal && modalType === 'playerIgnoredYou')) {
          this.UpdateModal(true, 'playerIgnoredYou', null);
        }
      }
    }

    if (member && member.lvlUpNotification) {
      if (!(openModal && modalType === 'levelUp')) {
        this.UpdateModal(true, 'levelUp', member.level);
      }
    }

    if (member && !member.lvlUpNotification && openModal && modalType === 'levelUp') {
      this.UpdateModal(false, '', null);
    }


    if(userSettings && userSettings.soundOn){
      if((!oldMember.supportChatStatus || oldMember.supportChatStatus.read === true) && member.supportChatStatus && member.supportChatStatus.read === false){
        this.chatInAudio.play();
      }
    }
  }

  logout = (e) => {
    e.preventDefault();
    const { logout, history } = this.props;
    logout().then(() => {
      history.push("/landing");
    });
  }

  toggleSupport = () => {
    const { supportModalOpen } = this.state;
    const { setSupportAsRead, member, readSupportChat, playButtonSound } = this.props;

    if (!supportModalOpen && member.supportChatStatus && !member.supportChatStatus.read) {
      playButtonSound();
      setSupportAsRead();
    }
    if (!supportModalOpen) {
      playButtonSound();
      readSupportChat();
    }
    this.setState({ supportModalOpen: !supportModalOpen });
  }

  toggleRules = () => {
    const { playButtonSound } = this.props;
    const { rulesModalOpen } = this.state;

    playButtonSound();
    this.setState({ rulesModalOpen: !rulesModalOpen });
  }

  toggleHelp = () => {
    const { playButtonSound } = this.props;
    //  const { helpPageOpen } = this.state;
    //  this.setState((prevState) => ( helpPageOpen: !prevState.helpPageOpen ));

    playButtonSound();

    this.setState(prevState => ({
      helpPageOpen: !prevState.helpPageOpen,
    }));
  }

  UpdateModal = (openModal, modalType, newLevel) => {
    this.setState({
      openModal, modalType, newLevel,
    });
  }

  getSteps = () => {
    const { t } = this.props;

    const steps = [
      {
        disableBeacon: true,
        target: '.start-game-button',
        content: t('tutorial.startStep'),
        //  pacement: 'top',
        disableOverlayClose: true,
      },
      /*  {
        disableBeacon: true,
        target: '.rules-button',
        content: t('tutorial.rulesStep'),
      }, */
      {
        disableBeacon: false,
        target: '.top-tab',
        content: t('tutorial.topStep'),
        //  pacement: 'bottom',
        disableOverlayClose: true,
      },
      {
        disableBeacon: false,
        target: '.my-info-tab',
        content: t('tutorial.myInfoStep'),
        //  pacement: 'center',
        disableOverlayClose: true,
      },
      {
        disableBeacon: false,
        target: '.tournaments-tab',
        content: t('tutorial.tournamentsStep'),
        //  pacement: 'bottom',
        disableOverlayClose: true,
      },
      {
        disableBeacon: false,
        target: '.shop-tab',
        content: t('tutorial.shopStep'),
        //  pacement: 'top',
        disableOverlayClose: true,
      },
      {
        disableBeacon: false,
        target: '.bonus-tab',
        content: t('tutorial.bonusStep'),
        //  pacement: 'right',
        disableOverlayClose: true,
      },
    ];
    this.setState({ steps });
    return null;
  }

  handleClickStart = (e) => {
    const { playButtonSound } = this.props;
    e.preventDefault();
    this.getSteps();
    //  .then(() => {

    playButtonSound();

    this.setState({
      run: true,
    });
  //  });
  };


  toggle = (tab) => {
    const { playButtonSound } = this.props;
    const { activeTab } = this.state;
    if (activeTab !== tab) {
    /*  if (tab === '1') {
        console.log('fetchFreeRooms');
        fetchFreeRooms();
      } else {
        console.log('cancelRoomListeners');
        cancelRoomListeners();
      } */

      playButtonSound();

      this.setState({
        activeTab: tab,
      });
    }
  }

  toggleHelpTab = (tab) => {
    const { playButtonSound } = this.props;
    const { helpTab } = this.state;

    playButtonSound();

    if (helpTab !== tab) {
      this.setState({
        helpTab: tab,
      });
    }
  }

  toggleBalanceHistory = () => {
    const { fetchBalanceHistory, playButtonSound } = this.props;

    playButtonSound();

    fetchBalanceHistory('today');
    this.setState(prevState => ({
      balanceHistoryModalOpen: !prevState.balanceHistoryModalOpen,
    }));
  }

  toggleBannedUsers = () => {
    const { playButtonSound } = this.props;
    playButtonSound();

    this.setState(prevState => ({
      bannedUsersModalOpen: !prevState.bannedUsersModalOpen,
    }));
  }

  //  toggleOnlineUsers = () => {
  //    this.setState(prevState => ({
  //      onlineUsersModalOpen: !prevState.onlineUsersModalOpen,
  //    }));
  //  }

  closeModal = () => {
    const { resetErrorNotif } = this.props;
    const { modalType } = this.state;
    if (modalType === 'noBalanceMenu' || modalType === 'proRoomMenu' || modalType === 'proBetMenu' || modalType === 'noBalanceTournament' || modalType === 'youIgnoredPlayer' || modalType === 'playerIgnoredYou') {
      resetErrorNotif();
    }
    this.setState({ openModal: false, modalType: '', insufficientBalanceAmount: null, insufficientBalanceBet: null });
  }

  handleJoyrideCallback = (data: CallBackProps) => {
    const { disableTutorial, member } = this.props;
    const { status, action } = data;

    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status) || action === 'close') {
      this.setState({ run: false });

      if (!member || !member.tutorialShown) {
        disableTutorial();
      }
    }
  };

  closeFirstTime = () => {
    const { disableFirstTimeNotif, member } = this.props;

    if (!member || !member.firstTimeModal) {
      disableFirstTimeNotif();
      if (document.getElementById('top-tab') && document.getElementById('top-tab').isSameNode) {
        this.getSteps();
        this.setState({
          run: true,
        });
      }
    }
  }


  refetchLeaderboard() {
    const { fetchLeaderboard, fetchPositionInLeaderboard } = this.props;
    fetchLeaderboard();
    fetchPositionInLeaderboard();
  }

  newVersionChecked(v) {
    const { setCheckedVersion } = this.props;
    setCheckedVersion(v);
  }

  /* playButtonSound = () => {
    const { userSettings } = this.props;

    if (userSettings && userSettings.soundOn) {
      this.buttonClickedAudio.play();
    }
  } */

  render() {
    const {
      uid,
      member,
      loading,
      createRoom,
      loadingProgress,
      joinRoom,
      rooms,
      myRooms,
      spinWheel,
      claimSpin,
      t,
      //  handleFBLogin,
      leaderboard,
      myLeaderboard,
      sendMoney,
      tournaments,
      tournamentPlayers,
      myTournamentsData,
      //  myTournamentsData2,
      joinTournament,
      joinTournamentRoom,
      fetchTournamentPlayers,
      fetchTournamentsHistory,
      fetchTournamentHistory,
      tournamentsHistory,
      tournamentsHistoryPlayers,
      resetErrorNotif,
      submitError,
      lastRoom,
      lastJoinedRoom,
      resetCloseErrorSubmit,
      closeErrorSubmit,
      showNotification,
      //  roomCount,
      //  userCount,
      buyTournamentMoney,
      cancelWaitRoom,
      leaveTournament,
      initFBPayment,
      initStripePayment,
      fbPaymentCallback,
      initDraugiemPayment,
      sendSupportMessage,
      setSupportAsRead,
      fetchBalanceHistory,
      bannedUsers,
      bannedUsersCount,
      //  onlineUsers,
    //  onlineUsersLazy,
      fetchFBFriends,
      fetchIgnoredPlayers,
      unBlockUser,
      ignoredMessageName,
      fetchLeaderboardYear,
      fetchLeaderboardMonth,
      fetchLeaderboardWeek,
      fetchLeaderboardDaily,
      fetchPositionInLeaderboardYear,
      fetchPositionInLeaderboardMonth,
      fetchPositionInLeaderboardWeek,
      fetchPositionInLeaderboardDaily,
      fetchAchievements,
    //  fetchOnlineUsersLazy,
    //  changeSortDirection,
    //  changeSortFilter,
      readSupportChat,
      privateRoomPassword,
      showPrivateRoomPassword,
      closePrivateRoomPassword,
      leaveRoom,
      toggleNewGameParameter,
      userSettings,
      setNewBet,
      closeLevelNotification,
      roomsCount,
      usersCount,
    //  userAchievements,
      playButtonSound,
    } = this.props;

    const {
      activeTab,
      helpTab,
      openModal,
      modalType,
      newLevel,
      steps,
      //  rulesModalOpen,
      //  helpModalOpen,
      supportModalOpen,
      run,
      //  showLoadingLogin,
      balanceHistoryModalOpen,
      bannedUsersModalOpen,
      helpPageOpen,
      insufficientBalanceAmount,
      insufficientBalanceBet,
    //  onlineUsersModalOpen,
    } = this.state;

    
    if (loading || (!member.uid)) {
      return (
        <Fragment>
          <LoadingPage loading={loading} loadingProgress={loadingProgress} />
          {/*  {showLoadingLogin && !member.uid && (
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '60%' }}>
              <p>
                L??dzu p??rliecinieties, ka rekl??mas blo????t??ji un POP UP blo????t??ji ir atsl??gti, lai
                pilnv??rt??gi var??tu sp??l??t Zoli un m????iniet piesl??gties v??lreiz.
              </p>
              {window && window.FB && (
                <Button
                  className="btn-facebook"
                  style={{ marginTop: 25, marginLeft: 'auto', marginRight: 'auto' }}
                  id="btn-social-login"
                  onClick={handleFBLogin}
                >
                  <span className="btn-facebook-icon" />
                  <span className="btn-facebook-text">Sign in with Facebook</span>
                </Button>
              )}
            </div>
          )}  */}
        </Fragment>
      );
    }

    if (member && member.blocked) {
      return (
        <BlockedPage banEndDate={member.banEndDate} banReason={member.banReason} />
      );
    }

    return (
      <Fragment>
        <Notification
          member={member}
          openModal={openModal}
          modalType={modalType}
          ignoredMessageName={ignoredMessageName}
          closeModal={this.closeModal}
          resetErrorNotif={resetErrorNotif}
          newLevel={newLevel}
          switchTabs={this.toggle}
          closeLevelNotification={closeLevelNotification}
          insufficientBalanceAmount={insufficientBalanceAmount}
          insufficientBalanceBet={insufficientBalanceBet}
        />

        <SoundButton uid={member.uid} />

        <LanguageSelect />

        {!config.isInAppFrame() && (<a href="#" title={t('menu.logout')} className="logout-button" onClick={this.logout}><img src={logoutImg} alt={t('menu.logout')} /></a>)}

        {document.getElementById('top-tab') && document.getElementById('top-tab').isSameNode && (
          <Joyride
            tooltipComponent={CustomTooltip}
            callback={this.handleJoyrideCallback}
            steps={steps}
            continuous
            showProgress
            showSkipButton
            scrollToFirstStep
            spotlightClicks
            spotlightPadding={0}
            run={run}
            styles={{
              options: {
                zIndex: 10000,
                primaryColor: 'linear-gradient(180deg,#b4ec51,#429321)',
              },
            }}
          />
        )}

        <div className="lobby-background" />
        {!helpPageOpen ? (
          <>

            <Row className="content">
              <Col sm="3" style={{ marginTop: 50 }}>
                <Row className="menu-player-info">
                  <Col xs="6" sm="6" className="menu-player-info-left">
                    <div className="menu-player-avatar">
                      <img src={member && member.photo ? member.photo : defaultImage} alt="" />
                    </div>
                    <div className="menu-player-level-wrapper">
                      <div className="menu-player-level">
                        <div className="menu-player-level-text">
                          {member && member.level !== undefined && member.level}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="6" sm="6" className="menu-player-info-right">
                    <Row style={{ marginTop: 5, marginBottom: 5 }}>
                      <div className="menu-player-name">{member && member.name}</div>
                    </Row>
                    <Row style={{ marginTop: 5, marginBottom: 5 }}>
                      {member && member.balance !== undefined && (
                      <div className="menu-player-balance">
                        <Media src={coinImg} className="menu-player-balance-coin" />
                        <div className="menu-player-balance-text">
                          {member.balance}
                        </div>
                      </div>
                      )}
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <NewGame
                      GameBetMap={GameBetMap}
                      createRoom={createRoom}
                      lvl={member.level}
                      changeTab={this.toggle}
                      member={member}
                      privateRoomPassword={privateRoomPassword}
                      showPrivateRoomPassword={showPrivateRoomPassword}
                      closePrivateRoomPassword={closePrivateRoomPassword}
                      toggleNewGameParameter={toggleNewGameParameter}
                      setNewBet={setNewBet}
                      userSettings={userSettings}
                      joinedRoom={rooms && member && member.joinedRooms && (rooms[Object.keys(member.joinedRooms)[0]]) ? rooms[Object.keys(member.joinedRooms)[0]] : null}
                      playButtonSound={playButtonSound}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" className="online-stats">
                    {t('menu.onlineCount')}: <span>{`${usersCount} ${t('menu.players')}, ${roomsCount} ${t('menu.rooms')}`}</span>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <ShopBonus changeTab={this.toggle} member={member} activeTab={activeTab}/>
                  </Col>
                </Row>
              </Col>
              <Col sm="9">

                <div className="logo-wrapper">
                  <div className="logo" />
                </div>

                <Row className="tabs" style={{ marginTop: 90, padding: '25px 15px' }}>
                  <Col sm="12">
                    <Row style={{ border: 0 }}>

                      <Col xs="3" sm="3" className="menu-topTab">
                        <div className={`menu-topTab-wrapper ${activeTab === '1' && 'active'}`}>
                          <NavLink
                            className="menu-topTab-link"
                            onClick={() => { this.toggle('1'); }}
                          >
                            {t('menu.rooms')}
                          </NavLink>
                        </div>
                      </Col>
                      <Col xs="3" sm="3" id="top-tab" className="menu-topTab top-tab">
                        <div className={`menu-topTab-wrapper ${activeTab === '2' && 'active'}`}>
                          <NavLink
                            className="menu-topTab-link"
                            onClick={() => { this.toggle('2'); }}
                          >
                            {t('menu.top')}
                          </NavLink>
                        </div>
                      </Col>
                      <Col xs="3" sm="3" className="menu-topTab my-info-tab">
                        <div className={`menu-topTab-wrapper ${activeTab === '3' && 'active'}`}>
                          <NavLink
                            className="menu-topTab-link"
                            onClick={() => { this.toggle('3'); }}
                          >
                            {t('menu.myInfo')}
                          </NavLink>
                        </div>
                      </Col>
                      <Col xs="3" sm="3" className="menu-topTab tournaments-tab">
                        <div className={`menu-topTab-wrapper ${activeTab === '6' && 'active'}`}>
                          <NavLink
                            className="menu-topTab-link"
                            onClick={() => { this.toggle('6'); }}
                          >
                            {t('menu.tournaments')}
                          </NavLink>
                        </div>
                      </Col>

                    </Row>
                  </Col>
                </Row>

                <TabContent activeTab={activeTab}>
                  <TabPane className="main-tab-pane" tabId="1">
                    <Row>
                      <Col xs="12" sm="12">
                      {activeTab && activeTab === '1' && (
                        <RoomsTable
                          userSettings={userSettings}
                          GameBetMap={GameBetMap}
                          GameTypeMap={GameTypeMap}
                          rooms={rooms}
                          myRooms={myRooms}
                          joinRoom={joinRoom}
                          level={member.level}
                          uid={(uid && uid.toString()) || ''}
                          leaveRoom={leaveRoom}
                          member={member}
                          joinedRooms={member.joinedRooms}
                          privateRoomPassword={privateRoomPassword}
                          playButtonSound={playButtonSound}
                        />
                      )}
                      </Col>
                    {/*  <Col xs="4" sm="4">
                        <OnlineUsers
                          onlineUsers={onlineUsersLazy}
                          member={member}
                          fetchOnlineUsersLazy={fetchOnlineUsersLazy}
                          changeSortFilter={changeSortFilter}
                          changeSortDirection={changeSortDirection}
                        />
                      </Col>  */}
                    </Row>
                  </TabPane>
                  <TabPane className="main-tab-pane" tabId="2">
                    <Row>
                      <Col sm="12">
                      {activeTab && activeTab === '2' && (
                        <TopPage
                          leaderboardData={leaderboard}
                          myLeaderboard={myLeaderboard}
                          refetchLeaderboard={this.refetchLeaderboard}
                          fetchLeaderboardYear={fetchLeaderboardYear}
                          fetchLeaderboardMonth={fetchLeaderboardMonth}
                          fetchLeaderboardWeek={fetchLeaderboardWeek}
                          fetchLeaderboardDaily={fetchLeaderboardDaily}
                          fetchPositionInLeaderboardYear={fetchPositionInLeaderboardYear}
                          fetchPositionInLeaderboardMonth={fetchPositionInLeaderboardMonth}
                          fetchPositionInLeaderboardWeek={fetchPositionInLeaderboardWeek}
                          fetchPositionInLeaderboardDaily={fetchPositionInLeaderboardDaily}
                          playButtonSound={playButtonSound}
                        />
                      )}
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane className="main-tab-pane" tabId="3">
                    {activeTab && activeTab === '3' && (
                      <MyInfo
                        member={member}
                        myTournamentsData={myTournamentsData}
                        leaderboardData={leaderboard && leaderboard.leaderboard}
                        changeTab={this.toggle}
                        playButtonSound={playButtonSound}
                      />
                    )}
                  </TabPane>
                  <TabPane className="main-tab-pane" tabId="4">
                    <Row>
                      <Col sm="12">
                        <BonusPage
                          member={member}
                          spinWheel={spinWheel}
                          claimSpin={claimSpin}
                          changeTab={this.toggle}
                          sendMoney={sendMoney}
                          playButtonSound={playButtonSound}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane className="main-tab-pane" tabId="5">
                    <Row>
                      <Col sm="12">
                        <BuyPage
                          member={member}
                          initFBPayment={initFBPayment}
                          fbPaymentCallback={fbPaymentCallback}
                          sendMoney={sendMoney}
                          initDraugiemPayment={initDraugiemPayment}
                          playButtonSound={playButtonSound}
                          initStripePayment={initStripePayment}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  {activeTab && activeTab === '6' && (
                  <TabPane className="main-tab-pane" tabId="6">
                    <Row>
                      <Col sm="12">
                        <Tournaments
                          member={member}
                          tournaments={tournaments}
                          tournamentPlayers={tournamentPlayers}
                          myTournamentsData={myTournamentsData}
                          joinTournament={joinTournament}
                          joinTournamentRoom={joinTournamentRoom}
                          fetchTournamentPlayers={fetchTournamentPlayers}
                          buyTournamentMoney={buyTournamentMoney}
                          cancelWaitRoom={cancelWaitRoom}
                          leaveTournament={leaveTournament}
                          changeTab={this.toggle}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  )}
                  {activeTab && activeTab === '7' && (
                  <TabPane className="main-tab-pane" tabId="7">
                    <Row>
                      <Col sm="12">
                        <TournamentsHistory
                          member={member}
                          tournamentsHistory={tournamentsHistory}
                          tournamentsHistoryPlayers={tournamentsHistoryPlayers}
                          fetchTournamentsHistory={fetchTournamentsHistory}
                          fetchTournamentHistory={fetchTournamentHistory}
                          changeTab={this.toggle}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  )}
                  {activeTab && activeTab === '9' && (
                  <TabPane className="main-tab-pane" tabId="9">
                    <Row>
                      <Col sm="12">
                        <Friends
                          member={member}
                          changeTab={this.toggle}
                          fetchFBFriends={fetchFBFriends}
                          fbFriends={member.fbFriends}
                          sendMoney={sendMoney}
                          playButtonSound={playButtonSound}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  )}
                  {activeTab && activeTab === '10' && (
                  <TabPane className="main-tab-pane" tabId="10">
                    <Row>
                      <Col sm="12">
                        <IgnoredUsers
                          member={member}
                          changeTab={this.toggle}
                          fetchIgnoredPlayers={fetchIgnoredPlayers}
                          unBlockUser={unBlockUser}
                          playButtonSound={playButtonSound}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  )}
                  {activeTab && activeTab === '11' && (
                  <TabPane className="main-tab-pane" tabId="11">
                    <Row>
                      <Col sm="12">
                        <Achievements
                          member={member}
                          changeTab={this.toggle}
                          fetchAchievements={fetchAchievements}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  )}
                </TabContent>
              </Col>
            </Row>
            <Row className="bottom-bar">
              <Col sm="12" className="bottom-bar-links">
                  <a href="#" className={`bottom-bar-links-help ${member.supportChatStatus && member.supportChatStatus.read === false ? 'incoming':''}`} onClick={(e)=> { e.preventDefault(); this.toggleSupport(e); }}>
                    <Media src={helpImg} />
                    <span>
                      {t('menu.help')}
                    </span>
                    {supportModalOpen && (
                      <ContactSupport
                        modalOpen={supportModalOpen}
                        readSupportChat={readSupportChat}
                        toggle={this.toggleSupport}
                        uid={member.uid}
                        name={member.name}
                        supportChat={member.supportChat}
                        supportChatStatus={member.supportChatStatus}
                        submitError={submitError}
                        lastRoom={lastRoom}
                        lastJoinedRoom={lastJoinedRoom}
                        resetClose={resetCloseErrorSubmit}
                        closeErrorSubmit={closeErrorSubmit}
                        showNotification={showNotification}
                        sendSupportMessage={sendSupportMessage}
                        setSupportAsRead={setSupportAsRead}
                      />
                    )}
                  </a>
                  <a href="#" onClick={(e)=> { e.preventDefault(); this.handleClickStart(e); }}>
                    <Media src={quickHelpImg} />
                    <span>
                      {t('menu.tutorial')}
                    </span>
                  </a>
                  <a href="#" onClick={(e)=> { e.preventDefault(); this.toggleBalanceHistory(e); }}>
                    <Media className="balance-hist-ico" src={moneyHistoryImg} />
                    <span>
                      {t('menu.moneyHistory')}
                    </span>
                  </a>
                  <a href="#" onClick={(e)=> { e.preventDefault(); this.toggleBannedUsers(e); }}>
                    <Media src={blockedUsersImg} />
                    <span>
                      {t('menu.bannedUsers')}
                    </span>
                  </a>
                  <a href="#" onClick={(e)=> { e.preventDefault(); this.toggleHelp(e); }}>
                    <Media src={gameHelpImg} />
                    <span>
                      {t('menu.helpPage')}
                    </span>
                  </a>

                  <div className="version-wrapper">
                    <div className="version">
                      Draxo Games 2020, {`v${currentVersion}`}
                    </div>
                  </div>
              </Col>

            </Row>
          </>
        ) : (
          <div className="rules-page">
            <Row className="rules-page-header">
              <Col>
                <Row>
                  <Col sm="6">

                  </Col>
                  <Col sm="6">
                    <Button style={{ float: 'right' }} className="help-button" onClick={this.toggleHelp}>
                      <Media src={closeImg} className="notification-header-close" alt="X" />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col sm={{size: 2, offset: 2}} className="rules-page-tab">
                    <div className={`rules-page-tab-wrapper ${helpTab === '1' && 'active'}`}>
                      <NavLink
                        className="rules-page-tab-link"
                        onClick={() => { this.toggleHelpTab('1'); }}
                      >
                        {t('menu.rules')}
                      </NavLink>
                    </div>
                  </Col>
                  <Col sm="2" className="rules-page-tab">
                    <div className={`rules-page-tab-wrapper ${helpTab === '2' && 'active'}`}>
                      <NavLink
                        className="rules-page-tab-link"
                        onClick={() => { this.toggleHelpTab('2'); }}
                      >
                        Apz??m??jumi
                      </NavLink>
                    </div>
                  </Col>
                  <Col sm="2" className="rules-page-tab">
                    <div className={`rules-page-tab-wrapper ${helpTab === '3' && 'active'}`}>
                      <NavLink
                        className="rules-page-tab-link"
                        onClick={() => { this.toggleHelpTab('3'); }}
                      >
                        {t('menu.money')}
                      </NavLink>
                    </div>
                  </Col>
                  <Col sm="2" className="rules-page-tab">
                    <div className={`rules-page-tab-wrapper ${helpTab === '4' && 'active'}`}>
                      <NavLink
                        className="rules-page-tab-link"
                        onClick={() => { this.toggleHelpTab('4'); }}
                      >
                        {t('menu.levels')}
                      </NavLink>
                    </div>
                  </Col>
                  <Col sm="2" className="rules-page-tab">
                    <div className={`rules-page-tab-wrapper ${helpTab === '5' && 'active'}`}>
                      <NavLink
                        className="rules-page-tab-link"
                        onClick={() => { this.toggleHelpTab('5'); }}
                      >
                        {t('menu.faq')}
                      </NavLink>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="rules-page-content">
              <Col sm="12">
                <TabContent className="rules-page-content-tab" activeTab={helpTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                        <b className="rules-page-text-header">K??rtis un to stiprumi </b>
                        <p>
                          Sp??l?? izmanto 26 k??rtis. K??ravi, s??kot no d????a l??dz sept??tniekam, p??r??jie masti no d????a l??dz dev??tniekam.
                        </p>
                        <b className="rules-page-text-header">Sp??les uzs??k??ana</b>
                        <p>Sp??li var uzs??kt divos veidos:</p>
                        <ul>
                          <li>
                            Labaj?? pus?? eso??aj?? izv??ln?? izv??l??ties v??lamo likmi un spiest pogu '<b>S??kt sp??li</b>', p??c k?? autom??tiski atv??rsies izveidot?? istaba. Tad sagaidi, kam??r Tev pievienosies v??l 2 sp??l??t??ji un sp??le autom??tiski uzs??ksies.
                          </li>
                          <li>
                            Var pievienoties sp??l??m, kas redzamas log?? '<b>Kop??j?? istaba</b>', nospie??ot uz pogas '<b>Pievienoties</b>'.
                          </li>
                        </ul>
                        <b className="rules-page-text-yellow">Sp??les veidi</b>
                        <p>Iz????ir vair??kus p??c b??t??bas at????ir??gus zoles sp??l????anas veidus:</p>
                        <ul>
                          <li>Parast?? zole (atz??m??ta sp????u izv??ln?? ar P) ??? m??r??is sav??kt vismaz 61 punktu.</li>
                          <li>Maz?? zole (atz??m??ta sp????u izv??ln?? M) ??? m??r??is nesav??kt nevienu sti??i (k??rti);</li>
                          <li>Galdi???? (atz??m??ta sp????u izv??ln?? ar G) ??? m??r??is sav??kt p??c iesp??jas maz??k sti??u.</li>
                        </ul>
                        <b className="rules-page-text-yellow">Sp??les gaita</b>
                        <p>
                K??rtis tiek izdal??tas autom??tiski. Katram sp??l??t??jam sec??gi tiek dota iesp??ja s??kt sp??li. Sp??l??t??js vai nu uz??em 2 galda k??rtis vai ar?? ???lai?? gar??m??? g??jienu. P??c tam to pa??u dara n??ko??ais un, ja ar?? tas ???lai?? gar??m', tad beidzot tre??ais. Tam, kur?? atkl??j sp??li (??o sp??l??t??ju sauc par 'lielo???) ir j??sp??l?? vienam pret p??r??jiem diviem, kuri savus sti??us skaita kop??.
                        </p>
                        <p>
                ???Lielais??? pa??em no galda 2 k??rtis un pievieno t??s pie sav??m. No ????m 10 k??rt??m vi???? var nolikt (??argon?? - ???norakt') jebkuras 2 k??rtis p??c savas izv??les, k?? tas vi??am izdev??g??k. Pirmo g??jienu izdara tas sp??l??t??js, kuram pirmajam bija iesp??ja izv??l??ties 2 galda k??rtis (bija'pirm?? roka???). Gad??jum??, ja neviens sp??les dal??bnieks nev??las atkl??t sp??li un visi nopas??, tad iesp??jami divi varianti:
                        </p>
                        <ul>
                          <li>sp??l?? ar galdi??a variantu tiek izsp??l??ts galdi????;</li>
                          <li>parastaj?? zoles variant?? tiek izveidota kop??j?? pule (kas v??l??k dod papildus punktus n??kam??s partijas uzvar??t??jam).</li>
                        </ul>
                        <p>???Palaist gar??m??? var vair??kas reizes.</p>
                        <b  className="rules-page-text-yellow">Punktu skait????ana un sp??les rezult??ts</b>
                        <p>Katrai ieg??tajai k??rtij ir at????ir??gs punktu skaits:</p>
                        <div>

                          <table className="rules-page-body-table">
                            <tr>
                              <th className="">K??rts</th>
                              <th className="">Punkti</th>
                            </tr>
                            <tr>
                              <td className="">D??zis</td>
                              <td className="">11</td>
                            </tr>
                            <tr>
                              <td className="">Desmitnieks</td>
                              <td className="">10</td>
                            </tr>
                            <tr>
                              <td className="">Kungs</td>
                              <td className="">4</td>
                            </tr>
                            <tr>
                              <td className="">D??ma</td>
                              <td className="">3</td>
                            </tr>
                            <tr>
                              <td className="">Dev??tnieks</td>
                              <td className="">0</td>
                            </tr>
                            <tr>
                              <td className="">Astotnieks</td>
                              <td className="">0</td>
                            </tr>
                            <tr>
                              <td className="">Sept??tnieks</td>
                              <td className="">0</td>
                            </tr>
                          </table>
                          <br/>
                        </div>
                        <b>Pules</b>
                        <p>
                Parastaj?? zol??, vairakk??rt nopas??jot, var sakr??ties vair??kas pules. N??ko????s sp??les sp??l??t??js vinn??jot sa??em attiec??go punktu daudzumu ne tikai no sp??les pretiniekiem, bet ar?? papildus pa punktam no katra sp??l??t??ja. Ja ir jau vismaz viena pule, un sp??l??t??js sp??l??jot k?? lielais zaud??, vi???? sa??em person??go puli. To var iz??emt vi???? pats vin??jot sp??li, bet nek??dus papildus punktus nesa??emot. Ja person??go puli iz??em k??ds cits, vi???? sa??em papildus 2 punktus no pules ??pa??nieka.
                        </p>
                        <p>
                Vinn??jot zoli, sa??em no katra sp??l??t??ja pa 5 punktiem, zaud??jot atdod pa 6 katram. Zol?? papildus punkti pien??kas par 91
                        </p>
                        <p>
                Jebkur?? br??d??, sp??l??t??js, kas pa????mis 2 k??rtis un sp??l?? k?? ???lielais', var nomest k??rtis ('atmesties'). ??aj?? gad??jum?? visu neizsp??l??to k??r??u punkti tiek pieskait??ti 'mazajiem???.
                        </p>
                        <b className="rules-page-text-yellow">
                Sp??les izn??kums
                        </b>
                        <table className="rules-page-body-table">
                          <tr>
                            <th className="">Sp??les izn??kums</th>
                            <th className="">Punkti Lielajam</th>
                            <th className="">Punkti katram mazajam</th>
                          </tr>
                          <tr>
                            <td className="">Lielais vinn?? parasto partiju ar 61-90 punktiem</td>
                            <td className="">+2</td>
                            <td className="">-1</td>
                          </tr>
                          <tr>
                            <td className="">Lielais vinn?? parasto partiju ar 91-120 punktiem</td>
                            <td className="">+4</td>
                            <td className="">-2</td>
                          </tr>
                          <tr>
                            <td className="">Lielais vinn?? parasto partiju, mazajiem nesav??cot nevienu sti??i</td>
                            <td className="">+6</td>
                            <td className="">-3</td>
                          </tr>
                          <tr>
                            <td className="">Lielais zaud?? parasto partiju ar 31-60 punktiem</td>
                            <td className="">-4</td>
                            <td className="">+2</td>
                          </tr>
                          <tr>
                            <td className="">Lielais zaud?? parasto partiju ar 0-29 punktiem</td>
                            <td className="">-6</td>
                            <td className="">+3</td>
                          </tr>
                          <tr>
                            <td className="">Lielais zaud?? parasto partiju, nesav??cot nevienu sti??i</td>
                            <td className="">-8</td>
                            <td className="">+4</td>
                          </tr>
                          <tr>
                            <td className="">Lielais vinn?? ZOLI ar 61-90 punktiem</td>
                            <td className="">+ 10</td>
                            <td className="">-5</td>
                          </tr>
                          <tr>
                            <td className="">Lielais vinn?? ZOLI ar 91-120 punktiem</td>
                            <td className="">+12</td>
                            <td className="">-6</td>
                          </tr>
                          <tr>
                            <td className="">Lielais vinn?? ZOLI, mazajiem nesav??cot nevienu sti??i</td>
                            <td className="">+14</td>
                            <td className="">-7</td>
                          </tr>
                          <tr>
                            <td className="">Lielais zaud?? ZOLI ar 31-60 punktiem</td>
                            <td className="">-12</td>
                            <td className="">+6</td>
                          </tr>
                          <tr>
                            <td className="">Lielais zaud?? ZOLI ar 0-29 punktiem</td>
                            <td className="">-14</td>
                            <td className="">+7</td>
                          </tr>
                          <tr>
                            <td className="">Lielais zaud?? ZOLI, nesav??cot nevienu sti??i</td>
                            <td className="">-16</td>
                            <td className="">+8</td>
                          </tr>
                          <tr>
                            <td className="">Kop??j?? pule, uzvar lielais</td>
                            <td className="">+2</td>
                            <td className="">-1</td>
                          </tr>
                          <tr>
                            <td className="">Kop??j?? pule, zaud?? lielais</td>
                            <td className="">Tiek ierakst??ta person??g?? pule</td>
                            <td className="">-</td>
                          </tr>
                          <tr>
                            <td className="">Person??g?? pule, uzvar lielais</td>
                            <td className="">+2</td>
                            <td className="">2 (tikai no person??g??s pules ??pa??nieka)</td>
                          </tr>
                        </table>
                        <p>
                Punkti tiek uzskait??ti katr?? partij?? atsevi????i un summ??ti kop??. Savu ieg??to punktu summu vari apl??kot sada???? ???Statistika???.
                        </p>
                        <p>
                Par sp??les pame??anu, neatkar??gi no sp??les pame??anas iemesla (t????a sp??les pame??ana, zudis Intereta savienojums, nepietiekams virtu??l??s naudas apjoms sp??les turpin????anai u.c.), sp??li pametu??ajam sp??l??t??jam tiek no??emti 8 punkti reiz konkr??t??s sp??les istabas likme. Punkti par sp??les pame??anu (neatkar??gi no iemesla) nek??d?? veid?? netiek kompens??ti.
                        </p>
                        <b className="rules-page-text-yellow">Aizliegumi</b>
                        <p>Sp??les lietot??jiem aizliegts:</p>
                        <ol>
                          <li>
                Izmantot draugiem.lv vai facebook.com lietot??ja profilu, kas izveidots vai tiek izmantots pret??ji soci??lo t??klu lieto??anas noteikumiem.
                          </li>
                          <li>
                Jebk??d?? veid?? izpaust savas k??rtis pretiniekiem, k?? ar?? sasp??l??ties ar k??du no sp??l??t??jiem nol??k?? ieg??t konkr??tam sp??l??t??jam labv??l??gu rezult??tu;
                          </li>
                          <li>
                Lietot necenz??tus, godu un cie??u aizskaro??us v??rdus sp??les ??ata log?? vai sarakst?? ar sp??l??t??jiem un/vai sp??les administr??ciju jebkur?? valod?? un veid??, k?? ar?? jebk??d?? veid?? nepamatoti apvainot sp??l??t??jus vai sp??les administr??ciju;
                          </li>
                          <li>
                Izteikt cilv??ka cie??u, rasi, reli??isko pieder??bu aizskaro??as fr??zes ??at?? un/vai sarakst?? ar sp??les administr??ciju jebkur?? valod?? un veid??;
                          </li>
                          <li>
                Veikt jebk??da veida darb??bas, kas trauc?? pilnv??rt??gu sp??les izmanto??anu citiem sp??l??t??jiem;
                          </li>
                          <li>
                Veikt jebk??da veida darb??bas, kas saist??tas ar tre??o pu??u produktu vai pakalpojumu reklam????anu sp??l?? Zole bez iepriek????jas saska??o??anas ar sp??les administr??ciju.
                          </li>
                        </ol>
                        <p>
                Sp??les administr??cija patur ties??bas blo????t sp??l??t??ja piek??uvi sp??lei bez iepriek????j?? br??din??juma uz nenoteiktu laiku p??c saviem ieskatiem. Sp??l??t??ja blo??????anas gad??jum?? sp??l??s izmantot??s vLs summas nek??d?? veid?? netiek kompens??tas.
                        </p>
                        <b className="rules-page-text-yellow">Ieteikumi ies??c??jiem</b>
                        <p>
                Zoles ???zelta likums???: caur sav??jo ej ar vien??go! Respekt??vi, mazais, izdarot g??jienu caur otru mazo, liek t??s masts k??rti, kas ir vien??g?? uz rokas.
                        </p>
                        <p>
                Iev??ro, ka sp??l?? ir 14 trumpes. Ir svar??gi sekot l??dzi atliku??o trumpju skaitam sp??les laik??. Mazajiem j??cen??as ieg??t punktus no trumpju desmitnieka un d????a (viens no mazajiem liek d??zi vai desmitnieku uz trupmes, ar kuru izg??jis lielais, ja ir p??rliec??ba, ka otram mazajam ir trumpe, kas sp??c??g??ka par liel?? izlikto).
                        </p>
                        <p>
                Ja, sp??l??jot k?? lielajam, ir daudz ???lieku??? k??r??u un gr??ti izv??l??ties, kuras 2 k??rtis ???norakt, tad v??lams rok??s patur??t vienas masts liek??s k??rtis.
                        </p>
                        <p>
                Ja lielais sp??l?? ZOLI, tad mazajiem j??cen??as iziet ar (netrumpes) d??zi, jo ir relat??vi liela iesp??jam??ba, ka lielajam b??s k??da netrumpes k??rts, kas maz??ka par d??zi (??emot v??r??, ka nav iesp??ja ???norakt??? k??rtis). T?? k?? sp??les situ??ciju ir daudz, augst??k min??tie ieteikumi nav univers??li piem??rojami jebkur?? situ??cij??. Sp??les izpratni var ieg??t tikai sp??l??jot. T??d???? atliek tikai m????in??t.
                        </p>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12">
                        <table className="rules-page-desc-table">
                          <tr>
                            <td className="rules-page-desc-table-label">P</td>
                            <td className="rules-page-desc-table-desc">parast?? zole</td>
                          </tr>
                          <tr>
                            <td className="rules-page-desc-table-label">G</td>
                            <td className="rules-page-desc-table-desc">zole ar galdi??u</td>
                          </tr>
                          <tr>
                            <td className="rules-page-desc-table-label">M</td>
                            <td className="rules-page-desc-table-desc">maz?? zole</td>
                          </tr>
                          <tr>
                            <td className="rules-page-desc-table-label"><img src={fast} alt="atra" style={{ display: 'inline-block', height: 25, width: 25 }} /></td>
                            <td className="rules-page-desc-table-desc">??tr?? istaba, kur?? b??s samazin??ts g??jiena laiks (5 sekundes)</td>
                          </tr>
                          <tr>
                            <td className="rules-page-desc-table-label">Iziet</td>
                            <td className="rules-page-desc-table-desc">iziet no istabas</td>
                          </tr>
                        </table>

                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col sm="12">
                        <b className="rules-page-text-header">
                    Kas ir virtu??l?? nauda jeb sp??les EUR?
                        </b>
                        <p>
                    Uzs??kot sp??li, katram sp??l??t??jam s??kotn??ji tiek pie????irti EUR 500. Sp??l??t iesp??jams tik ilgi kam??r sp??l??t??ja virtu??laj?? kont?? ir pietiekami daudz EUR. Ja virtu??l?? nauda ir beigusies, to iesp??jams papildus ieg??d??ties sada???? ???Veikals???. Virtu??la nauda jeb sp??les EUR ir paredz??ta tikai tehniskai sp??les nodro??in????anai, t?? nevar nek??d?? veid?? tikt izmaks??ta, apmain??ta vai aizst??ta ar re??lu naudu vai cita veida materi??laj??m v??rt??b??m, vai balv??m.
                        </p>
                        <b>
                    Punkti un sp??les EUR
                        </b>
                        <p>
                    Veidojot jaunu istabu, Tu vari noteikt k??da b??s punktu un sp??les EUR attiec??ba.
                        </p>
                        <p>
                  Piem??rs: Punkti : EUR ir 1:20, tad par katru zaud??to zoles punktu sp??l?? Tu zaud??si 20 EUR. Par sp??les uzs??k??anu tiek pa??emti 20% no sp??les likmes.
                        </p>
                        <p>
                  Piem??rs:
                        </p>
                        <p>
                  Punkti : EUR - 1:10, sp??le beidzas ar rezult??tu:
                        </p>
                        <p>
                  J??nis +5; Andris -2; K??rlis ??? 3.
                        </p>
                        <p className="rules-page-text-header">
                  Sp??les naudas izmaksas:
                        </p>
                        <p>
                  J??nis +50 EUR; Andris -20 EUR; K??rlis ???30 EUR.
                        </p>
                        <p>
                  Par piesl??g??anos istabai vai par jaunas istabas izveidi maksa ir 20% no likmes. Piem??ram, ja likme ir 1:5, tad 1 EUR, ja 1:50, tad pievieno??an??s maksa b??s 10 EUR.
                        </p>
                        <b>
                  Minim??lais EUR apm??rs, lai uzs??ktu sp??li
                        </b>
                        <p>
                  ????dai minim??lajai sp??les EUR summai ir j??b??t Tav?? virtu??laj?? kot??, lai s??ktu sp??li:
                        </p>
                        <ul>
                          <li>
                            162 EUR istabai ar attiec??bu 1:10 EUR par punktu
                          </li>
                          <li>
                            405 EUR istabai ar attiec??bu 1:25 EUR par punktu
                          </li>
                          <li>
                            810 EUR istabai ar attiec??bu 1:50 EUR par punktu.
                          </li>
                          <li>
                            1 620 EUR istabai ar attiec??bu 1:100 EUR par punktu.
                          </li>
                          <li>
                            8 100 EUR istabai ar attiec??bu 1:500 EUR par punktu.
                          </li>
                          <li>
                            16 200 EUR istabai ar attiec??bu 1:1000 EUR par punktu.
                          </li>
                          <li>
                            81 000 EUR istabai ar attiec??bu 1:5000 EUR par punktu.
                          </li>
                          <li>
                            162 000 EUR istabai ar attiec??bu 1:10000 EUR par punktu.
                          </li>
                        </ul>
                        {/*    <p>
                  +20% no likmes par sp??les uzs??k??anu
                        </p> */}
                        <b>
                  Draugu uzaicin????ana
                        </b>
                        <p>
                    Sp??les administr??cija var pie????irt papildus sp??les EUR par uzaucin??tajiem draugiem gad??jumos, kad konkr??tie uzaicin??tie cilv??ki l??dz tam nav re??istr??ju??ies (sp??l??ju??i) zol??. Sp??les EUR tiek pie????irti tikai p??c tam, kad uzaicin??tais draugs ir lietojis Zole aplik??ciju (iesp??ja v??l nav pilnb?? iestr??d??ta sp??l??).
                        </p>
                        <b className="rules-page-text-header">
                  Dienas bonuss
                        </b>
                        <p>
                  Reizi 24 stund??s sp??l??t??js var iegriezt laimes ratu un laim??t k??du no pieejamaj??m sp??les naudas balv??m (l??dz pat 100 EUR).
                        </p>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="4">
                    <Row>
                      <Col sm="12">
                      <b className="rules-page-text-yellow">
                        Sp??l??t??ja l??menis
                      </b>
                      <p>
                      Katra sp??l??t??ja l??menis tiek apr????in??ts p??c ????da algoritma:
                      </p>

                      <table className="rules-page-levels-table">
                        <tr>
                          <td className="rules-page-levels-table-header">Sp??l??t??ja l??menis</td>
                          <td className="rules-page-levels-table-header">Izsp??l??t??s sp??les</td>
                          <td className="rules-page-levels-table-header">Ieg??tie punkti</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Vismaz 5</td>
                          <td>Jebk??ds</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Vismaz 10</td>
                          <td>Jebk??ds</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Vismaz 20</td>
                          <td>Vismaz 10</td>
                        </tr>
                        <tr>
                          <td>Katrs n??kamais l??menis</td>
                          <td>Vismaz (Iepriek????j?? l??me??a x 1.2)</td>
                          <td>Vismaz (Iepriek????j?? l??me??a + 5)</td>
                        </tr>
                      </table>

                      <p>
                      Ja sp??l??t??js ir sasniedzis noteiktu l??meni, tas vairs nesamazin??s. Piem??ram, ja sp??l??t??jam ir l??menis 10 un vi??a punkti ir kritu??ies, vi???? vairs nevar non??kt l??men?? 9.
                      </p>
                      <p>
                      Sp??l??t??ja l??menis tiek att??lots pie profila att??la k?? cipars sarkan?? apl??t??.
                      </p>

                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="5">
                    <Row>
                      <Col sm="12">
                        <b className="rules-page-text-yellow">
                          J: Ko dar??t, ja esmu atradis sp??l?? k????du?
                        </b>
                        <p>
                          A: Spiediet uz pogas ???Sazin??ties ar atbalstu???, lai atv??rtu ??ata logu un s??ktu sarunu ar administr??ciju. Tikl??dz k??ds no administr??cijas b??s pieejams online, t?? Tev tiks sniegta atbilde. Ja k????da tiks prec??zi aprakst??ta un t?? skar lielu da??u sp??l??t??ju, vai ar?? ja regul??ri pal??dz??si test??t sp??li un zi??ot par sp??les nepiln??b??m, tad sp??les administr??cija pirmajiem zi??ot??jiem var izteikt pateic??bu, pie????irot balvu sp??les naud?? vai ar?? citu balvu veidol??.
                        </p>
                        <b className="rules-page-text-yellow">
                          J: Man ir ideja, kuru v??los redz??t sp??l?? - k?? man r??koties, lai to ieviestu?
                        </b>
                        <p>
                          A: Sazinieties ar administr??ciju, spie??ot uz pogas ???Sazin??ties ar atbalstu???. M??s - sp??les administr??cija - vienm??r esam atv??rti jaun??m idej??m un ievedumiem, ja vien t??s atbilst visp??r??jam sp??les konceptam, ir re??li ievie??amas un g??s atbalstu ar?? no citu sp??l??t??ju puses.
                        </p>
                        <b className="rules-page-text-yellow">
                          J: Kas ir turn??ri un k?? tajos piedal??ties?
                        </b>
                        <p>
                          A: Sp??l?? ik p??c noteikta laika tiek r??kotas ??pa??as sacens??bas jeb turn??ri. Katrs turn??rs ilgst noteiktu laiku un taj?? var re??istr??ties, samaks??jot iest????anos maksu,. Turn??r?? past??v atsevi????i nodal??ta sp??les nauda jeb turn??ra EUR. Katr?? turn??r?? var b??t at????ir??ga likme un nosac??jumi, k?? ar?? iesp??jam??s balvas.
                        </p>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </div>
        )}
        {member && member.uid && (
        <Modal size="lg" isOpen={!member.firstTimeModal} toggle={this.closeFirstTime} className="firstTimeModal">
          <ModalHeader
            toggle={this.closeFirstTime}
            close={
              <Media src={closeImg} className="notification-header-close" alt="X" onClick={this.closeFirstTime} />
            }
          >
            Sveiciens jaunaj?? Zoles versij??!
          </ModalHeader>
          <ModalBody style={{ textTransform: 'none', fontSize: 13, lineHeight: 1.35 }}>
            <p>Sveiciens jaunaj?? Zoles versij??!</p>
            <p>
              ???? ir jauna sp??les versija, pie kuras esam str??d??ju??i p??d??jo m??ne??u laik??. Dati par sp??l??t??jiem (ieg??tie punkti, sp??les nauda, TOP rezult??ti u.c.) ir saglab??ti no vec??s sp??les versijas, tom??r ir dz??sti veco turn??ru dati, k?? ar?? sasniegumi un eso??ie rangi (to viet?? n??ks citi).
            </p>
            <p>
              Ar ko tad ???? versija at????iras no iepriek????j??s - vec??s Zoles versijas:
            </p>
            <ul>
              <li>- piln??gi jauns izskats un dizains;</li>
              <li>- atteik??an??s no Flash un ar to saist??taj??m probl??m??m (nevar??ja atv??rt sp??li un savienojuma pazu??ana);</li>
              <li>- dienas bonuss jeb laimes rats, kuru var iegriezt reizi dien?? un ieg??t k??du no naudas balv??m, t??pat ar?? turn??ros tagad pied??v??sim vair??k re??las balvas;</li>
              <li>- s??kuma bonuss jaunajiem sp??l??t??jiem tagad ir 500 Zoles mon??tas un v??l izdev??g??ki pied??v??jumi veikal??;</li>
              <li>- p??rveidota l??me??u uzskaites sist??ma;</li>
              <li>- ??ats jeb tie??a sazi??a ar administr??ciju, lai zi??otu par k????d??m un probl??m??m, un izteiktu ierosin??jumus;</li>
              <li>- iesp??ja redz??t savas bilanca v??sturi un izmai??as par p??d??j??m 3 dien??m;</li>
              <li>- jauni ieg??stami sasniegumi;</li>
              <li>- iesp??ja ievietot k??du sp??l??t??ju ignor??to sarakst??, lai nesp??l??tu vien?? istab??;</li>
              <li>- draugu uzaicin????ana un citas lietas.</li>
            </ul>
            <p>
              T?? k?? s??dz??bu skaits par veco versiju un taj?? sastopamaj??m k????d??m arvien pieauga, izl??m??m uzst??d??t jauno versiju mazliet ??tr??m, t??p??c atsevi????as lietas v??l nav pieln??b?? ieviestas, t??pat ar?? ir iesp??jams k??das k????das vai vizu??las nepiln??bas, pie kuru nov??r??anas c??t??gi tagad str??d??sim. N??kam?? gada s??kum?? b??s pieejama ar?? mobil?? aplik??cija Android un iOS platform??s.
            </p>
            <p>
              Visos sp??les skatos ir pieejama poga ???Tehnisk?? Pal??dz??ba??? jeb ??ats - ar t?? pal??dz??bu varat ??rti un ??tri zi??ot par jebk??du nov??rotu k????du, nepiln??bu vai vienk??r??i viedokli par jauno versiju. Saprotam, ka jaunais izskats k??dam patiks, k??dam varb??t n??, t??p??c esam atv??rti konstrukt??vai kritikai un ieteikumiem.
            </p>
            <p>
              Veiksmi sp??l??!
            </p>
            <p>
              Zoles administr??cija
            </p>
          </ModalBody>
          <ModalFooter>
            <Button className="notification-footer-button" color="secondary" onClick={this.closeFirstTime}>
              {t('common.close')}
            </Button>
          </ModalFooter>
        </Modal>
        )}

        <Modal isOpen={balanceHistoryModalOpen} toggle={this.toggleBalanceHistory} size="lg">
          <ModalHeader
            toggle={this.toggleBalanceHistory}
            close={
              <Media src={closeImg} className="notification-header-close" alt="X" onClick={this.toggleBalanceHistory} />
            }
          >
            {t('menu.moneyHistory')}
          </ModalHeader>
          <ModalBody>
            {balanceHistoryModalOpen && (
              <MoneyHistory
                fetchBalanceHistory={fetchBalanceHistory}
                balanceHistory={member.balanceHistory}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button className="modal-footer-button" color="secondary" onClick={this.toggleBalanceHistory}>
              {t('common.close')}
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={bannedUsersModalOpen} toggle={this.toggleBannedUsers} size="lg">
          <ModalHeader
            toggle={this.toggleBannedUsers}
            close={
              <Media src={closeImg} className="notification-header-close" alt="X" onClick={this.toggleBannedUsers} />
            }
          >
            {t('menu.bannedUsers')}
          </ModalHeader>
          <ModalBody>
            <BannedUsers
              bannedUsers={bannedUsers}
              bannedUsersCount={bannedUsersCount}
            />
          </ModalBody>
          <ModalFooter>
            <Button className="modal-footer-button" color="secondary" onClick={this.toggleBannedUsers}>
              {t('common.close')}
            </Button>
          </ModalFooter>
        </Modal>

        <NewVersion member={member} t={t} closeNewVersionModal={this.newVersionChecked} />
        {/*  <Modal isOpen={onlineUsersModalOpen} toggle={this.toggleOnlineUsers} size="lg" className="rules-modal">
          <ModalHeader toggle={this.toggleOnlineUsers} className="rules-modal-header">
            {t('menu.onlineUsers')}
          </ModalHeader>
          <ModalBody className="rules-modal-body">
            <OnlineUsers
              onlineUsers={onlineUsers}
            />
          </ModalBody>
          <ModalFooter className="rules-modal-footer">
            <Button className="rules-modal-footer-button" color="secondary" onClick={this.toggleOnlineUsers}>
              {t('common.close')}
            </Button>
          </ModalFooter>
        </Modal>  */}
      </Fragment>


    );
  }
}


export default withTranslation('common')(Menu);
