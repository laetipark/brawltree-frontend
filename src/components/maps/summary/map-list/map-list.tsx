import React from 'react';

import styles from './map-list.module.scss';
import { EventItems } from '~/components/maps/item';

export const MapList = ({ maps }) => {
  return (Object.keys(maps).map((mode) => {
      const modeMaps = maps[mode];
      const modeName = mode.split('_')[0];

      return (
        <div id={modeName} className={styles.mapListWrapper} key={mode}>
          <div className={styles.modeList}>{
            <EventItems events={modeMaps}
                        type={mode} />
          }</div>
        </div>
      );
    })
  );
};