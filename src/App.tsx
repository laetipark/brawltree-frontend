import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Header } from '~/components/header/header';
import { Footer } from '~/components/footer/footer';

import { Main } from '~/pages/main/main';
import { Users } from '~/pages/user/users';
import { Brawlers } from '~/pages/brawler/brawlers';
import { Events } from '~/pages/events/events';
import { MapSummary } from '~/pages/maps/summary/summary';
import { MapDetail } from '~/pages/maps/detail/detail';
import { BlossomMain } from '~/pages/blossom/main/main';
import { BlossomMembers } from '~/pages/blossom/members/members-table';
import { BlossomBrawlers } from '~/pages/blossom/brawlers/brawlers-table';
import { BlossomBattles } from '~/pages/blossom/battles/battles-table';

const App = () => {
  const location = useLocation();
  const [titleDir, setTitleDir] = useState('brawltree');

  useEffect(() => {
    if (!/\/blossom.*/g.test(location.pathname)) {
      setTitleDir('brawltree');
    } else {
      setTitleDir('blossom');
    }
  }, [location]);

  return (
    <React.Fragment>
      <Header dir={titleDir} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/brawlian/:id" element={<Users />} />
        <Route path="/brawler/:name" element={<Brawlers />} />
        <Route path="/events/:mode" element={<Events />} />
        <Route path="/maps" element={<MapSummary />} />
        <Route path="/maps/:id" element={<MapDetail />} />

        <Route path="/blossom" element={<BlossomMain />} />
        <Route path="/blossom/members" element={<BlossomMembers />} />
        <Route path="/blossom/members/:id" element={<Users />} />
        <Route path="/blossom/brawlers" element={<BlossomBrawlers />} />
        <Route path="/blossom/battles" element={<BlossomBattles />} />
        <Route path="/blossom/events/:mode" element={<Events />} />
        <Route path="/blossom/maps/:id" element={<MapDetail />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
};

export default App;
