import React, { useEffect, useState } from 'react';

import TableHead from '~/components/table/members/head';
import TableBody from '~/components/table/members/body';
import Pagination from '~/components/pagination/pagination';
import SearchMembers from '~/components/search/search-members';

import BrawlerTotalStats from '~/components/brawler/summary/total-stats';
import BrawlerSelection from '~/components/brawler/summary/selection';
import BrawlerService from '~/services/brawler.service';

import styles from './brawlers-table.module.scss';
import { BrawlerStatsType } from '~/common/type/brawlers.type';
import { Spinner } from '~/components/spinner/spinner';

const BrawlersTable = () => {
  const [brawlers, setBrawlers] = useState([]);
  const [brawlerStats, setBrawlerStats] = useState<BrawlerStatsType[]>([]);
  const [brawler, setBrawler] = useState({
    id: '16000000',
    name: 'SHELLY',
    rarity: 'Trophy Road',
    role: 'Damage Dealer',
    gender: 'Female',
  });

  const [members, setMembers] = useState([]);
  const [filterMembers, setFilterMembers] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 10;
  const total = Math.ceil(filterMembers.length / 10);

  useEffect(() => {
    BrawlerService.getBrawlers().then((data) => {
      setBrawlers(data.brawlers);
      setBrawlerStats(data.totalStats);
    });
    BrawlerService.getBlossomMember({
      brawlerID: brawler.id,
    }).then((data) => {
      setMembers(data);
    });
  }, []);

  useEffect(() => {
    BrawlerService.getBlossomMember({
      brawlerID: brawler.id,
    }).then((data) => {
      setMembers(data);
    });
  }, [brawler.id]);

  return (
    members.length > 0 ? (
      <div className={styles.app}>
        <BrawlerSelection brawlers={brawlers} setBrawler={setBrawler} />
        <div>
          <div className={styles.filter}>
            <Pagination page={page} total={total} setPage={setPage} />
            <SearchMembers
              members={members}
              setFilterMembers={setFilterMembers}
            />
          </div>
          <BrawlerTotalStats brawler={brawler} brawlerStats={brawlerStats} />
          <div className={styles.table}>
            <TableHead col={'닉네임'} colArray={['현재', '최고']} />
            <div className={styles.body}>
              {filterMembers.slice(offset, offset + 10).map((member) => {
                return (
                  <TableBody
                    key={`${member.userID}_${member.brawlerID}`}
                    col={member.name}
                    colArray={[
                      `${member.currentTrophies}개`,
                      `${member.highestTrophies}개`,
                    ]}
                    colImage={[null, null]}
                    id={member.userID}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    ) : <Spinner />
  );
};

export default BrawlersTable;
