import React from 'react';
import { Link } from 'react-router-dom';

import styles from './battles.module.scss';

const BattleSummary = ({ battles }) => {
  return (
    <React.Fragment>
      <Link to={'/battle'}>
        <span>일일기록</span>
      </Link>
      <div className={styles.battlesSummaryInfo}>
        <span>• 오늘 매치 수 </span>
        <span style={{ fontWeight: 600 }}>
          {battles.matchCount?.toString().replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ',',
          )}
        </span>
        <span>회</span>
      </div>
    </React.Fragment>
  );
};

export default BattleSummary;
