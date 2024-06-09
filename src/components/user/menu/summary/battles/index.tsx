import React, { useContext } from 'react';

import { MenuType } from '~/components/menu/type-n-mode/menu-type/menu-type';
import { ModeMenu } from '~/components/menu/type-n-mode/menu-mode/menu-mode';
import { UserBattleStats } from '~/components/user/menu/summary/battles/stats';
import { UserBattleLogs } from '~/components/user/menu/summary/battles/battle-logs';

import { UserContext } from '~/context/user.context';

import styles from './index.module.scss';

export const UserBattles = () => {
  const context = useContext(UserContext);
  const {
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
    setType,
    setMode,
    setStack,
  } = context;


  const setMatchType = ({ target }) => {
    setType(target.value);
    setMode('all');
    setStack(() => 0);
  };

  const setMatchMode = ({ target }) => {
    setMode(target.value);
    setStack(() => 0);
  };

  return (
    <div className={styles.battlesWrapper}>
      <div className={styles.battlesTitle}>전투 기록</div>
      <div className={styles.battleContent}>
        <div className={styles.battleContentMenus}>
          <MenuType type={type} setMatchType={setMatchType} />
          <ModeMenu
            mode={mode}
            setMatchMode={setMatchMode}
            type={type}
            rotationTL={rotationTL}
            rotationPL={rotationPL}
          />
        </div>
        <UserBattleStats
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
