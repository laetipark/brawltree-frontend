import React, { useEffect, useState } from 'react';

import config from '~/config/config';

import TableHead from '~/components/table/members/head';
import TableBody from '~/components/table/members/body';
import Pagination from '~/components/pagination/pagination';
import SearchMembers from '~/components/search/search-members';

import styles from './members-table.module.scss';
import UserService from '~/services/user.service';
import { Spinner } from '~/components/spinner/spinner';

const roman = ['Ⅰ', 'Ⅱ', 'Ⅲ'];

const MemberTable = () => {
  const [members, setMembers] = useState([]);
  const [filterMembers, setFilterMembers] = useState([]);

  const [page, setPage] = useState(1);
  const offset = (page - 1) * 15;
  const total = Math.ceil(filterMembers.length / 15);

  useEffect(() => {
    UserService.getBlossomMembers().then((data) => {
      setMembers(data);
      setPage(1);
    });
  }, []);

  return (
    members.length > 0 ? (<div className={styles.app}>
      <div className={styles.filter}>
        <Pagination page={page} total={total} setPage={setPage} />
        <SearchMembers members={members} setFilterMembers={setFilterMembers} />
      </div>
      <div className={styles.table}>
        <TableHead col={'닉네임'} colArray={['트로피', '솔로', '팀']} />
        <div className={styles.body}>
          {filterMembers.slice(offset, offset + 15).map((member) => {
            return (
              <TableBody
                key={member.userID}
                col={member.name}
                colArray={[
                  `${member.currentTrophies}개`,
                  roman[member.currentSoloPL % 3],
                  roman[member.currentTeamPL % 3],
                ]}
                colImage={[
                  null,
                  `${config.assets}/rank/power_league/${Math.floor(
                    member.currentSoloPL / 3,
                  )}.webp`,
                  `${config.assets}/rank/power_league/${Math.floor(
                    member.currentTeamPL / 3,
                  )}.webp`,
                ]}
                id={member.userID}
              />
            );
          })}
        </div>
      </div>
    </div>) : <Spinner />
  );
};

export default MemberTable;
