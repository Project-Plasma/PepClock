import React from 'react';


const imgStyle = {
  background: 'url(/assets/hero.jpg) no-repeat center',
  height: '40em',
  maxWidth: '100%'
};

const textStyle = {
  color: 'white',
  padding: '20em'
};

const Splash = () => {
  return (
    <div className="col" style={imgStyle}>
      <span className="text-center" style={textStyle}>
      <h1>Welcome to PepClock</h1>
      <p>Collect and share words, photos, and videos of encouragement to deliver to someone later</p>
      </span>
    </div>
  );
};

export default Splash;
