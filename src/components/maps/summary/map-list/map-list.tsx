import React from 'react';
import { EventItem } from '~/components/maps/item/event';
import { useTranslation } from 'react-i18next';

import styles from './map-list.module.scss';
import config from '~/config/config';

export const MapList = ({ maps }) => {
  const { t } = useTranslation();

  return (Object.keys(maps).map((mode) => {
      const modeMaps = maps[mode];
      const modeName = mode.split('_')[0];

      return (
        <div id={modeName} className={styles.mapListWrapper} key={mode}>
          <div className={styles.modeTitle}>
            <img src={`${config.assets}/modes/icon/${modeName}.webp`} alt={modeName} />
            <div>{t(`battle.mode.${modeName}`)}</div>
          </div>
          <div className={styles.modeList}>{
            modeMaps.map((map) => {
              return (
                <div key={`${map.mapID}_${map.startTime}`}>
                  <EventItem key={map.mapID} event={map} type={null} />
                </div>
              );
            })
          }</div>
        </div>
      );
    })
  );
};