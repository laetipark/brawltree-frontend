import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from '~/components/layout/header';
import { Footer } from '~/components/layout/footer';

import { MainWrapper } from '~/pages/main';
import { UserWrapper } from '~/pages/user';
import { Brawlers } from '~/pages/brawlers';
import { Events } from '~/pages/events/events';
import { MapSummary } from '~/pages/maps/summary/summary';
import { MapDetail } from '~/pages/maps/detail/detail';
import { CrewMembers } from '~/pages/crew';
import { NewsWrapper } from '~/pages/news';
import { NewsListItem } from '~/pages/news/detail';

import { CdnContext } from '~/context/cdn.context';
import { CdnService } from '~/services/cdn.service';
import { Spinner } from '~/components/spinner/spinner';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [language, setLanguage] = useState('ko');

  const [applicationCdn, setApplicationCdn] = useState({});
  const [battleCdn, setBattleCdn] = useState({});
  const [brawlerCdn, setBrawlerCdn] = useState({});
  const [mainCdn, setMainCdn] = useState({});
  const [mapCdn, setMapCdn] = useState({});
  const [newsCdn, setNewsCdn] = useState({});
  const [userCdn, setUserCdn] = useState({});

  useEffect(() => {
    const time = new Date().getTime();

    Promise.all([
      CdnService.getApplicationCdn(language, time),
      CdnService.getBattleCdn(language, time),
      CdnService.getBrawlerCdn(language, time),
      CdnService.getMainCdn(language, time),
      CdnService.getMapCdn(language, time),
      CdnService.getNewsCdn(language, time),
      CdnService.getUserCdn(language, time)
    ])
      .then(([applicationData, battleData, brawlerData, mainData, mapData, newsData, userData]) => {
        setApplicationCdn(applicationData);
        setBattleCdn(battleData);
        setBrawlerCdn(brawlerData);
        setMainCdn(mainData);
        setMapCdn(mapData);
        setNewsCdn(newsData);
        setUserCdn(userData);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error('Error fetching CDN data:', error);
      });
  }, [isLoaded, language]);

  return isLoaded ? (
    <CdnContext.Provider
      value={{
        application: applicationCdn,
        battle: battleCdn,
        brawler: brawlerCdn,
        main: mainCdn,
        map: mapCdn,
        news: newsCdn,
        user: userCdn,
        language,
        setLanguage
      }}
    >
      <React.Fragment>
        <Header />
        <Routes>
          <Route path="/" element={<MainWrapper />} />
          <Route path="/brawlian/:id" element={<UserWrapper />} />
          <Route path="/brawler/:name" element={<Brawlers />} />
          <Route path="/events/:mode" element={<Events />} />
          <Route path="/maps" element={<MapSummary />} />
          <Route path="/maps/:name" element={<MapDetail />} />
          <Route path="/crew" element={<CrewMembers />} />
          <Route path="/news" element={<NewsWrapper />} />
          <Route path="/news/:title" element={<NewsListItem />} />
        </Routes>
        <Footer />
      </React.Fragment>
    </CdnContext.Provider>
  ) : (
    <Spinner />
  );
};

export default App;
