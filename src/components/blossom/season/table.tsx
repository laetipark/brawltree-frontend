import React from 'react';

import TableBody from '~/components/table/members/body';
import TableHead from '~/components/table/members/head';
import Pagination from '~/components/pagination/pagination';

import styles from './table.module.scss';

const SeasonTable = ({ members, page, getPage }) => {
  const offset = (page - 1) * 15;
  const total = Math.ceil(members.length / 15);

  const getPageNum = (num) => {
    getPage(num);
  };

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.table}>
        <TableHead col={'닉네임'} colArray={['매치', '변화량', '친밀도']} />
        <div className={styles.body}>
          {members.slice(offset, offset + 15).map((member) => {
            const matchChange =
              member.MATCH_CHG > 0
                ? `+${member.MATCH_CHG}개`
                : `${member.MATCH_CHG}개`;

            return (
              <TableBody
                key={member.USER_ID}
                col={member.USER_NM}
                colArray={[
                  `${member.MATCH_CNT || 0}회`,
                  matchChange,
                  `${member.FRIEND_PT || 0}점`,
                ]}
                colImage={[null, null, null]}
                id={member.USER_ID}
              />
            );
          })}
        </div>
      </div>
      <Pagination page={page} total={total} getPageNum={getPageNum} />
    </div>
  );
};

export default SeasonTable;
