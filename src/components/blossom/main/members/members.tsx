import React from 'react';
import { Link } from 'react-router-dom';

import styles from './members.module.scss';

const MemberSummary = ({ members }) => {
  return (
    <div className={styles.membersSummaryWrapper}>
      <Link to={'./members'}>
        <span>멤버</span>
      </Link>
      <div className={styles.membersSummaryInfo}>
        <div>
          <span>• 총 멤버</span>
          <span style={{ fontWeight: 600 }}>{members.memberCount}</span>
          <span>명</span>
        </div>
        <div>
          <span>• 총 트로피</span>
          <span style={{ fontWeight: 600 }}>
            {members.currentTotalTrophies?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </span>
          <span>개</span>
        </div>
      </div>
    </div>
  );
};

export default MemberSummary;
