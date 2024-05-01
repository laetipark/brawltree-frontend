import React from 'react';
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

const App = () => {
  return (
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
  );
};

export default App;
