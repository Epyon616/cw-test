import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LoginForm } from '../../../components/login/LoginForm';

Enzyme.configure({ adapter: new Adapter() });

describe('LoginForm Component', () => {
  let wrapper; 

  beforeAll(() => {
    wrapper = mount(<LoginForm />);
  });

  it('should render the login form', () => {
    expect(wrapper.find('h1').exists()).toBe(true);
    expect(wrapper.find('h1').text()).toEqual('Login');
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('input').length).toEqual(2);
    expect(wrapper.find('button').exists()).toBe(true);
  });
});