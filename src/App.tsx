import React from 'react';
import {Routes, Route} from "react-router-dom";

import Header from "~/components/header/header";
import Footer from "~/components/footer/footer";

import Main from "~/pages/main/main";
import User from "~/pages/user/user";

const App = () => {
    return (
        <React.Fragment>
            <Header/>
            <Routes>
                <Route path="/"
                       element={<Main/>}/>
                <Route path="/brawlian/:id"
                       element={<User/>}/>
            </Routes>
            <Footer/>
        </React.Fragment>
    );
};

export default App;