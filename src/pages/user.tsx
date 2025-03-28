import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { UserInfoContainer } from './user/user-info';
import { UserButtonsContainer } from './user/user-buttons';
import { UserMenuContainer } from './user/user-menu';
import { UserProfileContainer } from '~/pages/user/user-menu/user-profile';
import { UserBrawlersContainer } from '~/pages/user/user-menu/user-brawlers';
import { Spinner } from '~/components/spinner/spinner';

import { UserService } from '~/services/user.service';
import { UserBrawlersContext, UserContext, UserProfileContext } from '~/context/user.context';
import {
  UserBattlesType,
  UserBrawlerGraphType,
  UserBrawlerItemsType,
  UserOwnedBrawlersType,
  UserDailyBattlesType,
  UserFriendListType,
  UserProfileType,
  UserRecentBattlesType,
  UserRecentBrawlersType,
  UserSeasonsType,
  UsersType,
  UserSummaryBattlesType,
  UserWithoutBrawlersType
} from '~/common/types/users.type';

import { SeasonType } from '~/common/types/season.type';
import { CdnContext } from '~/context/cdn.context';

import defStyles from '~/common/styles/app.module.scss';
import styles from '~/assets/styles/pages/user.module.scss';

/**
 * @route /brawlian/:id
 * @description 플레이어 정보 페이지
 */
export const UserWrapper = () => {
  const locales = useContext(CdnContext);
  /* params 로 받을 id */
  const { id } = useParams();

  /**
   * @description User default values
   */
  const [user, setUser] = useState<UsersType>({
    userID: `#${id}`,
    userName: '',
    profileIcon: '',
    lastBattleAt: new Date(0),
    crew: null,
    crewName: null,
    isCrew: false,
    updatedAt: new Date(0)
  });
  /* menu load 정보 */
  const [userPageLoaded, setUserPageLoaded] = useState(false);
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [brawlerLoaded, setBrawlerLoaded] = useState(false);
  const [battlesLoaded, setBattlesLoaded] = useState<boolean>(false);
  const [retryUserInfoCount, setRetryUserInfoCount] = useState<number>(0);
  const [retryProfileCount, setRetryProfileCount] = useState<number>(0);
  const [retryBrawlerCount, setRetryBrawlerCount] = useState<number>(0);
  /* User context value */
  const contextValue = {
    /* user Id 정보 */
    id,
    user,
    setUser,
    /* container load 정보 */
    retryProfileCount,
    retryBrawlerCount,
    userInfoLoaded,
    profileLoaded,
    brawlerLoaded,
    battlesLoaded,
    setUserPageLoaded,
    setProfileLoaded,
    setBrawlerLoaded,
    setRetryUserInfoCount,
    setRetryProfileCount,
    setRetryBrawlerCount,
    setBattlesLoaded
  };

  /**
   * @description User Summary menu values
   */
  /* User Profile container values */
  const [profile, setProfile] = useState<UserProfileType>({
    userID: '',
    userName: '',
    profileIcon: '',
    clubID: '',
    clubName: '',
    brawlerRank50: 0,
    currentSoloRanked: 0,
    highestSoloRanked: 0,
    currentTrophies: 0,
    highestTrophies: 0,
    trophyChange: 0,
    soloMatchVictories: 0,
    duoMatchVictories: 0,
    trioMatchVictories: 0
  });
  /* User Battles container values */
  const [type, setType] = useState<string>('7');
  const [mode, setMode] = useState<string>('all');
  const [modeTL, setModeTL] = useState<string[]>([]);
  const [modePL, setModePL] = useState<string[]>([]);
  const [summaryBattles, setSummaryBattles] = useState<UserSummaryBattlesType[]>([]);
  const [dailyBrawlers, setDailyBrawlers] = useState<UserDailyBattlesType[]>([]);
  const [recentBattles, setRecentBattles] = useState<UserRecentBattlesType[]>([]);
  const [recentBrawlers, setRecentBrawlers] = useState<UserRecentBrawlersType[]>([]);
  const [battles, setBattles] = useState<UserBattlesType[]>([]);
  const [currentSeason, setCurrentSeason] = useState<SeasonType>({ beginDate: undefined, endDate: undefined });
  const [battleStack, setBattleStack] = useState<number>(1);
  /* User Friends/Seasons container values */
  const [isCrew, setIsCrew] = useState(false);
  const [friendList, setFriendList] = useState<UserFriendListType>({
    friends: [],
    friendsUpdatedAt: undefined
  });
  const [seasonList, setSeasonList] = useState<UserSeasonsType[]>([]);
  /* User Summary context value */
  const userProfileContextValue = {
    /* User Profile container values */
    profile,
    setProfile,
    /* User Battles container values */
    type,
    mode,
    setType,
    setMode,
    modeTL,
    modePL,
    setModeTL,
    setModePL,
    summaryBattles,
    dailyBrawlers,
    recentBattles,
    recentBrawlers,
    battles,
    currentSeason,
    battleStack,
    setSummaryBattles,
    setDailyBrawlers,
    setRecentBattles,
    setRecentBrawlers,
    setBattles,
    setCurrentSeason,
    setBattleStack,
    /* User Friends/Seasons container values */
    isCrew,
    friendList,
    seasonList,
    setIsCrew,
    setFriendList,
    setSeasonList
  };

  /**
   * @description User Brawlers menu values
   */
  const [userWithoutBrawlers, setUserWithoutBrawlers] = useState<UserWithoutBrawlersType[]>([]);
  const [userOwnedBrawlers, setUserOwnedBrawlers] = useState<UserOwnedBrawlersType[]>([]);
  const [brawlerItems, setBrawlerItems] = useState<UserBrawlerItemsType[]>([]);
  const [brawlerGraphs, setBrawlerGraphs] = useState<UserBrawlerGraphType[]>([]);
  /* User Brawlers context value */
  const userBrawlersContextValue = {
    userWithoutBrawlers,
    setUserWithoutBrawlers,
    userOwnedBrawlers,
    setUserOwnedBrawlers,
    brawlerItems,
    setBrawlerItems,
    brawlerGraphs,
    setBrawlerGraphs
  };

  const [menu, setMenu] = useState<string>('profile');

  /* 요약, 브롤러 메뉴 중 하나가 load 되면 페이지 로드 완료 */
  useEffect(() => {
    if (userPageLoaded) {
      return;
    }

    const isPageLoad = (userInfoLoaded && profileLoaded) || (userInfoLoaded && brawlerLoaded);

    setUserPageLoaded(isPageLoad);
  }, [userInfoLoaded, profileLoaded, brawlerLoaded]);

  /* user 기본 정보 로드 */
  useEffect(() => {
    window.scrollTo(0, 0);

    if (userInfoLoaded) {
      return;
    }

    const getUser = () => {
      UserService.getUser({ id }).then((data) => {
        if (!data) {
          setRetryUserInfoCount(retryUserInfoCount + 1);
          return;
        }
        setUser(data.user);
        setRetryUserInfoCount(retryUserInfoCount + 1);
        setUserInfoLoaded(true);
        return;
      });
    };

    if (retryUserInfoCount === 0) {
      setRetryProfileCount(0);
      setRetryBrawlerCount(0);
      getUser();
    } else if (retryUserInfoCount < 3) {
      setTimeout(() => getUser(), 1000);
    }
  }, [retryUserInfoCount]);

  return userInfoLoaded ? (
    <UserContext.Provider value={contextValue}>
      {userInfoLoaded && (
        <Helmet>
          <title>
            {user.userName}({user.userID}) - {locales.user['title'].brawlianStats}
          </title>
          <desc>
            {user.userName}({user.userID}) {locales.user['title'].brawlianStatsDesc}
          </desc>
        </Helmet>
      )}
      <div className={defStyles.app}>
        <div className={styles.userWrapper}>
          <UserInfoContainer />
          <UserButtonsContainer />
          <UserMenuContainer menu={menu} setMenu={setMenu} />
        </div>
        {menu === 'profile' ? (
          <UserProfileContext.Provider value={userProfileContextValue}>
            <UserProfileContainer />
          </UserProfileContext.Provider>
        ) : (
          <UserBrawlersContext.Provider value={userBrawlersContextValue}>
            <UserBrawlersContainer />
          </UserBrawlersContext.Provider>
        )}
      </div>
    </UserContext.Provider>
  ) : (
    <Spinner />
  );
};
