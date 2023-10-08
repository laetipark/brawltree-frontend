import React from 'react';

import config from '~/config/config';

import styles from './index.module.scss';

const MapInfo = ({ mapInfo }) => {
  return (
    <div className={styles.mapWrapper}>
      <div className={styles.mapTitle}>
        <div>
          <img
            src={`${config.assets}/modes/icon/${mapInfo.MAP_MD}.webp`}
            alt={mapInfo.MAP_MD}
          />
        <span>{mapInfo.MAP_NM}</span>
        </div>
        <div>
          {
            mapInfo.ROTATION_TL_BOOL > 0 &&
            <img
              src={`${config.assets}/modes/icon/trophyLeague.webp`}
              alt={`trophyLeague`}
            />
          }
          {
            mapInfo.ROTATION_PL_BOOL > 0 &&
            <img
              src={`${config.assets}/modes/icon/powerLeague.webp`}
              alt={`trophyLeague`}
            />
          }
        </div>
      </div>
      <div className={styles.mapImage}>
        <img
          src={`${config.assets}/maps/${mapInfo.MAP_ID}.webp`}
          alt={mapInfo.MAP_ID}
        />
      </div>
    </div>
  );
};

export default MapInfo;
