import React from 'react';
import axios from 'axios';

class ContributionListItem extends React.Component{
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
      <div className="contribution-list-item">
        <div className="text">
          <p>User text goes here {this.state.text}</p>
        </div>
        <div className="name">
          <p>--User Name {this.state.contributorId}</p>
        </div>
      </div>
    );
  }
}

export default ContributionListItem;
