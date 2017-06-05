import React from 'react';
import { Link } from 'react-router-dom';
import ContributionList from './ContributionList';
import axios from 'axios';
import moment from 'moment';
import TimeUntil from './TimeUntil';


class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.match.params.id,
      title: '',
      contributionList: [],
      contributionText: '',
      delivery_time: '',
      curSecond: '',
      curMinute: '',
      curHour: ''
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

  setDate() {
    const now = moment();
    const seconds = moment().second();
    const minutes = moment().minute();
    const hours = moment().hour();

    this.setState({
      curSecond: seconds,
      curMinute: minutes,
      curHour: hours
    });
  }

  componentDidMount () {
    axios.get(`/api/events/${this.state.eventId}`)
    .then(result => {
      this.setState({
        title: result.data.title,
        delivery_time: result.data.delivery_time
      });
      this.updateContributions();
    })
    .catch(error => {
      console.log('Error in Event data query', error);
    })
    .then(
      setInterval(this.setDate.bind(this), 1000)
    );
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
    const { title, description, delivery_time } = this.state;

    let LaunchTimeLen = moment(delivery_time).length;
    let launchTime = moment(this.state.delivery_time).format('YYYY MM DD hh mm ss');
    let launchTimeDisplay = moment(this.state.delivery_time).format('MMM Do YYYY || hh : mm');
    let timeOfDay = moment(this.state.delivery_time).format('H') > 12 ? 'PM' : 'AM';
    let launchDisplay = launchTimeDisplay + '' + timeOfDay;
    let rightNow = moment();
    let timeToLaunch = rightNow.to(this.state.delivery_time);
    let happen = timeToLaunch.includes('ago') ? 'happened' : 'happening';

    return (
      <div className="event">
        <div className="title">
          <h1>{title}</h1>
          <h3>{happen} {timeToLaunch}</h3>
          <h5>on {launchDisplay}</h5>
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
