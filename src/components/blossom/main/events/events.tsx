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
                key={event.MAP_ID}
                className={styles.mapItem}
                onClick={() => {
                  navigate(`./maps/${event.MAP_ID}`);
                }}
              >
                <img
                  src={`${config.assets}/modes/icon/${event.MAP_MD}.webp`}
                  alt={event.MAP_MD}
                />
                <div>
                  <div style={{ fontFamily: '"Main Bold", serif' }}>{event.MAP_NM}</div>
                  <div>
                    <span>종료</span>
                    <span style={{ fontWeight: 600 }}>
                      {moment(event.ROTATION_END_DT).format('YYYY-MM-DD HH')}
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
