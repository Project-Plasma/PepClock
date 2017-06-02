import React from 'react';
import { Link } from 'react-router-dom';
import ContributionList from './ContributionList';
import axios from 'axios';


class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.match.params.id,
      title: '',
      contributionList: [],
      contributionText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateContributions = this.updateContributions.bind(this);
  }

  handleChange(event) {
    this.setState({contributionText: event.target.value});
  }

  handleSubmit(event) {
    var that = this;
    event.preventDefault();
    axios({
      method: 'post',
      url: '/api/contributions',
      data: {
        eventId: this.state.eventId,
        contributionText: this.state.contributionText,
      }
    })
    .then(function(res) {
      that.setState({contributionText: ''});
      that.updateContributions();
    })
    .catch(function(err) {
      console.log('Error in Event.jsx', err);
    });
  }

  componentDidMount () {
    axios.get(`/api/events/${this.state.eventId}`)
    .then(result => {
      this.setState({
        title: result.data.title,
        contributionList: result.data.contributions
      });
    })
    .catch(error => {
      console.log('Error in Event data query', error);
    });
  }

  updateContributions() {

    axios.get(`/api/contributions/events/${this.state.eventId}`)
      .then(result => {
        this.setState({contributionList: result.data});
      })
      .catch(error => {
        console.log('Error in updateContributions query', error);
      });
  }

  render() {
    const { id } = this.props.match.params;
    const { title, description } = this.state;

    return (
      <div className="event">
        <div className="title">
          <h1>{title}</h1>
        </div>
          <Link to={`/edit/${id}`}>Edit event</Link>
        <hr />
        <ContributionList contributionList={this.state.contributionList}/>
        <hr />
        <form className="add" onSubmit={this.handleSubmit}>
          <input
            type="textarea"
            placeholder="Enter Contribution Text"
            autoFocus="true"
            onChange={this.handleChange}
            value={this.state.contributionText}
          />
          <button id="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Event;
