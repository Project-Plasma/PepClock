import React from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
import Contributions from 'Contributions.jsx'
>>>>>>> Add tests for Contributions component
import axios from 'axios';


class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: '',
      title: '',
      description: '',
      contributions: [],
      contribution: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    var newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleClick(event) {
    this.setState({contributions: this.state.contributions.concat([this.state.contribution])});
    this.setState({contribution: ''});
  }

  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.handleClick();
    }
  }

  // TODO: Use later when backend is ready
  // componentDidMount () {
  //   const eventId = this.props.match.params.id;
  //   axios.get(`/api/events/${eventId}`)
  //   .then(data =>{
  //     this.setState({
  //       eventId: data.eventId,
  //       title: data.title,
  //       description: data.description,
  //       contributions: data.contributions
  //     });
  //   });
  // }

  render() {
    const { id } = this.props.match.params;
    const { title, description } = this.state;

    return (
      <div className="event">
        <div className="title">
          <h1>The title is {title}</h1>
        </div>
        <div className="description">
          <h3>The description is {description}</h3>
          <Link to={`/edit/${id}`}>Edit event</Link>
        </div>
        <hr />
        <div className="contributions">
          <ul>
            {this.state.contributions.map(contribution => <li style="none">{contribution}</li>)}
            <li>Hello from the list</li>
          </ul>
        </div>
        <hr />
        <form className="add">
          <input
            type="textarea"
            placeholder="Enter Text"
            autoFocus="true"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <button id="submit" onClick={this.handleClick}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Event;
