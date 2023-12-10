import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MapInfo from '~/components/maps/detail';
import MapMenu from '~/components/menu/type-n-grade/menu';
import MapStats from '~/components/maps/detail/stats/stats';

import MapService from '~/services/map.service';

import styles from './detail.module.scss';

const MapDetail = () => {
  const { id } = useParams();
  const [type, setType] = useState('0');
  const [grade, setGrade] = useState(['0', '1', '2', '3', '4', '5', '6', '7']);
  const [mapInfo, setMapInfo] = useState({
    mapID: undefined,
    isTrophyLeague: false,
    isPowerLeague: false,
  });
  const [brawlerStats, setBrawlerStats] = useState([]);

  useEffect(() => {
    MapService.getMap({ id, type, grade }).then((data) => {
      setMapInfo(data.map);
      setBrawlerStats(data.stats);
    });
  }, [id, type, grade]);

  return (
    mapInfo.mapID && (
      <div className={styles.app}>
        <MapInfo mapInfo={mapInfo} />
        <MapMenu
          type={type}
          grade={grade}
          setType={setType}
          setGrade={setGrade}
          rotationTL={mapInfo.isTrophyLeague}
          rotationPL={mapInfo.isPowerLeague}
        />
        <MapStats brawlers={brawlerStats} />
      </div>
    )
  );
};

export default MapDetail;
