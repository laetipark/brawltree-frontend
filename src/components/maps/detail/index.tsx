import React from 'react';
import { useTranslation } from 'react-i18next';

import config from '~/config/config';

import styles from './index.module.scss';

const MapInfo = ({ mapInfo }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.mapTitle}>
        <div>
          <img
            src={`${config.assets}/modes/icon/${mapInfo.mode}.webp`}
            alt={mapInfo.mode}
          />
          <span>{t(`map.map.${mapInfo.mapID}`) || mapInfo.mapName}</span>
        </div>
        <div>
          {mapInfo.isTrophyLeague > 0 && (
            <img
              src={`${config.assets}/modes/icon/trophy.webp`}
              alt={`trophyLeague`}
            />
          )}
          {mapInfo.isPowerLeague > 0 && (
            <img
              src={`${config.assets}/modes/icon/ranked.webp`}
              alt={`trophyLeague`}
            />
          )}
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
