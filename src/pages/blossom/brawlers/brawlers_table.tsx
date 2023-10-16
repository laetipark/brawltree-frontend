  import React, { useEffect, useState } from 'react';

  import TableHead from '~/components/table/members/head';
  import TableBody from '~/components/table/members/body';
  import Pagination from '~/components/pagination/pagination';
  import SearchMembers from '~/components/search/search_members';

  import BrawlerStats from '~/components/brawlers/brawler_stats';
  import BrawlerSelection from '~/components/brawlers/brawler_selection';
  import BrawlerService from '~/services/brawler_service';

  import styles from './brawlers_table.module.scss';

  const BrawlersTable = () => {
    const [brawlers, setBrawlers] = useState([]);
    const [brawlerStats, setBrawlerStats] = useState([]);
    const [brawler, setBrawler] = useState({
      brawlerID: '16000000',
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
        setBrawlerStats(data.stats);
      });
      BrawlerService.getBlossomMember({
        brawlerID: brawler.brawlerID,
      }).then((data) => {
        setMembers(data);
      });
    }, []);

    useEffect(() => {
      BrawlerService.getBlossomMember({
        brawlerID: brawler.brawlerID,
      }).then((data) => {
        setMembers(data);
      });
    }, [brawler.brawlerID]);

    return (
      members && (
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
            <BrawlerStats brawler={brawler} brawlerStats={brawlerStats} />
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
      )
    );
  };

  export default BrawlersTable;
