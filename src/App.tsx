import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from '~/components/layout/header';
import { Footer } from '~/components/layout/footer';
import { CdnContext, EMPTY_CDN_BUNDLE } from '~/context/cdn.context';
import type { CdnBundle } from '~/context/cdn.context';
import { CdnService } from '~/services/cdn.service';
import { Spinner } from '~/components/spinner/spinner';

const MainWrapper = lazy(() => import('~/pages/main').then((module) => ({ default: module.MainWrapper })));
const UserWrapper = lazy(() => import('~/pages/user').then((module) => ({ default: module.UserWrapper })));
const Brawlers = lazy(() => import('~/pages/brawlers').then((module) => ({ default: module.Brawlers })));
const Events = lazy(() => import('~/pages/events/events').then((module) => ({ default: module.Events })));
const MapSummary = lazy(() => import('~/pages/maps/summary/summary').then((module) => ({ default: module.MapSummary })));
const MapDetail = lazy(() => import('~/pages/maps/detail/detail').then((module) => ({ default: module.MapDetail })));
const CrewMembers = lazy(() => import('~/pages/crew').then((module) => ({ default: module.CrewMembers })));
const NewsWrapper = lazy(() => import('~/pages/news').then((module) => ({ default: module.NewsWrapper })));
const NewsListItem = lazy(() => import('~/pages/news/detail').then((module) => ({ default: module.NewsListItem })));

const fetchCdnBundle = async (language: string): Promise<CdnBundle> => {
  const cacheBuster = Date.now();
  const [application, battle, brawler, main, map, news, user] = await Promise.all([
    CdnService.getApplicationCdn(language, cacheBuster),
    CdnService.getBattleCdn(language, cacheBuster),
    CdnService.getBrawlerCdn(language, cacheBuster),
    CdnService.getMainCdn(language, cacheBuster),
    CdnService.getMapCdn(language, cacheBuster),
    CdnService.getNewsCdn(language, cacheBuster),
    CdnService.getUserCdn(language, cacheBuster)
  ]);

  return { application, battle, brawler, main, map, news, user };
};

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [language, setLanguage] = useState('ko');
  const [cdnBundle, setCdnBundle] = useState<CdnBundle>(EMPTY_CDN_BUNDLE);

  useEffect(() => {
    let isSubscribed = true;

    fetchCdnBundle(language)
      .then((nextBundle) => {
        if (!isSubscribed) {
          return;
        }

        setCdnBundle(nextBundle);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error('Error fetching CDN data:', error);
      });

    return () => {
      isSubscribed = false;
    };
  }, [language]);

  const contextValue = useMemo(
    () => ({
      ...cdnBundle,
      language,
      setLanguage
    }),
    [cdnBundle, language]
  );

  return isLoaded ? (
    <CdnContext.Provider value={contextValue}>
      <Header />
      <Suspense fallback={<Spinner />}>
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
      </Suspense>
      <Footer />
    </CdnContext.Provider>
  ) : (
    <Spinner />
  );
};

export default App;
