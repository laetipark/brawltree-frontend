import React, { useContext } from 'react';
import { Pie } from '@nivo/pie';

import BattleLogItem from '~/components/user/menu/summary/battles/battle-logs/item';
import { CdnContext } from '~/context/cdn.context';

import config from '~/config/config';

import styles from './index.module.scss';

export const UserBattleLogs = ({ recentBattles, recentBrawlers, battles }) => {
  const locales = useContext(CdnContext);

  const matchCount = recentBattles?.length || 0;
  const vicCount =
    recentBattles?.filter(({ gameResult }) => gameResult === -1).length || 0;
  const drwCount =
    recentBattles?.filter(({ gameResult }) => gameResult === 0).length || 0;
  const defCount =
    recentBattles?.filter(({ gameResult }) => gameResult === 1).length || 0;

  const artCount =
    recentBattles?.filter(({ role }) => role === 'Artillery').length || 0;
  const sinCount =
    recentBattles?.filter(({ role }) => role === 'Assassin').length || 0;
  const cntCount =
    recentBattles?.filter(({ role }) => role === 'Controller').length || 0;
  const dmgCount =
    recentBattles?.filter(({ role }) => role === 'Damage Dealer').length || 0;
  const mrkCount =
    recentBattles?.filter(({ role }) => role === 'Marksman').length || 0;
  const supCount =
    recentBattles?.filter(({ role }) => role === 'Support').length || 0;
  const tnkCount =
    recentBattles?.filter(({ role }) => role === 'Tank').length || 0;

  const battleData = [
    {
      id: 'Defeat',
      label: locales.battle['result']['1'],
      value: defCount,
      color: 'hsl(351,57%,60%)',
    },
    {
      id: 'Draw',
      label: locales.battle['result']['0'],
      value: drwCount,
      color: 'hsl(224,39%,52%)',
    },
    {
      id: 'Victory',
      label: locales.battle['result']['-1'],
      value: vicCount,
      color: 'hsl(132,29%,50%)',
    },
  ];

  const brawlerData = [
    {
      id: 'Artillery',
      label: locales.brawler['brawlerRole'].Artillery,
      value: (artCount / matchCount).toFixed(3) || 0,
    },
    {
      id: 'Assassin',
      label: locales.brawler['brawlerRole'].Assassin,
      value: (sinCount / matchCount).toFixed(3) || 0,
    },
    {
      id: 'Controller',
      label: locales.brawler['brawlerRole'].Controller,
      value: (cntCount / matchCount).toFixed(3) || 0,
    },
    {
      id: 'Damage Dealer',
      label: locales.brawler['brawlerRole']['Damage Dealer'],
      value: (dmgCount / matchCount).toFixed(3) || 0,
    },
    {
      id: 'Marksman',
      label: locales.brawler['brawlerRole'].Marksman,
      value: (mrkCount / matchCount).toFixed(3) || 0,
    },
    {
      id: 'Support',
      label: locales.brawler['brawlerRole'].Support,
      value: (supCount / matchCount).toFixed(3) || 0,
    },
    {
      id: 'Tank',
      label: locales.brawler['brawlerRole'].Tank,
      value: (tnkCount / matchCount).toFixed(3) || 0,
    },
  ];

  return (
    (recentBattles?.length || 0) > 0 && (
      <div className={styles.battleLogsWrapper}>
        <div className={styles.battleLogsTitle}>
          <div className={styles.battleLogsRecordGraph}>
            <div>
              <div className={styles.battleLogsText}>
                <span>
                  {matchCount}
                  {locales.battle['result'].game}
                </span>
                <span style={{ color: '#5AA469' }}>
                  {vicCount}
                  {locales.battle['result'].w}
                </span>
                <span style={{ color: '#556FB5' }}>
                  {drwCount}
                  {locales.battle['result'].d}
                </span>
                <span style={{ color: '#D35D6E' }}>
                  {defCount}
                  {locales.battle['result'].l}
                </span>
                <span>
                  ({locales.application['recent']} {battles.length}{' '}
                  {locales.application['game']})
                </span>
              </div>
              <Pie
                data={battleData}
                width={280}
                height={120}
                margin={{ top: 4, bottom: 4, right: 120 }}
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
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 10,
                    itemWidth: 120,
                    itemHeight: 8,
                    itemTextColor: '#111',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 12,
                    symbolShape: 'circle',
                  },
                ]}
              />
            </div>
            <div>
              <div className={styles.battleLogsText}>
                <span>{locales.user['battle'].brawlerRoleUsed}</span>
              </div>
              <Pie
                data={brawlerData}
                width={280}
                height={120}
                margin={{ top: 4, bottom: 4, right: 120 }}
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
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 10,
                    itemWidth: 120,
                    itemHeight: 8,
                    itemTextColor: '#111',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 12,
                    symbolShape: 'circle',
                  },
                ]}
              />
            </div>
          </div>
          <div className={styles.battleLogsBrawlerRecord}>
            <div className={styles.battleLogsText}>
              <span>{locales.user['battle'].brawlerBattleHistory}</span>
            </div>
            {recentBrawlers?.map(
              ({ brawlerID, brawlerName, matchCount, resultCount }) => (
                <div key={brawlerID} className={styles.battleLogsBrawlers}>
                  <img
                    src={`${config.assets}/brawlers/pins/${brawlerID}.webp`}
                    alt={brawlerID}
                  />
                  <div>
                    <div className={styles.brawlerName}>
                      {locales.brawler['brawler'][`${brawlerName}`]}
                    </div>
                    <div className={styles.brawlerGame}>
                      {matchCount} {locales.application['game']}
                    </div>
                  </div>
                  <span style={{ color: '#5AA469' }}>
                    {resultCount['-1'] || 0}
                    {locales.battle['result'].w}
                  </span>
                  <span style={{ color: '#556FB5' }}>
                    {resultCount['0'] || 0}
                    {locales.battle['result'].d}
                  </span>
                  <span style={{ color: '#D35D6E' }}>
                    {resultCount['1'] || 0}
                    {locales.battle['result'].l}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
        <div className={styles.battleLogsContent}>
          {battles?.map(({ battleInfo, battlePlayers }) => {
            return (
              <BattleLogItem
                key={battleInfo.battleTime}
                battleInfo={battleInfo}
                battlePlayers={battlePlayers}
              />
            );
          })}
        </div>
      </div>
    )
  );
};
