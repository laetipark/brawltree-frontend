import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from '~/components/header/header';
import Footer from '~/components/footer/footer';

import Main from '~/pages/main/main';
import User from '~/pages/user/user';
import Brawlers from '~/pages/brawler/brawlers';
import Events from '~/pages/events/events';
import MapDetail from '~/pages/maps/detail/detail';
import BlossomMain from '~/pages/blossom/main/main';
import BlossomMembers from '~/pages/blossom/members/members_table';
import BlossomBrawlers from '~/pages/blossom/brawlers/brawlers_table';
import BlossomBattles from '~/pages/blossom/battles/battles_table';
import BlossomSeason from '~/pages/blossom/season/season_table';

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
        <Route path="/brawlian/:id" element={<User />} />
        <Route path="/brawler" element={<Brawlers />} />
        <Route path="/events" element={<Events />} />
        <Route path="/maps/:id" element={<MapDetail />} />

        <Route path="/blossom" element={<BlossomMain />} />
        <Route path="/blossom/members" element={<BlossomMembers />} />
        <Route path="/blossom/members/:id" element={<User />} />
        <Route path="/blossom/brawlers" element={<BlossomBrawlers />} />
        <Route path="/blossom/battles" element={<BlossomBattles />} />
        <Route path="/blossom/season" element={<BlossomSeason />} />
        <Route path="/blossom/events" element={<Events />} />
        <Route path="/blossom/maps/:id" element={<MapDetail />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
};

export default App;
