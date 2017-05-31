import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Create from '../src/components/Contributions.jsx';

describe('Contributions Component', function(){
  it('contains the correct class', function(){
    expect(mount(<Contributions />).find('.contribution').length).to.equal(1);
  });
  it('contains the event title', function(){
    expect(mount(<Contributions />).find('.title').length).to.equal(1);
  });
  it('contains all contributions from all other users', function(){
    expect(mount(<Contributions />).find('.user-contributions').length).to.equal(1);
  });
});
