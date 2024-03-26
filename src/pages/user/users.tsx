import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import { UserTitle } from '~/components/user/title/title';
import { UserMenu } from '~/components/user/menu/menu';
import { Spinner } from '~/components/spinner/spinner';

import { UserProfileType, UsersType } from '~/common/type/users.type';
import { rotationModes } from '~/common/type/events.type';
import { UserContext } from '~/context/user.context';
import { UserService } from '~/services/user.service';

import styles from './user.module.scss';

export const Users = () => {
  const location = useLocation();
  const { id } = useParams();
  const [user, setUser] = useState<UsersType>({
    userID: '',
    userName: '',
    profileIcon: '',
    lastBattleAt: new Date(0),
    crew: '',
    crewName: '',
    updatedAt: new Date(0),
  });
  const [retryCount, setRetryCount] = useState(0);

  const [profile, setProfile] = useState<UserProfileType>({
    brawlerRank25: 0,
    brawlerRank30: 0,
    brawlerRank35: 0,
    duoMatchVictories: 0,
    soloMatchVictories: 0,
    trioMatchVictories: 0,
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
    userName: '',
    profileIcon: '',
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
  const [stack, setStack] = useState(1);

  const [season, setSeason] = useState();

  const [friends, setFriends] = useState();
  const [seasonRecords, setSeasonRecords] = useState();

  const [load, setLoad] = useState(true);
  const target = useRef(null);
  const [scrollStack, setScrollerStack] = useState(0);

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
  }, [id, retryCount, user?.updatedAt || new Date()]);

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


  return (
    new Date(user?.updatedAt).getTime() > 0 ? (
        <UserContext.Provider
          value={{
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
          }}
        >
          <div className={styles.app}>
            <UserTitle />
            <UserMenu />
            <div
              className={styles.breakLine}
              style={{ display: load ? 'flex' : 'none' }}
              ref={target}
            >
              <FontAwesomeIcon icon={faEllipsis}
                               fontSize={28} />
            </div>
          </div>
        </UserContext.Provider>
      ) :
      <Spinner />
  );
};
