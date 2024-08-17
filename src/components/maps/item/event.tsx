import React, { useContext } from 'react';
import moment from 'moment';

import { useInterval } from '~/hooks/use-interval.hook';

import config from '~/config/config';

import styles from './event.module.scss';
import { CdnContext } from '~/context/cdn.context';

export const EventItem = ({ event, type }) => {
  const nextTime = moment(type === 'end' ? event.endTime : event.startTime);
  const locales = useContext(CdnContext);

  if (type !== 'end') {
    nextTime.set('date', new Date().getDate());
    if (moment.duration(nextTime.diff(moment())).asSeconds() < 0) {
      nextTime.set('date', new Date().getDate() + 1);
    }
  }

  const diffTime = {
    day:
      type === 'end'
        ? moment.duration(nextTime.diff(moment())).days()
        : moment.duration(nextTime.diff(moment())).days() > 0
          ? moment.duration(nextTime.diff(moment())).days()
          : 0,
    hour:
      type === 'end'
        ? moment.duration(nextTime.diff(moment())).hours()
        : Math.abs(moment.duration(nextTime.diff(moment())).hours()),
    minute:
      type === 'end'
        ? moment.duration(nextTime.diff(moment())).minutes()
        : Math.abs(moment.duration(nextTime.diff(moment())).minutes()),
  };

  useInterval(() => {
    diffTime.day =
      type === 'end' ? moment.duration(nextTime.diff(moment())).days() : 0;
    diffTime.hour =
      type === 'end'
        ? moment.duration(nextTime.diff(moment())).hours()
        : Math.abs(moment.duration(nextTime.diff(moment())).hours());
    diffTime.minute =
      type === 'end'
        ? moment.duration(nextTime.diff(moment())).minutes()
        : Math.abs(moment.duration(nextTime.diff(moment())).minutes());
  }, 1000);

  return (
    <a
      key={event.startTime?.toString()}
      className={styles.eventWrapper}
      href={`/maps/${event.mapID}`}
    >
      <div>
        <div className={styles.eventTitle}>
          <img
            src={`${config.assets}/modes/icon/${event.mode}.webp`}
            alt={event.mode}
          />
          <div>
            <div>
              <span className={styles.content}>
                {locales.map['map'][`${event.mapID}`] || event.name}
              </span>
            </div>
            {type && (
              <div>
                <span className={styles.content}>
                  {`${
                    type === 'end'
                      ? locales.map['event']['endsIn']
                      : locales.map['event']['startsIn']
                  } ${diffTime.day}${locales.user['battle'].d} ${diffTime.hour}${
                    locales.user['battle'].h
                  } ${diffTime.minute}${locales.user['battle'].m}`}
                </span>
              </div>
            )}
          </div>
        </div>
        <div>
          <img
            className={styles.eventBanner}
            src={`${config.assets}/modes/banner/${event.mode}.webp`}
            alt={event.mode}
          />
        </div>
      </div>
    </a>
  );
};
