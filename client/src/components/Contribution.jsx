import React from 'react';

class Contribution extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      contributorId: ''
    }
  };

  //TODO: Use later when backend is ready
  // componentDidMount () {
  //   const eventId = this.props.match.params.id;
  //   axios.get(`/api/events/${eventId}`)
  //   .then(data =>{
  //     this.setState({
  //       text: data.text,
  //       contributorId: data.contributorId
  //     });
  //   });
  // }

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
