import React from 'react';
import { Link } from 'react-router-dom';

import styles from './season.module.scss';

const SeasonSummary = ({ season }) => {
  return (
    <React.Fragment>
      <Link to={'/season'}>
        <span>시즌기록</span>
      </Link>
      <div>
        <div className={styles.seasonSummaryInfo}>
          <span>• 시즌 매치 수</span>
          <span style={{ fontWeight: 600 }}>
            {season.matchCount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </span>
          <span>회</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SeasonSummary;
