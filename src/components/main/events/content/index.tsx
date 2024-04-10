import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment/moment';

import { useInterval } from '~/hooks/use-interval.hook';
import config from '~/config/config';
import styles from './index.module.scss';

export const EventsSummaryItem = ({ event, type }) => {
  const { t } = useTranslation();
  const time = moment(event.endTime);
  const diffTime = {
    day: moment.duration(time.diff(moment())).days(),
    hour: moment.duration(time.diff(moment())).hours(),
    minute: moment.duration(time.diff(moment())).minutes(),
  };
  const [mouseOver, setMouseOver] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseOver = ({ clientY, target }) => {
    const rect =
      target.parentElement.parentElement.parentElement.getBoundingClientRect();

    const x = parseInt(rect.left);
    const y = clientY + window.scrollY;

    setTooltipPosition({ x, y });
    setMouseOver(true);
  };

  const handleMouseOut = () => {
    setMouseOver(false);
  };

  useInterval(() => {
    diffTime.day = moment.duration(time.diff(moment())).days();
    diffTime.hour = moment.duration(time.diff(moment())).hours();
    diffTime.minute = moment.duration(time.diff(moment())).minutes();
  }, 1000);

  useEffect(() => {
    const handleMouseMove = ({ clientY, target }) => {
      if (mouseOver) {
        const rect =
          target.parentElement.parentElement.parentElement.getBoundingClientRect();

        const x = parseInt(rect.left);
        const y = clientY + window.scrollY;

        setTooltipPosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseOver]);

  return (
    <React.Fragment>
      <a key={event.mapID}
         className={styles.mapItem}
         href={`./maps/${event.mapID}`}>
        <img src={`${config.assets}/modes/icon/${event.mode}.webp`}
             alt={event.mode} />
        <div>
          <div className={styles.eventInfo}>
          <span>
            {event.mapID ? t(`map.map.${event.mapID}`) : event.mapName}
          </span>
            <img src={'/images/etc/info.webp'} alt={'info'}
                 onClick={(e) => {
                   e.preventDefault();
                 }}
                 onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut} />
          </div>
          {
            type !== 'ranked' &&
            <div>
              <span>{t('map.event.endsIn')}</span>
              <span>{diffTime.day}{t('map.event.d')}</span>
              <span>{diffTime.hour}{t('map.event.h')}</span>
              <span>{diffTime.minute}{t('map.event.m')}</span>
            </div>
          }
        </div>
      </a>
      {mouseOver && (
        <div className={styles.mapToolTip}
             style={{ left: tooltipPosition.x + 40, top: tooltipPosition.y + 20 }}>
          <img src={`${config.assets}/maps/${event.mapID}.webp`} alt={event.mapID} />
        </div>
      )}
    </React.Fragment>
  );
};