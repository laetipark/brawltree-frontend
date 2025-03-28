import React, { useContext } from 'react';
import { Pie } from '@nivo/pie';

import { UserBattleLogsItemBox } from '~/pages/user/user-menu/user-profile/user-battles/user-battle-logs-item';
import { UserBrawlerStatsBox } from '~/pages/user/user-menu/user-profile/user-battles/user-brawler-stats';
import { CdnContext } from '~/context/cdn.context';

import styles from '~/assets/styles/pages/user/user-menu/user-profile/user-battles/user-battle-logs.module.scss';

export const UserBattleLogsBox = ({ recentBattles, recentBrawlers, battles }) => {
  const locales = useContext(CdnContext);

  const matchCount = recentBattles?.length || 0;
  const vicCount = recentBattles?.filter(({ gameResult }) => gameResult === -1).length || 0;
  const drwCount = recentBattles?.filter(({ gameResult }) => gameResult === 0).length || 0;
  const defCount = recentBattles?.filter(({ gameResult }) => gameResult === 1).length || 0;

  const artCount = recentBattles?.filter(({ role }) => role === 'Artillery').length || 0;
  const sinCount = recentBattles?.filter(({ role }) => role === 'Assassin').length || 0;
  const cntCount = recentBattles?.filter(({ role }) => role === 'Controller').length || 0;
  const dmgCount = recentBattles?.filter(({ role }) => role === 'Damage Dealer').length || 0;
  const mrkCount = recentBattles?.filter(({ role }) => role === 'Marksman').length || 0;
  const supCount = recentBattles?.filter(({ role }) => role === 'Support').length || 0;
  const tnkCount = recentBattles?.filter(({ role }) => role === 'Tank').length || 0;

  const battleData = [
    {
      id: 'Defeat',
      label: locales.battle['result']['1'],
      value: defCount,
      color: 'hsl(351,57%,60%)'
    },
    {
      id: 'Draw',
      label: locales.battle['result']['0'],
      value: drwCount,
      color: 'hsl(224,39%,52%)'
    },
    {
      id: 'Victory',
      label: locales.battle['result']['-1'],
      value: vicCount,
      color: 'hsl(132,29%,50%)'
    }
  ];

  const brawlerData = [
    {
      id: 'Artillery',
      label: locales.brawler['brawlerRole'].Artillery,
      value: (artCount / matchCount).toFixed(3) || 0
    },
    {
      id: 'Assassin',
      label: locales.brawler['brawlerRole'].Assassin,
      value: (sinCount / matchCount).toFixed(3) || 0
    },
    {
      id: 'Tank',
      label: locales.brawler['brawlerRole'].Tank,
      value: (tnkCount / matchCount).toFixed(3) || 0
    },
    {
      id: 'Damage Dealer',
      label: locales.brawler['brawlerRole']['Damage Dealer'],
      value: (dmgCount / matchCount).toFixed(3) || 0
    },
    {
      id: 'Marksman',
      label: locales.brawler['brawlerRole'].Marksman,
      value: (mrkCount / matchCount).toFixed(3) || 0
    },
    {
      id: 'Support',
      label: locales.brawler['brawlerRole'].Support,
      value: (supCount / matchCount).toFixed(3) || 0
    },
    {
      id: 'Controller',
      label: locales.brawler['brawlerRole'].Controller,
      value: (cntCount / matchCount).toFixed(3) || 0
    }
  ];

  return (
    (recentBattles?.length || 0) > 0 && (
      <div className={styles.userBattleLogBox}>
        <div className={styles.recentBattlesBox}>
          <div className={styles.recentBattlesGraphBox}>
            <div>
              <div>
                <h3>{locales.user['battle']?.recentBattles || 'recentBattles'}</h3>
                <div>
                  <span>
                    {matchCount}
                    {locales.battle['result'].game}
                  </span>{' '}
                  <span style={{ color: '#5AA469' }}>
                    {vicCount}
                    {locales.battle['result'].w}
                  </span>{' '}
                  <span style={{ color: '#556FB5' }}>
                    {drwCount}
                    {locales.battle['result'].d}
                  </span>{' '}
                  <span style={{ color: '#D35D6E' }}>
                    {defCount}
                    {locales.battle['result'].l}
                  </span>{' '}
                  <span>
                    ({battles.length} {locales.application['games']})
                  </span>
                </div>
              </div>
              <Pie
                data={battleData}
                width={280}
                height={220}
                margin={{ bottom: 40 }}
                startAngle={-180}
                endAngle={180}
                innerRadius={0.4}
                colors={{ scheme: 'set1' }}
                enableArcLinkLabels={false}
                arcLabelsSkipAngle={10}
                isInteractive={false}
                animate={false}
                legends={[
                  {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateY: 12,
                    itemsSpacing: 12,
                    itemWidth: 32,
                    itemHeight: 4,
                    itemTextColor: '#111',
                    itemDirection: 'top-to-bottom',
                    itemOpacity: 1,
                    symbolSize: 12,
                    symbolShape: 'circle'
                  }
                ]}
              />
            </div>
            <div>
              <h3>{locales.user['battle'].brawlerRoleUsed}</h3>
              <Pie
                data={brawlerData}
                width={280}
                height={220}
                margin={{ bottom: 40 }}
                valueFormat=" >-~%"
                sortByValue={true}
                innerRadius={0.4}
                colors={{ scheme: 'set3' }}
                enableArcLinkLabels={false}
                arcLabelsSkipAngle={10}
                isInteractive={false}
                animate={false}
                legends={[
                  {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateY: 12,
                    itemsSpacing: 12,
                    itemWidth: 28,
                    itemHeight: 4,
                    itemTextColor: '#111',
                    itemDirection: 'top-to-bottom',
                    itemOpacity: 1,
                    symbolSize: 12,
                    symbolShape: 'circle'
                  }
                ]}
              />
            </div>
          </div>
          <div className={styles.recentBrawlerRecordBox}>
            <div className={styles.battleLogsText}>
              <h3>{locales.user['battle']?.brawlerBattles || 'brawlerBattles'}</h3>
            </div>
            <UserBrawlerStatsBox brawlers={recentBrawlers} type={'stat'} />
          </div>
        </div>
        <div className={styles.battleLogsBox}>
          {battles?.map(({ battleInfo, battlePlayers }) => {
            return <UserBattleLogsItemBox key={battleInfo.battleTime} battleInfo={battleInfo} battlePlayers={battlePlayers} />;
          })}
        </div>
      </div>
    )
  );
};
