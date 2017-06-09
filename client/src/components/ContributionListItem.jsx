import React from 'react';
import renderIf from 'render-if';

class ContributionListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div className="card w-50 mx-auto mb-3">
        {renderIf(this.props.contribution.type === 'image')(
          <img className="card-img-top img-fluid" src={this.props.contribution.media_url} />
        )}
        {renderIf(this.props.contribution.type === 'video')(
          <video controls className="card-img-top img-fluid" src={this.props.contribution.media_url} />
        )}
        <div className="card-block">
          <p className="card-text">{this.props.contribution.text}</p>
          <p className="card-text font-italic">{this.props.contribution.user.first} {this.props.contribution.user.last}</p>
        </div>
      </div>
    );
  }
}

export default ContributionListItem;
