import React from 'react';
import ContributionListItem from './ContributionListItem';

class ContributionList extends React.Component {
  constructor(props) {
    super(props);
  }
   
  render() {
    if (this.props.contributionList.length) {
      return (
        <div className="bg-faded w-75 mx-auto pt-3 pb-2">
          {this.props.contributionList.map((contribution) =>
            <ContributionListItem contribution={contribution} key={contribution.id}/>)}
        </div>
      );
    } else {
      return (
        <h3>Get started by adding a message!</h3>
      );
    }
  }
}

export default ContributionList;
