import React from 'react';

import config from '~/config/config';

import styles from './index.module.scss';

const MapInfo = ({ mapInfo }) => {
  return (
    <div className={styles.mapWrapper}>
      <div className={styles.mapTitle}>
        <div>
          <img
            src={`${config.assets}/modes/icon/${mapInfo.mode}.webp`}
            alt={mapInfo.mode}
          />
        <span>{mapInfo.name}</span>
        </div>
        <div>
          {
            mapInfo.isTrophyLeague > 0 &&
            <img
              src={`${config.assets}/modes/icon/trophyLeague.webp`}
              alt={`trophyLeague`}
            />
          }
          {
            mapInfo.isPowerLeague > 0 &&
            <img
              src={`${config.assets}/modes/icon/powerLeague.webp`}
              alt={`trophyLeague`}
            />
          }
        </div>
      </div>
      <div className={styles.mapImage}>
        <img
          src={`${config.assets}/maps/${mapInfo.mapID}.webp`}
          alt={mapInfo.mapID}
        />
      </div>
    </div>
  );
};

export default MapInfo;
