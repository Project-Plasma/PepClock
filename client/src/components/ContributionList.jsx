import React from 'react';
import ContributionListItem from './ContributionListItem';
import axios from 'axios';

class ContributionList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      contributions: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };

  //TODO: Use later when backend is ready
  // componentDidMount () {
  //   const eventId = this.props.match.params.id;
  //   axios.get(`/api/events/${eventId}`)
  //   .then(data =>{
  //     this.setState({
  //       title: data.title,
  //       contributions: data.contributions
  //     });
  //   });
  // }

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

  render() {
    return (
      <div className="contribution-list">
        <div className="title">
          <h1> Event title is {this.state.title}</h1>
        </div>
        <hr />
        <div className="user-contributions">
          <ul>
            {/*{this.state.contributions.map(contribution => <li style="none">{contribution}</li>)}*/}
            <li>Hello from the list</li>
          </ul>
        </div>
        <form className="comment">
          <input type="textarea" placeholder="Add a Comment" autoFocus="true" onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
          <button id="submit" onClick={this.handleClick}>Comment</button>
        </form>
      </div>
    );
  }
}

export default ContributionList;
