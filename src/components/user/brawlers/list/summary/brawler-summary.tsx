import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import config from '~/config/config';

import styles from './brawler-summary.module.scss';

export const BrawlerSummary = ({
                                 brawlerID,
                                 name,
                                 beginTrophies,
                                 currentTrophies,
                                 highestTrophies,
                                 checkedList,
                                 checkHandler,
                               }) => {
  const trophyChange =
    currentTrophies - beginTrophies > 0
      ? `+${currentTrophies - beginTrophies}`
      : currentTrophies - beginTrophies;
  const arrowRotate = {
    transform: checkedList.includes(brawlerID) ? 'rotate(180deg)' : '',
    transition: 'transform 0.3s ease',
  };

  return (
    <div key={brawlerID}>
      <input
        className={styles.brawlerSummaryButton}
        type={'checkbox'}
        id={`brawler_${brawlerID}`}
        name={`brawler_${brawlerID}`}
        checked={checkedList.includes(brawlerID)}
        onChange={(e) => checkHandler(e, brawlerID)}
      />
      <label htmlFor={`brawler_${brawlerID}`} className={styles.brawlerSummary}>
        <img
          src={`${config.assets}/brawlers/profiles/${brawlerID}.webp`}
          alt={brawlerID}
        />
        <h4>{name}</h4>
        <div>
          <img
            src={`${config.assets}/modes/icon/trophyLeague.webp`}
            alt={'브롤러'}
          />
          <div className={styles.brawlerTrophy}>
            <div>현재</div>
            <div>{currentTrophies}개</div>
          </div>
          <div className={styles.brawlerTrophy}>
            <div>최고</div>
            <div>{highestTrophies}개</div>
          </div>
          <div className={styles.brawlerTrophy}>
            <div>변화량</div>
            <div>{trophyChange}개</div>
          </div>
        </div>
        <FontAwesomeIcon style={arrowRotate} fontSize={10} icon={faArrowUp} />
      </label>
      <div
        className={styles.brawlerDetail}
        style={{ display: checkedList.includes(brawlerID) ? 'flex' : 'none' }}
      ></div>
    </div>
  );
};
