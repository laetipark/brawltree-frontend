import React, { useContext, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import UserContext from '~/context/user_context';

import config from '~/config/config';

import styles from './season.module.scss';

const UserSeasonRecords = () => {
  const context = useContext(UserContext);
  const { seasonRecords } = context;

  const [trophyToggle, setTrophyToggle] = useState(false);
  const [soloPLToggle, setSoloPLToggle] = useState(false);
  const [teamPLToggle, setTeamPLToggle] = useState(false);

  const totalMatchCount =
    seasonRecords.length !== 0
      ? Math.round(
          seasonRecords.reduce((sum, value) => {
            return sum + (value.MATCH_CNT || 0);
          }, 0) * 100,
        ) / 100
      : 0;
  const totalMatchVicCount =
    seasonRecords.length !== 0
      ? Math.round(
          seasonRecords.reduce((sum, value) => {
            return sum + (value.MATCH_CNT_VIC || 0);
          }, 0) * 100,
        ) / 100
      : 0;
  const totalMatchDefCount =
    seasonRecords.length !== 0
      ? Math.round(
          seasonRecords.reduce((sum, value) => {
            return sum + (value.MATCH_CNT_DEF || 0);
          }, 0) * 100,
        ) / 100
      : 0;

  const trophyMatches = seasonRecords?.find((item) => {
    return item.MATCH_TYP === 0;
  });

  const soloPLMatches = seasonRecords?.find((item) => {
    return item.MATCH_TYP === 2;
  });

  const teamPLMatches = seasonRecords?.find((item) => {
    return item.MATCH_TYP === 3;
  });

  const drwCount = (matchCount, vicCount, defCount) => {
    return matchCount - (parseInt(vicCount) + parseInt(defCount));
  };
  const vicRate = (vicCount, defCount) => {
    return (
      Math.round(
        (parseInt(vicCount) / (parseInt(vicCount) + parseInt(defCount))) * 100,
      ) || 0
    );
  };

  const typeMenu = (matches, toggle, setToggle, typeName) => {
    return (
      matches !== undefined &&
      matches.MATCH_L.length > 0 && (
        <React.Fragment>
          <h3
            className={styles.seasonStatsToggle}
            onClick={() => setToggle(!toggle)}
          >
            <FontAwesomeIcon
              icon={faAngleRight}
              style={{
                padding: '2px',
                transform: toggle ? 'rotate(90deg)' : '',
                transition: 'transform 0.3s ease',
              }}
            />
            <span>{typeName}</span>
          </h3>
          {toggle && (
            <div>
              <h4 className={styles.seasonStatsSummary}>
                <span style={{ color: '#5AA469' }}>승</span>
                <span style={{ color: '#5AA469', fontWeight: 600 }}>
                  {matches.MATCH_CNT_VIC}
                </span>
                <span style={{ color: '#5AA469' }}>회</span>
                <span style={{ color: '#556FB5' }}>무</span>
                <span style={{ color: '#556FB5', fontWeight: 600 }}>
                  {drwCount(
                    matches.MATCH_CNT,
                    matches.MATCH_CNT_VIC,
                    matches.MATCH_CNT_DEF,
                  )}
                </span>
                <span style={{ color: '#556FB5' }}>회</span>
                <span style={{ color: '#D35D6E' }}>패</span>
                <span style={{ color: '#D35D6E', fontWeight: 600 }}>
                  {matches.MATCH_CNT_DEF}
                </span>
                <span style={{ color: '#D35D6E' }}>회</span>
                <span>/</span>
                <span style={{ fontWeight: 600 }}>
                  승률 {vicRate(matches.MATCH_CNT_VIC, matches.MATCH_CNT_DEF)}
                </span>
                <span>%</span>
              </h4>
              <div className={styles.matchList}>
                {matches.MATCH_L?.map((record) => {
                  return (
                    <div
                      key={`${record.USER_ID}_${record.MAP_MD}_${record.MATCH_TYP}_${record.MATCH_GRD}`}
                    >
                      <img
                        className={styles.modeImage}
                        src={`${config.assets}/modes/icon/${record.MAP_MD}.webp`}
                        alt={'게임모드'}
                      />
                      <div>
                        <div className={styles.seasonStatsSummary}>
                          <span>매치</span>
                          <span style={{ fontWeight: 600 }}>
                            {record.MATCH_CNT}
                          </span>
                          <span>회</span>
                          <span>(</span>
                          <span style={{ color: '#5AA469', fontWeight: 600 }}>
                            {record.MATCH_CNT_VIC}
                          </span>
                          <span>/</span>
                          <span style={{ color: '#556FB5', fontWeight: 600 }}>
                            {drwCount(
                              record.MATCH_CNT,
                              record.MATCH_CNT_VIC,
                              record.MATCH_CNT_DEF,
                            )}
                          </span>
                          <span>/</span>
                          <span style={{ color: '#D35D6E', fontWeight: 600 }}>
                            {record.MATCH_CNT_DEF}
                          </span>
                          <span>)</span>
                        </div>
                        <div className={styles.seasonStatsSummary}>
                          <img
                            className={styles.rankImage}
                            src={`${config.assets}/rank/${
                              typeName === '트로피 리그'
                                ? `trophy_league/${record.MATCH_GRD}`
                                : `power_league/${Math.floor(
                                    (record.MATCH_GRD - 1) / 3,
                                  )}`
                            }.webp`}
                            alt={'트로피 리그 랭크'}
                          />
                          <span>승률</span>
                          <span style={{ fontWeight: 600 }}>
                            {vicRate(
                              record.MATCH_CNT_VIC,
                              record.MATCH_CNT_DEF,
                            )}
                          </span>
                          <span>%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </React.Fragment>
      )
    );
  };

  return (
    <div className={styles.seasonWrapper}>
      <div>
        <h2>
          시즌 기록<span>({totalMatchCount}회)</span>
        </h2>
        <h4 className={styles.seasonStatsSummary}>
          <span style={{ color: '#5AA469' }}>승 {totalMatchVicCount}회</span>
          <span style={{ color: '#556FB5' }}>무</span>
          <span style={{ color: '#556FB5', fontWeight: 600 }}>
            {drwCount(totalMatchCount, totalMatchVicCount, totalMatchDefCount)}
          </span>
          <span style={{ color: '#556FB5' }}>회</span>
          <span style={{ color: '#D35D6E' }}>패</span>
          <span style={{ color: '#D35D6E', fontWeight: 600 }}>
            {totalMatchDefCount}
          </span>
          <span style={{ color: '#D35D6E' }}>회</span>
          <span>/</span>
          <span>승률</span>
          <span style={{ fontWeight: 600 }}>
            {vicRate(totalMatchVicCount, totalMatchDefCount)}
          </span>
          <span>%</span>
        </h4>
      </div>
      {typeMenu(trophyMatches, trophyToggle, setTrophyToggle, '트로피 리그')}
      {typeMenu(soloPLMatches, soloPLToggle, setSoloPLToggle, '솔로 파워 리그')}
      {typeMenu(teamPLMatches, teamPLToggle, setTeamPLToggle, '팀 파워 리그')}
    </div>
  );
};

export default UserSeasonRecords;