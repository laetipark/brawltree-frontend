import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from '~/components/header';
import { Footer } from '~/components/footer';

import { Main } from '~/pages/main';
import { Users } from '~/pages/user';
import { Brawlers } from '~/pages/brawlers';
import { Events } from '~/pages/events/events';
import { MapSummary } from '~/pages/maps/summary/summary';
import { MapDetail } from '~/pages/maps/detail/detail';
import { CrewMembers } from '~/pages/crew';

import { CdnContext } from '~/context/cdn.context';
import { CdnService } from '~/services/cdn.service';
import { Spinner } from '~/components/spinner/spinner';

// TODO : 언어 변경 또는 frontend 재시작하는 경우 캐시 삭제
const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [language, setLanguage] = useState('ko');

  const [applicationCdn, setApplicationCdn] = useState();
  const [battleCdn, setBattleCdn] = useState();
  const [brawlerCdn, setBrawlerCdn] = useState();
  const [mainCdn, setMainCdn] = useState();
  const [mapCdn, setMapCdn] = useState();
  const [userCdn, setUserCdn] = useState();

  useEffect(() => {
    Promise.all([
      CdnService.getApplicationCdn(language),
      CdnService.getBattleCdn(language),
      CdnService.getBrawlerCdn(language),
      CdnService.getMainCdn(language),
      CdnService.getMapCdn(language),
      CdnService.getUserCdn(language),
    ])
      .then(
        ([
          applicationData,
          battleData,
          brawlerData,
          mainData,
          mapData,
          userData,
        ]) => {
          setApplicationCdn(applicationData);
          setBattleCdn(battleData);
          setBrawlerCdn(brawlerData);
          setMainCdn(mainData);
          setMapCdn(mapData);
          setUserCdn(userData);
          setIsLoaded(true);
        },
      )
      .catch((error) => {
        console.error('Error fetching CDN data:', error);
      });
  }, [isLoaded, language]);
  console.log({
    application: applicationCdn,
    battle: battleCdn,
    brawler: brawlerCdn,
    main: mainCdn,
    map: mapCdn,
    user: userCdn,
  });

  return isLoaded ? (
    <CdnContext.Provider
      value={{
        application: applicationCdn,
        battle: battleCdn,
        brawler: brawlerCdn,
        main: mainCdn,
        map: mapCdn,
        user: userCdn,
        setLanguage,
      }}
    >
      <React.Fragment>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/brawlian/:id" element={<Users />} />
          <Route path="/brawler/:name" element={<Brawlers />} />
          <Route path="/events/:mode" element={<Events />} />
          <Route path="/maps" element={<MapSummary />} />
          <Route path="/maps/:id" element={<MapDetail />} />
          <Route path="/crew" element={<CrewMembers />} />
        </Routes>
        <Footer />
      </React.Fragment>
    </CdnContext.Provider>
  ) : (
    <Spinner />
  );
};

export default App;
