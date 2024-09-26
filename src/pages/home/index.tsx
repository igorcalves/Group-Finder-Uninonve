import React from 'react';

import Header from '../../components/header';
import Body from '../../components/body';
import './styles.css';
const Home: React.FC = () => {
    return (
        <div className="home-body">
            <Header />
            <Body />
        </div>
    );
};

export default Home;
