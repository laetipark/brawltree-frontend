import React, { useContext, useEffect, useState } from 'react';

import { UserRecordsContent } from '~/pages/user/user-menu/user-profile/user-records';
import { UserBattlesContent } from '~/pages/user/user-menu/user-profile/user-battles';

import { UserFriendsContent } from '~/pages/user/user-menu/user-profile/user-friends';
import { UserSeasonsContent } from '~/pages/user/user-menu/user-profile/user-seasons';

import { UserService } from '~/services/user.service';

import { Spinner } from '~/components/spinner/spinner';

import { UserContext, UserProfileContext } from '~/context/user.context';

import styles from '~/assets/styles/pages/user/user-menu/user-profile.module.scss';

export const UserProfileContainer = () => {
  const userContext = useContext(UserContext);
  const userProfileContext = useContext(UserProfileContext);
  const { id, user, retryProfileCount, setRetryProfileCount, profileLoaded, setProfileLoaded, battlesLoaded, setBattlesLoaded } = userContext;
  const { profile, setProfile, isCrew, friendList, seasonList, setIsCrew, setFriendList, setSeasonList } = userProfileContext;
  const { type, mode, setModeTL, setModePL } = userProfileContext;
  const { setSummaryBattles, setDailyBrawlers, setCurrentSeason } = userProfileContext;
  const { battleStack, setRecentBattles, setRecentBrawlers, setBattles, setBattleStack } = userProfileContext;

  const [battlesStackEnded, setBattlesStackEnded] = useState<boolean>(false);

  const getUserBattles = () => {
    if (battlesLoaded) {
      return;
    }

    UserService.getUserBattleStats({ id, type, mode }).then((data) => {
      setSummaryBattles(data.summaryBattles);
      setDailyBrawlers(data.dailyBrawlers);
      setModeTL(data.modeTL);
      setModePL(data.modePL);
      setCurrentSeason(data.season);
    });

    UserService.getUserBattleLogs({ id, type, mode, battleStack }).then((data) => {
      setRecentBattles(data.recentBattles);
      setRecentBrawlers(data.recentBrawlers);
      setBattles(data.battles);
    });

    setBattlesLoaded(true);
  };

  useEffect(() => {
    if (profileLoaded) {
      return;
    }

    const getUserSummary = () => {
      UserService.getUserProfile({ id }).then((data) => {
        if (!data) {
          return;
        }
        setProfile(data.profile);
      });

      if (user.isCrew) {
        UserService.getCrewMemberDetail({ id }).then((data) => {
          setFriendList(data.friendList);
          setSeasonList(data.seasonList);
        });
        setIsCrew(true);
      }

      setRetryProfileCount(retryProfileCount + 1);
      setProfileLoaded(true);
    };

    if (retryProfileCount === 0) {
      getUserSummary();
    } else if (retryProfileCount < 3) {
      setTimeout(() => getUserSummary, 1000);
    }
  }, [retryProfileCount]);

  useEffect(() => {
    if (battlesLoaded) {
      return;
    }

    setBattlesLoaded(false);
    setBattleStack(1);
    setBattlesStackEnded(false);
  }, [mode, type]);

  useEffect(() => {
    if (battlesLoaded) {
      return;
    }

    getUserBattles();
  }, [battlesLoaded, mode, type, battleStack]);

  return profileLoaded ? (
    <div className={styles.userProfileContainer}>
      <UserRecordsContent profile={profile} />
      {isCrew && (
        <React.Fragment>
          <UserFriendsContent friendList={friendList} />
          <UserSeasonsContent seasonList={seasonList} />
        </React.Fragment>
      )}
      <UserBattlesContent setBattleStack={setBattleStack} setBattlesLoaded={setBattlesLoaded} battlesStackEnded={battlesStackEnded} setBattlesStackEnded={setBattlesStackEnded} />
    </div>
  ) : (
    <Spinner />
  );
};
