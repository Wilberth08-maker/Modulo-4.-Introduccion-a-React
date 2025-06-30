import React from 'react';
import Landing from '@/components/Landing.jsx';
import Alojamientos from './Alojamientos.jsx';

const HomePage = ({ user }) => {
    return user ? <Alojamientos user={user} /> : <Landing />;
};

export default HomePage;