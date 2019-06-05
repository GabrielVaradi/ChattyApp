import React, {Component} from 'react';

//Displays the nav-bar
function NavBar({usersOnline}) {
    return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <div> {`${usersOnline} user(s) online`}</div>
    </nav>
    );
};
export default NavBar;












