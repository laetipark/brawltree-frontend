import React, { useEffect, useState } from 'react';

import UserMenuType from '~/components/menu/type-n-mode/menu-type/menu-type';
import UserMenuMode from '~/components/menu/type-n-mode/menu-mode/menu-mode';
import Pagination from '~/components/pagination/pagination';
import SearchMembers from '~/components/search/search-members';
import TableHead from '~/components/table/members/head';
import TableBody from '~/components/table/members/body';

import UserService from '~/services/user.service';

import styles from './season-table.module.scss';

const BattleTable = () => {
  const [type, setType] = useState('7');
  const [mode, setMode] = useState('all');
  const [rotationTL, setRotationTL] = useState([]);
  const [rotationPL, setRotationPL] = useState([]);

  const [members, setMembers] = useState([]);
  const [filterMembers, setFilterMembers] = useState([]);

  const [page, setPage] = useState(1);
  const offset = (page - 1) * 15;
  const total = Math.ceil(filterMembers.length / 15);

  const setMatchType = ({ target }) => {
    setType(target.value);
    setMode('all');
  };

  const setMatchMode = ({ target }) => {
    setMode(target.value);
  };

  useEffect(() => {
    UserService.getBlossomSeason({
      type,
      mode,
    }).then((data) => {
      setRotationTL(data.rotationTL);
      setRotationPL(data.rotationPL);
      setMembers(data.members);
      setPage(1);
    });
  }, [type, mode]);

  return (
    <div className={styles.app}>
      <div className={styles.battlesMenus}>
        <UserMenuType type={type} setMatchType={setMatchType} />
        <UserMenuMode
          mode={mode}
          setMatchMode={setMatchMode}
          type={type}
          rotationTL={rotationTL}
          rotationPL={rotationPL}
        />
      </div>
      <div className={styles.filter}>
        <Pagination page={page} total={total} setPage={setPage} />
        <SearchMembers members={members} setFilterMembers={setFilterMembers} />
      </div>
      <div className={styles.table}>
        <TableHead col={'닉네임'} colArray={['매치', '변화량']} />
        <div className={styles.body}>
          {filterMembers.slice(offset, offset + 15)?.map((member) => {
            const trophyChange =
              member.trophyChange > 0
                ? `+${member.trophyChange}개`
                : `${member.trophyChange}개`;

            return (
              <TableBody
                key={member.userID}
                col={member.name}
                colArray={[`${member.matchCount || 0}회`, trophyChange]}
                colImage={[null, null]}
                id={member.userID}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BattleTable;
