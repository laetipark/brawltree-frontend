import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

import config from '~/config/config';

import styles from './events.module.scss';

const EventsSummary = ({ events }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.eventsSummaryWrapper}>
      <Link to={'/events'}>
        <span>이벤트</span>
      </Link>
      <div className={styles.eventItem}>
        {(events.length || 0) > 0 &&
          events.map((event) => {
            return (
              <div
                key={event.mapID}
                className={styles.mapItem}
                onClick={() => {
                  navigate(`./maps/${event.mapID}`);
                }}
              >
                <img
                  src={`${config.assets}/modes/icon/${event.mode}.webp`}
                  alt={event.mode}
                />
                <div>
                  <div style={{ fontFamily: '"Main Bold", serif' }}>{event.name}</div>
                  <div>
                    <span>종료</span>
                    <span style={{ fontWeight: 600 }}>
                      {moment(event.endDate).format('YYYY-MM-DD HH')}
                    </span>
                    <span>시</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default EventsSummary;
