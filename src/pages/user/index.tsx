import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import { UserTitle } from '~/components/user/title';
import { UserMenu } from '~/components/user/menu';
import { Spinner } from '~/components/spinner/spinner';

import { UserFriendsType, UserProfileType, UsersType } from '~/common/type/users.type';
import { rotationModes } from '~/common/type/events.type';
import { UserContext } from '~/context/user.context';
import { UserService } from '~/services/user.service';

import styles from './index.module.scss';

/**
 * @class User
 * @author creator98
 * @description플레이어에 대한 정보 페이지
 *
 * @route /brawlian/:id
 */
export const User = () => {
  /* params 로 받을 id */
  const { id } = useParams();
  /* user object 정보 */
  const [user, setUser] = useState<UsersType>({
    userID: '',
    userName: '',
    profileIcon: '',
    lastBattleAt: new Date(0),
    crew: null,
    crewName: null,
    updatedAt: new Date(0),
  });
  /* user object 정보 */
  const [profile, setProfile] = useState<UserProfileType>({
    brawlerRank25: 0,
    brawlerRank30: 0,
    brawlerRank50: 0,
    duoMatchVictories: 0,
    soloMatchVictories: 0,
    trioMatchVictories: 0,
    clubID: '',
    clubName: '',
    currentSoloRanked: 0,
    highestSoloRanked: 0,
    // currentTeamPL: 0,
    // highestTeamPL: 0,
    currentTrophies: 0,
    highestTrophies: 0,
    trophyChange: 0,
    userID: '',
    userName: '',
    profileIcon: '',
  });

  /* user object 정보 */
  const [retryCount, setRetryCount] = useState<number>(0);

  const [type, setType] = useState('7');
  const [mode, setMode] = useState('all');

  const [rotationTL, setRotationTL] = useState<rotationModes[]>([]);
  const [rotationPL, setRotationPL] = useState<rotationModes[]>([]);

  const [battlesSummary, setBattlesSummary] = useState([]);
  const [brawlersSummary, setBrawlersSummary] = useState([]);

  const [recentBattles, setRecentBattles] = useState([]);
  const [recentBrawlers, setRecentBrawlers] = useState([]);
  const [battles, setBattles] = useState([]);
  const [stack, setStack] = useState(1);

  const [season, setSeason] = useState();

  const [friends, setFriends] = useState<UserFriendsType[]>();
  const [seasonRecords, setSeasonRecords] = useState();

  const [load, setLoad] = useState(true);
  const [scrollStack, setScrollerStack] = useState(0);
  const target = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getUser = () => {
      UserService.getUser({ id }).then((data) => {
        if (data !== null) {
          setUser(data.user);
          setProfile(data.profile);
          setRetryCount(retryCount + 1);
        } else {
          setRetryCount(retryCount + 1);
        }
      });
    };

    if (retryCount === 0) {
      getUser();
    } else if (retryCount < 3 && !(new Date(user.updatedAt).getTime() > 0)) {
      const timer = setTimeout(() => {
        getUser();
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [id, retryCount, user?.updatedAt || new Date()]);

  useEffect(() => {
    if (user && user.crew) {
      UserService.getCrewMemberDetail({ id }).then((data) => {
        setFriends(data.friends);
        setSeasonRecords(data.seasonRecords);
      });
    }
  }, [retryCount, user?.crew]);

  useEffect(() => {
    UserService.getUserByTypeNMode({ id, type, mode, stack }).then((data) => {
      setBattlesSummary(data.battlesSummary);
      setBrawlersSummary(data.brawlersSummary);
      setRotationTL(data.rotationTL);
      setRotationPL(data.rotationPL);
      setRecentBattles(data.recentBattles);
      setRecentBrawlers(data.recentBrawlers);
      setBattles(data.battles);
      setSeason(data.season);
    });
  }, [id, type, mode, stack, user?.updatedAt || new Date()]);

  useEffect(() => {
    const options = {
      threshold: 1.0,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          setStack((prevStack: number) => {
            if (recentBattles.length % 30 === 0 && scrollStack < 3) {
              return prevStack + 1;
            } else {
              setLoad(false);
            }

            return prevStack;
          });
          if (recentBattles.length === 0) {
            setScrollerStack((prevStack) => prevStack + 1);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [recentBattles]);

  useEffect(() => {
    if (!load) {
      setScrollerStack(0);
      setLoad(true);
    }
  }, [mode, type]);

  const contextValue = {
    id,
    user,
    profile,
    rotationTL,
    rotationPL,
    type,
    mode,
    battlesSummary,
    brawlersSummary,
    recentBattles,
    recentBrawlers,
    battles,
    season,
    friends,
    seasonRecords,
    setUser,
    setType,
    setMode,
    setStack,
    setRetryCount,
    setLoad,
  };

  return new Date(user?.updatedAt).getTime() > 0 ? (
    <UserContext.Provider value={contextValue}>
      <div className={styles.app}>
        <Helmet></Helmet>
        <UserTitle />
        <UserMenu />
        <div
          className={styles.breakLine}
          style={{ display: load ? 'flex' : 'none' }}
          ref={target}
        >
          <FontAwesomeIcon icon={faEllipsis} fontSize={28} />
        </div>
      </div>
    </UserContext.Provider>
  ) : (
    <Spinner />
  );
};
