import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ContributionList from '../src/components/ContributionList';

describe('Contributions Component', function(){
  const wrapper = shallow(<ContributionList />);

  it('contains the correct class', function(){
    expect(wrapper.find('.contribution-list').length).to.equal(1);
  });
  it('contains the event title', function(){
    expect(wrapper.find('.title').length).to.equal(1);
  });
  it('contains all contributions from all other users', function(){
    expect(wrapper.find('.user-contributions').length).to.equal(1);
  });
  it('contains a comment form', function(){
    expect(wrapper.find('.comment').length).to.equal(1);
  });
});
