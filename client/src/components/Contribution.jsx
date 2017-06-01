import React from 'react';

class Contribution extends React.Component{
  constructor(props) {
    super(props)
  };

  render () {
    return (
      <div className="contribution">
        <div className="text">
          <p>User text goes here</p>
        </div>
        <div className="name">
          <p>--User Name</p>
        </div>
      </div>
    );
  }
}

export default Contribution;
