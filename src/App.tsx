import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Header } from '~/components/layout/header';
import { Footer } from '~/components/layout/footer';
import { CdnContext, EMPTY_CDN_BUNDLE } from '~/context/cdn.context';
import type { CdnBundle } from '~/context/cdn.context';
import { CdnService } from '~/services/cdn.service';
import { Spinner } from '~/components/spinner/spinner';
import { syncCdnBundleToI18n } from '~/common/i18n/cdn-resource-sync';
import { SupportedLanguage } from '~/common/i18n/language';
import { getInitialLanguage, persistLanguage } from '~/common/i18n/language-storage';
import { i18n } from '~/common/i18n/i18n';

const MainWrapper = lazy(() => import('~/pages/main').then((module) => ({ default: module.MainWrapper })));
const UserWrapper = lazy(() => import('~/pages/user').then((module) => ({ default: module.UserWrapper })));
const Brawlers = lazy(() => import('~/pages/brawlers/brawlers-page').then((module) => ({ default: module.Brawlers })));
const Events = lazy(() => import('~/pages/events/events').then((module) => ({ default: module.Events })));
const MapSummary = lazy(() => import('~/pages/maps/summary/summary').then((module) => ({ default: module.MapSummary })));
const MapDetail = lazy(() => import('~/pages/maps/detail/detail').then((module) => ({ default: module.MapDetail })));
const CrewMembers = lazy(() => import('~/pages/crew/crew-members-page').then((module) => ({ default: module.CrewMembers })));
const NewsWrapper = lazy(() => import('~/pages/news').then((module) => ({ default: module.NewsWrapper })));
const NewsListItem = lazy(() => import('~/pages/news/detail/news-detail-page').then((module) => ({ default: module.NewsListItem })));

const fetchCdnBundle = async (language: SupportedLanguage): Promise<CdnBundle> => {
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
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [language, setLanguage] = useState<SupportedLanguage>(getInitialLanguage);
  const [cdnBundle, setCdnBundle] = useState<CdnBundle>(EMPTY_CDN_BUNDLE);

  useEffect(() => {
    let isSubscribed = true;
    setIsLoaded(false);

    fetchCdnBundle(language)
      .then((nextBundle) => {
        if (!isSubscribed) {
          return;
        }

        setCdnBundle(nextBundle);
        syncCdnBundleToI18n(language, nextBundle).finally(() => {
          setIsLoaded(true);
        });
      })
      .catch((error) => {
        console.error('Error fetching CDN data:', error);
      });

    return () => {
      isSubscribed = false;
    };
  }, [language]);

  useEffect(() => {
    persistLanguage(language);

    if (i18n.language !== language) {
      void i18n.changeLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const nextUrl = new URL(window.location.href);

    if (language === 'ko') {
      nextUrl.searchParams.delete('lang');
    } else {
      nextUrl.searchParams.set('lang', language);
    }

    const nextPath = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (nextPath !== currentPath) {
      window.history.replaceState({}, '', nextPath);
    }
  }, [language, location.pathname]);

  const contextValue = useMemo(
    () => ({
      ...cdnBundle,
      language,
      setLanguage
    }),
    [cdnBundle, language]
  );
  const loadingFallback = (
    <div style={{ display: 'flex', flex: '1 1 auto', width: '100%', minHeight: 0 }}>
      <Spinner fill={true} />
    </div>
  );

  return (
    <CdnContext.Provider value={contextValue}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto', minHeight: '100%', width: '100%' }}>
        <Header isCdnLoading={!isLoaded} />
        <main style={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto', width: '100%', minHeight: 0 }}>
          {isLoaded ? (
            <Suspense fallback={loadingFallback}>
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
          ) : (
            loadingFallback
          )}
        </main>
        <Footer />
      </div>
    </CdnContext.Provider>
  );
};

export default App;
