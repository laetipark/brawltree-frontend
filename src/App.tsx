import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '~/components/header/header';
import Footer from '~/components/footer/footer';

import Main from '~/pages/main/main';
import User from '~/pages/user/user';
import Events from '~/pages/events/events';
import MapDetail from '~/pages/maps/detail/map_detail';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/brawlian/:id" element={<User />} />
        <Route path="/events/" element={<Events />} />
        <Route path="/maps/:id" element={<MapDetail />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
};

export default App;
