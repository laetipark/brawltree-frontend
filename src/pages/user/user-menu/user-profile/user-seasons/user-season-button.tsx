import React, { useContext } from 'react';

import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UserSeasonModeBox } from '~/pages/user/user-menu/user-profile/user-seasons/user-season-mode';

import { CdnContext } from '~/context/cdn.context';

import styles from '~/assets/styles/pages/user/user-menu/user-profile/user-seasons/user-season-button.module.scss';

export const UserSeasonButtonBox = ({ matches, toggle, setToggle, type }) => {
  const locales = useContext(CdnContext);
  const drwCount = (matchCount: number, vicCount: number, defCount: number) => {
    return matchCount - (vicCount + defCount);
  };
  const vicRate = (vicCount: number, defCount: number) => {
    return Math.round((vicCount / (vicCount + defCount)) * 100) || 0;
  };
  const keys = matches?.matchList && Object.keys(matches.matchList);

  return (
    keys?.length > 0 && (
      <React.Fragment>
        <h3 className={styles.userSeasonButtonBox} onClick={() => setToggle(!toggle)}>
          <FontAwesomeIcon
            icon={faAngleRight}
            style={{
              padding: '2px',
              transform: toggle ? 'rotate(90deg)' : '',
              transition: 'transform 0.3s ease'
            }}
          />
          <span>{locales.battle['type'][`${type}`]}</span>
        </h3>
        {toggle && (
          <div>
            <div className={styles.seasonTypeSummaryBox}>
              <div style={{ color: '#5AA469' }}>
                <span>{matches.victoriesCount}</span>
                <span>{locales.battle['result'].w}</span>
              </div>
              <div style={{ color: '#556FB5' }}>
                <span>{drwCount(matches.matchCount, matches.victoriesCount, matches.defeatsCount)}</span>
                <span>{locales.battle['result'].d}</span>
              </div>
              <div style={{ color: '#D35D6E' }}>
                <span>{matches.defeatsCount}</span>
                <span>{locales.battle['result'].l}</span>
              </div>
              <span>({vicRate(matches.victoriesCount, matches.defeatsCount)}%)</span>
            </div>
            <div className={styles.matchListBox}>
              {keys.map((key) => {
                const season = matches.matchList[key];
                return (
                  <React.Fragment key={`${season.modeName}_${season.matchType}_${season.matchGrade}`}>
                    <UserSeasonModeBox season={season} />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </React.Fragment>
    )
  );
};
