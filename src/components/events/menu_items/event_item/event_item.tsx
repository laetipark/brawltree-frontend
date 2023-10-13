import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

import useInterval from '~/hooks/use_interval';

import config from '~/config/config';

import styles from './event_item.module.scss';

const EventItem = ({ event, type }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const nextTime = moment(
    type === 'end' ? event.endDate : event.beginDate,
  );
  const diffTime = {
    day: type === 'end' ? moment.duration(nextTime.diff(moment())).days() : 0,
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
    <div
      key={event.beginDate?.toString()}
      className={styles.eventWrapper}
      onClick={() => {
        navigate(
          `${!/\/blossom.*/g.test(location.pathname) ? '' : '/blossom'}/maps/${
            event.mapID
          }`,
        );
      }}
    >
      <div>
        <div className={styles.eventTitle}>
          <img
            src={`${config.assets}/modes/icon/${event.mode}.webp`}
            alt={event.mode}
          />
          <div>
            <div>
              <span className={styles.content}>{event.name}</span>
            </div>
            {type && (
              <div>
                <span className={styles.content}>
                  {`${type === 'end' ? '종료까지' : '시작까지'} ${
                    diffTime.day
                  }일 ${diffTime.hour}시간 ${diffTime.minute}분`}
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
    </div>
  );
};

export default EventItem;
