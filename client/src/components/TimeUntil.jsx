import React from 'react';

class TimeUntil extends React.Component{
  constructor(props){
    super(props);
  };

  render() {
    return(
      <div>
        <h3>{happen} {timeToLaunch}</h3>
        <h5>on {launchDisplay}</h5>
      </div>
    );
  };
}

export default TimeUntil;
