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
    userID: '',
    name: '',
    profile: '',
    lastBattleAt: new Date(0),
    crew: '',
    crewName: '',
    updatedAt: new Date(0),
  });
  const [retryCount, setRetryCount] = useState(0);

  const [profile, setProfile] = useState<UserProfile>({
    rank25Brawlers: 0,
    rank30Brawlers: 0,
    rank35Brawlers: 0,
    clubID: '',
    clubName: '',
    currentSoloPL: 0,
    highestSoloPL: 0,
    currentTeamPL: 0,
    highestTeamPL: 0,
    currentTrophies: 0,
    highestTrophies: 0,
    trophyChange: 0,
    userID: '',
    name: '',
    profile: '',
    duoVictories: 0,
    tripleVictories: 0,
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
      UserService.getUser({ id }).then((data) => {
        if (data !== null) {
          setUser(data.user);
          setProfile(data.profile);
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
    } else if (retryCount < 3 && !(new Date(user.updatedAt).getTime() > 0)) {
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
  }, [id, retryCount, user.updatedAt]);

  useEffect(() => {
    UserService.getUserByTypeNMode({ id, type, mode }).then((data) => {
      setBattlesSummary(data.battlesSummary);
      setBrawlersSummary(data.brawlersSummary);
      setRotationTL(data.rotationTL);
      setRotationPL(data.rotationPL);
      setRecentBattles(data.recentBattles);
      setRecentBrawlers(data.recentBrawlers);
      setBattles(data.battles);
      setSeason(data.season);
    });
  }, [id, type, mode, user.updatedAt]);

  return (
    new Date(user.updatedAt).getTime() > 0 && (
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
