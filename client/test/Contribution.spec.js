import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Contribution from '../src/components/Contribution';

describe('Contribution component', function(){
  const wrapper = shallow(<Contribution />);
  it('contains the correct class', function(){
    expect(wrapper.find('.contribution').length).to.equal(1);
  });
  it('contains the contribution text', function(){
    expect(wrapper.find('.text').length).to.equal(1);
  });
  it('contains the contributors name', function(){
    expect(wrapper.find('.name').length).to.equal(1);
  });
});

