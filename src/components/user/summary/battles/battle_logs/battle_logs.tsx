import React from 'react';
import { Pie } from '@nivo/pie';

import BattleLog from '~/components/user/summary/battles/battle_logs/battle_log/battle_log';

import config from '~/config/config';

import styles from './battle_logs.module.scss';

const UserBattleLogs = ({ recentBattles, recentBrawlers, battles }) => {
  const matchCount = recentBattles?.length || 0;
  const vicCount =
    recentBattles?.filter(({ MATCH_RES }) => MATCH_RES === -1).length || 0;
  const drwCount =
    recentBattles?.filter(({ MATCH_RES }) => MATCH_RES === 0).length || 0;
  const defCount =
    recentBattles?.filter(({ MATCH_RES }) => MATCH_RES === 1).length || 0;

  const artCount =
    recentBattles?.filter(({ BRAWLER_CL }) => BRAWLER_CL === 'Artillery')
      .length || 0;
  const sinCount =
    recentBattles?.filter(({ BRAWLER_CL }) => BRAWLER_CL === 'Assassin')
      .length || 0;
  const cntCount =
    recentBattles?.filter(({ BRAWLER_CL }) => BRAWLER_CL === 'Controller')
      .length || 0;
  const dmgCount =
    recentBattles?.filter(({ BRAWLER_CL }) => BRAWLER_CL === 'Damage Dealer')
      .length || 0;
  const mrkCount =
    recentBattles?.filter(({ BRAWLER_CL }) => BRAWLER_CL === 'Marksman')
      .length || 0;
  const supCount =
    recentBattles?.filter(({ BRAWLER_CL }) => BRAWLER_CL === 'Support')
      .length || 0;
  const tnkCount =
    recentBattles?.filter(({ BRAWLER_CL }) => BRAWLER_CL === 'Tank').length ||
    0;

  const battleData = [
    {
      id: 'Defeat',
      label: 'Defeat',
      value: defCount,
      color: 'hsl(351,57%,60%)',
    },
    {
      id: 'Draw',
      label: 'Draw',
      value: drwCount,
      color: 'hsl(224,39%,52%)',
    },
    {
      id: 'Victory',
      label: 'Victory',
      value: vicCount,
      color: 'hsl(132,29%,50%)',
    },
  ];

  const brawlerData = [
    {
      id: 'Artillery',
      label: 'Artillery',
      value: (artCount / matchCount).toFixed(3) || 0,
    },
    {
      id: 'Assassin',
      label: 'Assassin',
      value: (sinCount / matchCount).toFixed(3) || 0,
    },
    {
      id: 'Controller',
      label: 'Controller',
      value: (cntCount / matchCount).toFixed(3) || 0,
    },
    {
      id: 'Damage Dealer',
      label: 'Damage Dealer',
      value: (dmgCount / matchCount).toFixed(3) || 0,
    },
    {
      id: 'Marksman',
      label: 'Marksman',
      value: (mrkCount / matchCount).toFixed(3) || 0,
    },
    {
      id: 'Support',
      label: 'Support',
      value: (supCount / matchCount).toFixed(3) || 0,
    },
    {
      id: 'Tank',
      label: 'Tank',
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
                <span>{matchCount}전</span>
                <span style={{ color: '#5AA469' }}>{vicCount}승</span>
                <span style={{ color: '#556FB5' }}>{drwCount}무</span>
                <span style={{ color: '#D35D6E' }}>{defCount}패</span>
                <span>(최근 30게임)</span>
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
                <span>사용한 브롤러 역할군</span>
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
              <span>사용한 브롤러 전투 기록</span>
            </div>
            {recentBrawlers?.map(
              ({ BRAWLER_ID, BRAWLER_NM, MATCH_CNT_TOT, MATCH_CNT_RES }) => (
                <div key={BRAWLER_ID} className={styles.battleLogsBrawlers}>
                  <img
                    src={`${config.assets}/brawlers/pins/${BRAWLER_ID}.webp`}
                    alt={'브롤러'}
                  />
                  <div>
                    <div className={styles.brawlerName}>{BRAWLER_NM}</div>
                    <div className={styles.brawlerGame}>
                      {MATCH_CNT_TOT} 게임
                    </div>
                  </div>
                  <span style={{ color: '#5AA469' }}>
                    {MATCH_CNT_RES['-1']}승
                  </span>
                  <span style={{ color: '#556FB5' }}>
                    {MATCH_CNT_RES['0'] || 0}무
                  </span>
                  <span style={{ color: '#D35D6E' }}>
                    {MATCH_CNT_RES['1'] || 0}패
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
        <div className={styles.battleLogsContent}>
          {battles?.map(({ BATTLE_INFO, BATTLE_PLAYERS }) => {
            return (
              <BattleLog
                key={BATTLE_INFO.MATCH_DT}
                BATTLE_INFO={BATTLE_INFO}
                BATTLE_PLAYERS={BATTLE_PLAYERS}
              />
            );
          })}
        </div>
      </div>
    )
  );
};

export default UserBattleLogs;
