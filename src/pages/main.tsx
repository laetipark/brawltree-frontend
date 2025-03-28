import React, { useContext, useEffect, useState } from 'react';

import { SearchUserContainer } from '~/pages/main/search-user';
import { BrawlerSummaryContainer } from '~/pages/main/brawler-summary';
import { EventSummaryContainer } from '~/components/maps/event-summary';
import { NewsSummaryContainer } from '~/pages/main/news-summary';

import { SearchItemType } from '~/common/types/main.type';

import { EventService } from '~/services/event.service';
import { BrawlerService } from '~/services/brawler.service';
import { CdnContext } from '~/context/cdn.context';
import { SearchContext } from '~/context/search.context';

import defStyles from '~/common/styles/app.module.scss';
import styles from '~/assets/styles/pages/main.module.scss';

export const MainWrapper = () => {
  const locales = useContext(CdnContext);

  const [searchHistory, setSearchHistory] = useState(JSON.parse(localStorage.getItem('searchHistory') || '[]'));
  const [trophyEvents, setTrophyEvents] = useState([]);
  const [rankedEvents, setRankedEvents] = useState([]);
  const [brawlersTrophy, setBrawlersTrophy] = useState([]);
  const [brawlersRanked, setBrawlersRanked] = useState([]);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    EventService.getTLCurrentEvents().then((data) => setTrophyEvents(data));
    EventService.getPLEvents().then((data) => setRankedEvents(data));
  }, []);

  useEffect(() => {
    BrawlerService.getBrawlerSummary().then((data) => {
      setBrawlersTrophy(data.brawlersTrophy);
      setBrawlersRanked(data.brawlersRanked);
    });
  }, []);

  /** Function related to recent search */
  const handleAddSearchItem = (userID: string) => {
    const user = searchHistory.find((user: SearchItemType) => user.userID === userID);
    const searchItem = {
      id: Date.now(),
      userID: userID
    };

    if (!user) {
      setSearchHistory([searchItem, ...searchHistory].slice(0, 10));
    } else {
      setSearchHistory([searchItem, ...searchHistory.filter((user: SearchItemType) => user.userID !== userID)]);
    }
  };

  const handleFilterSearchItem = (userIDs: string[]) => {
    const nextKeyword = searchHistory.filter((item: SearchItemType) => {
      return userIDs.includes(item.userID);
    });
    if (searchHistory.length !== nextKeyword.length) {
      setSearchHistory(nextKeyword);
    }
  };

  const handleRemoveSearchItem = (userID: string) => {
    const nextKeyword = searchHistory.filter((user: SearchItemType) => {
      return user.userID != userID;
    });
    setSearchHistory(nextKeyword);
  };

  return (
    <div className={defStyles.app}>
      <div className={styles.mainHeadContainer}>
        <img src={'/images/main/main-1.webp'} alt={'메인'} />
        <h1>{locales.main['introduce'] || 'introduce'}</h1>
      </div>
      <SearchContext.Provider
        value={{
          searchHistory,
          setSearchHistory,
          onAddSearchHistory: handleAddSearchItem,
          onFilterSearchItem: handleFilterSearchItem,
          onRemoveSearchItem: handleRemoveSearchItem
        }}
      >
        <SearchUserContainer />
      </SearchContext.Provider>
      <NewsSummaryContainer />
      <EventSummaryContainer events={trophyEvents} type={'curr'} />
      <EventSummaryContainer events={rankedEvents} type={'ranked'} />
      <BrawlerSummaryContainer brawlersTrophy={brawlersTrophy} brawlersRanked={brawlersRanked} />
    </div>
  );
};
