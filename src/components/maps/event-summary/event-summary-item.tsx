import React, { useContext, useState } from 'react';
import moment from 'moment/moment';

import { useInterval } from '~/hooks/use-interval.hook';
import { RotationType } from '~/common/types/maps.type';

import { CdnContext } from '~/context/cdn.context';

import config from '~/common/config/config';
import styles from '~/assets/styles/components/maps/event-summary/event-summary0item.module.scss';

export const EventItemContent = ({
  event,
  type
}: {
  event: RotationType;
  type: string;
}) => {
  const locales = useContext(CdnContext);
  const imgSrc = `${config.assets}/maps/w220/${event.mapID}.webp`;
  const hasCountdown =
    (type === 'curr' && event.endTime) || (type === 'next' && event.startTime);
  const time = hasCountdown
    ? moment(type === 'curr' ? event.endTime : event.startTime)
    : null;
  if (type !== 'curr' && time) {
    time.set('date', new Date().getDate());
    if (moment.duration(time.diff(moment())).asSeconds() < 0) {
      time.set('date', new Date().getDate() + 1);
    }
  }
  const isRanked = type === 'ranked';

  const diffTime = {
    day:
      type === 'curr' && time
        ? moment.duration(time.diff(moment())).days()
        : time && moment.duration(time.diff(moment())).days() > 0
          ? moment.duration(time.diff(moment())).days()
          : 0,
    hour: time
      ? type === 'curr'
        ? moment.duration(time.diff(moment())).hours()
        : Math.abs(moment.duration(time.diff(moment())).hours())
      : 0,
    minute: time
      ? type === 'curr'
        ? moment.duration(time.diff(moment())).minutes()
        : Math.abs(moment.duration(time.diff(moment())).minutes())
      : 0
  };
  const [mouseOver, setMouseOver] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseOver = ({ clientY, target }) => {
    const rect = target.parentElement.parentElement.parentElement.getBoundingClientRect();

    const x = parseInt(rect.left);
    const y = clientY + window.scrollY;

    setTooltipPosition({ x, y });
    setMouseOver(true);
  };

  const handleMouseOut = () => {
    setMouseOver(false);
  };

  useInterval(() => {
    if (!time) {
      return;
    }

    diffTime.day = type === 'curr' ? moment.duration(time.diff(moment())).days() : 0;
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
      <a key={event.mapID} className={styles.mapItemBox} href={`../maps/${event.mapName}${isRanked ? '?type=ranked' : ''}`}>
        <img src={`${config.assets}/modes/icon/${event.mode}.webp`} alt={event.mode} />
        <div>
          <div className={styles.eventInfoBox}>
            <h4>{locales.map['map'][`${event.mapID}`] || event.mapName}</h4>
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
          {['curr', 'next'].includes(type) ? (
            <div>
              {type === 'curr' ? locales.map['event'].endsIn : locales.map['event'].startsIn} {diffTime.day}
              {locales.user['battle'].d} {diffTime.hour}
              {locales.user['battle'].h} {diffTime.minute}
              {locales.user['battle'].m}
            </div>
          ) : (
            <div>&nbsp;</div>
          )}
        </div>
      </a>
      {mouseOver && (
        <div className={styles.mapToolTip} style={{ left: tooltipPosition.x + 40, top: tooltipPosition.y + 20 }}>
          <img src={imgSrc} alt={event.mapID} />
        </div>
      )}
    </React.Fragment>
  );
};
