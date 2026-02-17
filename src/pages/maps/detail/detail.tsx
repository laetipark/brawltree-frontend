import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { MapInfo } from '~/components/maps/detail';
import MapMenu from '~/components/combo/grade-combo';
import MapStats from '~/components/maps/detail/stats';

import { MapBrawlerStatsType, MapService } from '~/services/map.service';

import styles from './detail.module.scss';
import { Spinner } from '~/components/spinner/spinner';
import { MapInfoType } from '~/common/types/maps.type';

const useQueryParams = () => new URLSearchParams(useLocation().search);

export const MapDetail = () => {
  const { name } = useParams();
  const queryParams = useQueryParams();
  const isRanked = queryParams.get('type');
  const [type, setType] = useState(isRanked ? '2' : '0');
  const [grade, setGrade] = useState(['4', '5', '6', '7']);
  const [mapInfo, setMapInfo] = useState<MapInfoType | null>(null);
  const [brawlerStats, setBrawlerStats] = useState<MapBrawlerStatsType[]>([]);

  useEffect(() => {
    if (!name) {
      return;
    }

    const mapName = name.replace(/-/g, ' ');
    MapService.getMap({ name: mapName, type, grade }).then((data) => {
      setMapInfo(data.map);
      setBrawlerStats(data.stats);

      if (data.map && !data.map.isTrophyLeague && data.map.isPowerLeague) {
        setType('2');
      }
    });
  }, [name, type, grade]);

  useEffect(() => {
    history.replaceState({}, '', window.location.pathname.replace(/ /g, '-'));
  }, []);

  return mapInfo ? (
    <div className={styles.app}>
      <MapInfo mapInfo={mapInfo} />
      {!['soloShowdown', 'duoShowdown', 'duels', 'hunters', 'roboRumble', 'bigGame', 'bossFight'].includes(mapInfo.mode) && (
        <MapMenu type={type} grade={grade} setType={setType} setGrade={setGrade} rotationTL={mapInfo.isTrophyLeague} rotationPL={mapInfo.isPowerLeague} />
      )}
      <MapStats brawlers={brawlerStats} />
    </div>
  ) : (
    <Spinner />
  );
};
