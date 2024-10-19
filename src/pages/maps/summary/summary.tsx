import React, { useContext, useEffect, useState } from 'react';
import { MapService } from '~/services/map.service';
import { MapInput } from '~/components/maps/summary/map-input';
import { ModeFilter } from '~/components/maps/summary/mode-filter';
import { MapList } from '~/components/maps/summary/map-list';
import styles from './summary.module.scss';
import { isRRMatch } from '~/utils/korean-pattern';
import { CdnContext } from '~/context/cdn.context';

export const MapSummary = () => {
  const [maps, setMaps] = useState({});
  const [searchMapName, setSearchMapName] = useState('');
  const [filterMaps, setFilterMaps] = useState({});

  const locales = useContext(CdnContext);

  useEffect(() => {
    MapService.getMaps().then((data) => {
      setMaps(data.maps);
    });
  }, []);

  useEffect(() => {
    const filteredMaps = {};

    Object.keys(maps).forEach((mode) => {
      filteredMaps[mode] = maps[mode].filter((map) =>
        isRRMatch(
          searchMapName,
          locales.map['map'][`${map.mapID}`] || map.mapName,
        ),
      );
    });
    setFilterMaps(filteredMaps);
  }, [searchMapName, maps]);

  return (
    <div className={styles.app}>
      <MapInput setMapName={setSearchMapName} />
      <ModeFilter maps={filterMaps} />
      <MapList maps={filterMaps} />
    </div>
  );
};
