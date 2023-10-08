import React, { useEffect, useState } from 'react';

import TableHead from '~/components/table/members/head';
import TableBody from '~/components/table/members/body';
import Pagination from '~/components/pagination/pagination';
import Search from '~/components/search/search';

import styles from './brawlers_table.module.scss';
import BrawlerStats from '~/components/brawlers/brawler_stats';
import BrawlerSelection from '~/components/brawlers/brawler_selection';
import BrawlerService from '~/services/brawler_service';

const BrawlersTable = () => {
  const [brawlers, setBrawlers] = useState([]);
  const [brawlerStats, setBrawlerStats] = useState([]);
  const [brawler, setBrawler] = useState({
    BRAWLER_ID: '16000000',
    BRAWLER_NM: '쉘리',
    BRAWLER_RRT: '기본',
    BRAWLER_CL: '대미지 딜러',
    BRAWLER_GNDR: '여성',
  });

  const [members, setMembers] = useState([]);
  const [filterMembers, setFilterMembers] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 10;
  const total = Math.ceil(filterMembers.length / 10);

  useEffect(() => {
    BrawlerService.getBrawlers().then((data) => {
      setBrawlers(data.brawlers);
      setBrawlerStats(data.stats);
    });
    BrawlerService.getBlossomMember({
      brawlerID: brawler.BRAWLER_ID,
    }).then((data) => {
      setMembers(data);
    });
  }, []);

  useEffect(() => {
    BrawlerService.getBlossomMember({
      brawlerID: brawler.BRAWLER_ID,
    }).then((data) => {
      setMembers(data);
    });
  }, [brawler.BRAWLER_ID]);

  return (
    <div className={styles.app}>
      <BrawlerSelection brawlers={brawlers} setBrawler={setBrawler} />
      <div>
        <div className={styles.filter}>
          <Pagination page={page} total={total} setPage={setPage} />
          <Search members={members} setFilterMembers={setFilterMembers} />
        </div>
        <BrawlerStats brawler={brawler} brawlerStats={brawlerStats} />
        <div className={styles.table}>
          <TableHead col={'닉네임'} colArray={['현재', '최고']} />
          <div className={styles.body}>
            {filterMembers.slice(offset, offset + 10).map((member) => {
              return (
                <TableBody
                  key={`${member.USER_ID}_${member.BRAWLER_ID}`}
                  col={member.USER_NM}
                  colArray={[
                    `${member.TROPHY_CUR}개`,
                    `${member.TROPHY_HGH}개`,
                  ]}
                  colImage={[null, null]}
                  id={member.USER_ID}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrawlersTable;
