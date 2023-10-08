import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import UserTitle from '~/components/user/title/title';
import UserMenu from '~/components/user/menu/menu';

import UserService from '~/services/user_service';
import { UserProfile, Users } from '~/interfaces/type/users';
import { rotationModes } from '~/interfaces/type/events';
import UserContext from '~/context/user_context';

import styles from './user.module.scss';

const User = () => {
  const location = useLocation();
  const { id } = useParams();
  const [user, setUser] = useState<Users>({
    USER_ID: '',
    USER_NM: '',
    USER_PRFL: '',
    USER_LST_BT: new Date(0),
    USER_LST_CK: new Date(0),
    USER_CR: '',
    USER_CR_NM: '',
  });
  const [retryCount, setRetryCount] = useState(0);

  const [profile, setProfile] = useState<UserProfile>({
    BRAWLER_RNK_25: 0,
    BRAWLER_RNK_30: 0,
    BRAWLER_RNK_35: 0,
    CLUB_ID: '',
    CLUB_NM: '',
    PL_SL_CUR: 0,
    PL_SL_HGH: 0,
    PL_TM_CUR: 0,
    PL_TM_HGH: 0,
    TROPHY_CUR: 0,
    TROPHY_HGH: 0,
    USER_ID: '',
    USER_NM: '',
    USER_PRFL: '',
    VICTORY_DUO: 0,
    VICTORY_TRP: 0,
  });

  const [type, setType] = useState('7');
  const [mode, setMode] = useState('all');

  const [rotationTL, setRotationTL] = useState<rotationModes[]>([]);
  const [rotationPL, setRotationPL] = useState<rotationModes[]>([]);

  const [battlesSummary, setBattlesSummary] = useState([]);
  const [brawlersSummary, setBrawlersSummary] = useState([]);

  const [recentBattles, setRecentBattles] = useState([]);
  const [recentBrawlers, setRecentBrawlers] = useState([]);
  const [battles, setBattles] = useState([]);

  const [season, setSeason] = useState();

  const [friends, setFriends] = useState();
  const [seasonRecords, setSeasonRecords] = useState();

  useEffect(() => {
    const getUser = () => {
      UserService.getUser({ id, type, mode }).then((data) => {
        if (data !== null) {
          setUser(data.user);
          setProfile(data.profile);
          setRotationTL(data.rotationTL);
          setRotationPL(data.rotationPL);
          setBattlesSummary(data.battlesSummary);
          setBrawlersSummary(data.brawlersSummary);
          setRecentBattles(data.recentBattles);
          setRecentBrawlers(data.recentBrawlers);
          setBattles(data.battles);
          setSeason(data.season);
        } else {
          setRetryCount(retryCount + 1);
        }
      });
    };

    if (retryCount === 0) {
      getUser();
      /\/blossom.*/g.test(location.pathname) &&
        UserService.getBlossomMemberDetail({ id }).then((data) => {
          setFriends(data.friends);
          setSeasonRecords(data.seasonRecords);
        });
    } else if (retryCount < 3 && !(new Date(user.USER_LST_CK).getTime() > 0)) {
      const timer = setTimeout(() => {
        getUser();
        /\/blossom.*/g.test(location.pathname) &&
          UserService.getBlossomMemberDetail({ id }).then((data) => {
            setFriends(data.friends);
            setSeasonRecords(data.seasonRecords);
          });
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [id, retryCount, user.USER_LST_CK]);

  useEffect(() => {
    UserService.getUserByTypeNMode({ id, type, mode }).then((data) => {
      setBattlesSummary(data.battlesSummary.battlesSummary);
      setBrawlersSummary(data.battlesSummary.brawlersSummary);
      setRotationTL(data.battlesSummary.rotationTL);
      setRotationPL(data.battlesSummary.rotationPL);
      setRecentBattles(data.battleLogs.recentBattles);
      setRecentBrawlers(data.battleLogs.recentBrawlers);
      setBattles(data.battleLogs.battles);
      setSeason(data.battlesSummary.season);
    });
  }, [id, type, mode]);

  return (
    new Date(user.USER_LST_CK).getTime() > 0 && (
      <UserContext.Provider
        value={{
          id,
          user,
          setUser,
          profile,
          rotationTL,
          rotationPL,
          type,
          mode,
          setType,
          setMode,
          battlesSummary,
          brawlersSummary,
          recentBattles,
          recentBrawlers,
          battles,
          season,
          setRetryCount,
          friends,
          seasonRecords,
        }}
      >
        <div className={styles.app}>
          <UserTitle />
          <UserMenu />
        </div>
      </UserContext.Provider>
    )
  );
};

export default User;
