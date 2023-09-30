import axios from 'axios';

import { useEffect, useState } from 'react';
import UserMenuType from '~/components/user/summary/battles/menu_type/menu_type';
import UserMenuMode from '~/components/user/summary/battles/menu_mode/menu_mode';
import UserBattleSummary from '~/components/user/summary/battles/battle_summary/battle_summary';
import UserBattleLogs from '~/components/user/summary/battles/battle_logs/battle_logs';

import config from '~/config/config';
import styles from './battles.module.scss';

const UserBattles = ({ id }) => {
  const [type, setType] = useState('7');
  const [mode, setMode] = useState('all');
  const [rotationTL, setRotationTL] = useState([]);
  const [rotationPL, setRotationPL] = useState([]);

  const [userBattles, setUserBattles] = useState([[], []]);
  const [userBrawlers, setUserBrawlers] = useState([]);
  const [season, setSeason] = useState({});

  const setMatchType = ({ target }) => {
    setType(target.value);
    setMode('all');
  };

  const setMatchMode = ({ target }) => {
    setMode(target.value);
  };

  useEffect(() => {
    axios.get(`${config.url}/brawlian/${id}/battles/summary`, {
      params: {
        type: type,
        mode: mode,
      },
    }).then(async (result) => {
      setUserBattles(result.data.userBattles);
      setUserBrawlers(result.data.userBrawlers);
      setRotationTL(result.data.rotationTL);
      setRotationPL(result.data.rotationPL);
      setSeason(result.data.season);
    });
  }, [id, type, mode]);

  return (
    <div className={styles.battlesWrapper}>
      <div className={styles.battlesTitle}>
        전투 기록
      </div>
      <div className={styles.battleContent}>
        <div className={styles.battleContentMenus}>
          <UserMenuType type={type}
                        setMatchType={setMatchType} />
          <UserMenuMode mode={mode}
                        setMatchMode={setMatchMode}
                        type={type}
                        rotationTL={rotationTL}
                        rotationPL={rotationPL} />
        </div>
        <UserBattleSummary userBattles={userBattles}
                           userBrawlers={userBrawlers}
                           season={season} />
      </div>
      <UserBattleLogs id={id}
                      type={type}
                      mode={mode} />
    </div>
  );
};

export default UserBattles;