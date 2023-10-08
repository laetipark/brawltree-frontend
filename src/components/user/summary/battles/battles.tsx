import React, { useContext } from 'react';

import UserMenuType from '~/components/menu/menu_type/menu_type';
import UserMenuMode from '~/components/menu/menu_mode/menu_mode';
import UserBattleSummary from '~/components/user/summary/battles/battle_summary/battle_summary';
import UserBattleLogs from '~/components/user/summary/battles/battle_logs/battle_logs';

import UserContext from '~/context/user_context';

import styles from './battles.module.scss';

const UserBattles = () => {
  const context = useContext(UserContext);
  const {
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
  } = context;

  const setMatchType = ({ target }) => {
    setType(target.value);
    setMode('all');
  };

  const setMatchMode = ({ target }) => {
    setMode(target.value);
  };

  return (
    <div className={styles.battlesWrapper}>
      <div className={styles.battlesTitle}>전투 기록</div>
      <div className={styles.battleContent}>
        <div className={styles.battleContentMenus}>
          <UserMenuType type={type} setMatchType={setMatchType} />
          <UserMenuMode
            mode={mode}
            setMatchMode={setMatchMode}
            type={type}
            rotationTL={rotationTL}
            rotationPL={rotationPL}
          />
        </div>
        <UserBattleSummary
          battlesSummary={battlesSummary}
          brawlersSummary={brawlersSummary}
          season={season}
        />
      </div>
      <UserBattleLogs
        recentBattles={recentBattles}
        recentBrawlers={recentBrawlers}
        battles={battles}
      />
    </div>
  );
};

export default UserBattles;
