import React from 'react';
import LandingNavbar from './LandingNavbar';
import LoggedNavbar from './LoggedNavbar';

const Navbar = ({ user, setUser }) => {
    return user ? <LoggedNavbar user={user} setUser={setUser} /> : <LandingNavbar />;
};

export default Navbar;