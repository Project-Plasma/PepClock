import React from 'react';


class Contributions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      contributions: []
    }
  };

  

  render(){
    return (
      <div className="contributions">
        <div className="title">
          <h1> Event title is {this.state.title}</h1>
        </div>
        <hr />
        <div className="user-contributions">
          <ul>
            {this.state.contributions.map(contribution => <li style="none">{contribution}</li>)}
            <li>Hello from the list</li>
          </ul>
        </div>
        <form className="comment">
          <input type="textarea" placeholder="Add a Comment" autoFocus="true" onChange={this.handleChange} />
          <button id="submit" onClick={this.handleClick}>Comment</button>
        </form>
      </div>
    );
  }
}

export default Contributions;
