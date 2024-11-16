import React, { useContext, useState } from 'react';
import moment from 'moment/moment';

import { useInterval } from '~/hooks/use-interval.hook';

import { CdnContext } from '~/context/cdn.context';

import config from '~/config/config';
import styles from './index.module.scss';

export const EventItem = ({ event, type }) => {
  const locales = useContext(CdnContext);
  const time = moment(type === 'curr' ? event.endTime : event.startTime);
  if (type !== 'curr') {
    time.set('date', new Date().getDate());
    if (moment.duration(time.diff(moment())).asSeconds() < 0) {
      time.set('date', new Date().getDate() + 1);
    }
  }

  const diffTime = {
    day:
      type === 'curr'
        ? moment.duration(time.diff(moment())).days()
        : moment.duration(time.diff(moment())).days() > 0
          ? moment.duration(time.diff(moment())).days()
          : 0,
    hour:
      type === 'curr'
        ? moment.duration(time.diff(moment())).hours()
        : Math.abs(moment.duration(time.diff(moment())).hours()),
    minute:
      type === 'curr'
        ? moment.duration(time.diff(moment())).minutes()
        : Math.abs(moment.duration(time.diff(moment())).minutes()),
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
    diffTime.day =
      type === 'curr' ? moment.duration(time.diff(moment())).days() : 0;
    diffTime.hour =
      type === 'curr'
        ? moment.duration(time.diff(moment())).hours()
        : Math.abs(moment.duration(time.diff(moment())).hours());
    diffTime.minute =
      type === 'curr'
        ? moment.duration(time.diff(moment())).minutes()
        : Math.abs(moment.duration(time.diff(moment())).minutes());
  }, 1000);

  return (
    <React.Fragment>
      <a
        key={event.mapID}
        className={styles.mapItem}
        href={`../maps/${event.mapID}`}
      >
        <img
          src={`${config.assets}/modes/icon/${event.mode}.webp`}
          alt={event.mode}
        />
        <div>
          <div className={styles.eventInfo}>
            <span>{locales.map['map'][`${event.mapID}`] || event.mapName}</span>
            <img
              src={'/images/etc/info.webp'}
              alt={'info'}
              onClick={(e) => {
                e.preventDefault();
              }}
              onMouseEnter={handleMouseOver}
              onMouseLeave={handleMouseOut}
            />
          </div>
          {['curr', 'next'].includes(type) && (
            <div>
              <span>
                {type === 'curr'
                  ? locales.map['event'].endsIn
                  : locales.map['event'].startsIn}
              </span>
              <span>
                {diffTime.day}
                {locales.user['battle'].d}
              </span>
              <span>
                {diffTime.hour}
                {locales.user['battle'].h}
              </span>
              <span>
                {diffTime.minute}
                {locales.user['battle'].m}
              </span>
            </div>
          )}
        </div>
      </a>
      {mouseOver && (
        <div
          className={styles.mapToolTip}
          style={{ left: tooltipPosition.x + 40, top: tooltipPosition.y + 20 }}
        >
          <img
            src={`${config.assets}/maps/w220/${event.mapID}.webp`}
            alt={event.mapID}
          />
        </div>
      )}
    </React.Fragment>
  );
};
