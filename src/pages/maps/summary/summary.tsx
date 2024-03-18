import React, { useEffect, useState } from 'react';
import { MapService } from '~/services/map.service';
import { ModeFilter } from '~/components/maps/summary/mode-filter/mode-filter';
import { MapList } from '~/components/maps/summary/map-list/map-list';
import styles from './summary.module.scss';

export const MapSummary = () => {
  const [maps, setMaps] = useState({});

  useEffect(() => {
    MapService.getMaps().then((data) => {
      setMaps(data.maps);
    });
  }, []);

  console.log(maps);
  return (
    <div className={styles.app}>
      <ModeFilter maps={maps} />
      <MapList maps={maps} />
    </div>
  );
};