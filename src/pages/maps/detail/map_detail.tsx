import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MapInfo from '~/components/maps/detail/map_info';
import MapMenu from '~/components/maps/detail/menu/menu';
import MapBrawlerStats from '~/components/maps/detail/brawler_stats/brawler_stats';

import config from '~/config/config';

import styles from './map_detail.module.scss';

const MapDetail = () => {
  const { id } = useParams();
  const [type, setType] = useState('0');
  const [grade, setGrade] = useState(['0', '1', '2', '3', '4', '5', '6', '7']);
  const [mapInfo, setMapInfo] = useState({
    MAP_ID: undefined,
    ROTATION_TL_BOOL: false,
    ROTATION_PL_BOOL: false,
  });

  useEffect(() => {
    axios.get(`${config.url}/maps/${id}`).then(async (result) => {
      setMapInfo(result.data);
      if (result.data.ROTATION_TL_BOOL === 0) {
        setType('2');
      }
    });
  }, [id]);

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
        <MapBrawlerStats id={id} type={type} grade={grade} />
      </div>
    )
  );
};

export default MapDetail;
