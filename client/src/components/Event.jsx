import React from 'react';
import { Link } from 'react-router-dom';
import ContributionList from './ContributionList';
import axios from 'axios';
import moment from 'moment';
const client = filestack.init('A03mnfU7QQ6QY8rPMGtfBz');

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.match.params.id,
      title: '',
      contributionList: [],
      contributionText: '',
      contributionType: '',
      contributionMediaUrl: '',
      hasPermissionToView: null,
      delivery_time: '',
      curSecond: moment().second(),
      curMinute: moment().minute(),
      curHour: moment().hour()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateContributions = this.updateContributions.bind(this);
    this.showPicker = this.showPicker.bind(this);
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
        contributionType: this.state.contributionType,
        contributionMediaUrl: this.state.contributionMediaUrl
      }
    })
    .then(res => {
      this.setState({
        contributionText: '',
        contributionType: '',
        contributionMediaUrl: ''
      });
      this.updateContributions();
    })
    .catch(err => {
      console.log('Error in Event.jsx', err);
    });
  }

  checkIfContributor () {
    axios.get('/api/events/users')
      .then(({ data: events }) => {
        const userEventIds = events.map(event => event.event_id);
        this.setState({
          hasPermissionToView: userEventIds.includes(Number(this.state.eventId))
        });
        this.getEventContent();
      })
      .catch(err => console.error(err));
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
    .then(({ data: { title, delivery_time } }) => {
      this.setState({ title, delivery_time });
      this.updateContributions();
    })
    .catch(error => {
      console.log('Error in Event data query', error);
    });
  }

  showPicker() {
    client.pick({accept: ['image/*', 'video/*']})
    .then(result => {
      let type = result.filesUploaded[0].mimetype.slice(0, 5);
      let url = result.filesUploaded[0].url;
      this.setState({contributionType: type, contributionMediaUrl: url});
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
      const { title, description, delivery_time } = this.state;

      let launchTimeDisplay = moment(delivery_time).format('MMM Do YYYY || hh : mm');
      let timeOfDay = moment(delivery_time).format('H') > 12 ? 'PM' : 'AM';
      let launchDisplay = launchTimeDisplay + ' ' + timeOfDay;
      let timeToLaunch = moment().to(delivery_time);
      let happen = timeToLaunch.includes('ago') ? 'happened' : 'happening';

      return (
        <div className="container event">
          <div className="row">
            <div className="col-xs-12">
              <h1>{title}</h1>
              <h3>{happen} {timeToLaunch}</h3>
              <h5>on {launchDisplay}</h5>
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
                <input type="button" value="Upload" onClick={this.showPicker} />
                <button id="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container event">
        <div className="row">
          <div className="col-xs-12">
            <h3>Sorry, this doesn't seem to be one of your events</h3>
            <p>Perhaps you'd like to <Link to="/dashboard">view your events</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Event;
