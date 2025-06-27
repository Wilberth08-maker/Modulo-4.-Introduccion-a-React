import React from 'react';
import Landing from '@/components/Landing.jsx';
import LoggedHome from '@/components/LoggedHome';

const HomePage = ({ user }) => {
    return user ? <LoggedHome user={user} /> : <Landing />;
};

export default HomePage;