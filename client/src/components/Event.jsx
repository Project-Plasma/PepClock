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
      contributionText: '',
      hasPermissionToView: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateContributions = this.updateContributions.bind(this);
  }

  componentWillMount () {
    this.checkIfContributor();
  }

  handleChange(event) {
    this.setState({contributionText: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: 'post',
      url: '/api/contributions',
      data: {
        eventId: this.state.eventId,
        contributionText: this.state.contributionText,
      }
    })
    .then(res => {
      this.setState({contributionText: ''});
      this.updateContributions();
    })
    .catch(err => {
      console.log('Error in Event.jsx', err);
    });
  }

  checkIfContributor () {
    axios.get('/api/events/user')
      .then(({ data: events }) => {
        const userEventIds = events.map(event => event.event_id);
        this.setState({
          hasPermissionToView: userEventIds.includes(Number(this.state.eventId))
        });
        this.getEventContent();
      })
      .catch(error => {});
  }

  updateContributions() {
    axios.get(`/api/contributions/events/${this.state.eventId}`)
      .then(({ data: contributionList}) => {
        this.setState({contributionList});
      })
      .catch(error => {
        console.log('Error in updateContributions query', error);
      });
  }

  getEventContent () {
    axios.get(`/api/events/${this.state.eventId}`)
    .then(({ data: { title } }) => {
      this.setState({ title });
      this.updateContributions();
    })
    .catch(error => {
      console.log('Error in Event data query', error);
    });
  }

  render() {
    // This condition prevents the "non-permitted" state
    // from rendering for a flash before rending content.
    if (this.state.hasPermissionToView === null) {
      return <div></div>;
    }

    if (this.state.hasPermissionToView) {
      const { id } = this.props.match.params;
      const { title, description } = this.state;

      return (
        <div className="event">
          <h1>{title}</h1>
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

    return (
      <div className="event">
        <h3>Sorry, this doesn't seem to be one of your events</h3>
        <p>Perhaps you'd like to <Link to="/dashboard">view your events</Link></p>
      </div>
    );
  }
}

export default Event;
