import React from 'react';
import LoginControl from './LoginControl';
import NavControl from './NavControl';

const Nav = () => (
  <nav className="navbar navbar-toggleable-sm navbar-light bg-faded">
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <a className="navbar-brand" href="#">PepClock</a>
    <NavControl />
  </nav>


  // <nav className="navbar navbar-default" role="navigation">
  //   <div className="container-fluid">
  //     {/*Grouping Brand and toggle together for mobile*/}
  //     <div className="navbar-header">
  //       <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#hamburger-menu" aria-expanded="false">
  //         <span className="sr-only">Toggle Navigation</span>
  //         <span className="icon-bar"></span>
  //         <span className="icon-bar"></span>
  //         <span className="icon-bar"></span>
  //       </button>
  //       <a className="navbar-brand" href="/">PepClock</a>
  //     </div>
  //
  //     {/*Collect all nav content for toggling*/}
  //     <div className="collapse navbar-collapse" id="hamburger-menu">
  //       <NavControl />
  //       <LoginControl />
  //     </div>
  //   </div>
  // </nav>
);

export default Nav;
