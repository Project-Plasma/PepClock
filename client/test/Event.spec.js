import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Event from '../src/components/Event';

describe('Event Component', function() {
  it('contains the correct class', function() {
    expect(mount(<Event />).find('.event').length).to.equal(1);
  });
  it('contains a div with the event tile', function() {
    expect(mount(<Event />).find('.title').length).to.equal(1);
  });
  it('contains an event description', function() {
    expect(mount(<Event />).find('.description').length).to.equal(1);
  });
  it('contains a div with all user contributions', function() {
    expect(mount(<Event />).find('.contributions').length).to.equal(1);
  });
  it('contains a form where the user can add a contribution', function() {
    expect(mount(<Event />).find('.add').length).to.equal(1);
  });
});
