import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MapInfo from '~/components/maps/detail';
import MapMenu from '~/components/maps/detail/menu/menu';
import MapStats from '~/components/maps/detail/stats/stats';

import MapService from '~/services/map_service';

import styles from './detail.module.scss';

const MapDetail = () => {
  const { id } = useParams();
  const [type, setType] = useState('0');
  const [grade, setGrade] = useState(['0', '1', '2', '3', '4', '5', '6', '7']);
  const [mapInfo, setMapInfo] = useState({
    MAP_ID: undefined,
    ROTATION_TL_BOOL: false,
    ROTATION_PL_BOOL: false,
  });
  const [brawlerStats, setBrawlerStats] = useState([]);

  useEffect(() => {
    MapService.getMap({ id, type, grade }).then((data) => {
      setMapInfo(data.map);
      setBrawlerStats(data.map);
    });
  }, [id, type, grade]);

  return (
    mapInfo.MAP_ID && (
      <div className={styles.app}>
        <MapInfo mapInfo={mapInfo} />
        <MapMenu
          type={type}
          grade={grade}
          setType={setType}
          setGrade={setGrade}
          rotationTL={mapInfo.ROTATION_TL_BOOL}
          rotationPL={mapInfo.ROTATION_PL_BOOL}
        />
        <MapStats brawlers={brawlerStats} />
      </div>
    )
  );
};

export default MapDetail;
