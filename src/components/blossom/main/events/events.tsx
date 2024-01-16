import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { RotationType } from '~/common/type/maps.type';

import config from '~/config/config';

import styles from './events.module.scss';

const EventsSummary = ({ events }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.eventsSummaryWrapper}>
      <Link to={'/events'}>
        <span>진행 중인 이벤트</span>
      </Link>
      <div className={styles.eventItem}>
        {(events.length || 0) > 0 &&
          events.map((event: RotationType) => {
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
                  <div
                    style={{ fontFamily: '"Main Bold", serif' }}>{event.mapID ? t(`map.map.${event.mapID}`) : event.mapName}</div>
                  <div>
                    <span>종료까지</span>
                    <span>
                      <span style={{ fontWeight: 600 }}>
                        {moment(event.endTime).format('YYYY-MM-DD HH')}
                      </span>시
                    </span>
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
