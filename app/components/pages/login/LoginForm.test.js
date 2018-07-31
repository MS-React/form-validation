import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

function setup(props) {
  return shallow(<LoginForm {...props} />);
}

describe('<LoginForm /> component', () => {
  it('renders itself', () => {
    // Arrange Act
    const wrapper = setup({
      onSubmit: function () { }
    });

    // Assert
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('FormInput')).toHaveLength(2);
  });

  it('should handle username Changes', () => {
    // Arrange
    const wrapper = setup({
      onSubmit: function () { }
    });
    const event = {
      target: {
        name: 'username',
        value: 'jdoe'
      }
    };
    const expectedState = {
      username: 'jdoe',
      password: '',
      validation: {}
    };

    // Act
    wrapper.find('FormInput').first().simulate('change', event);

    // Assert
    expect(wrapper.state()).toEqual(expectedState);
  });

  it('should handle password Changes', () => {
    // Arrange
    const wrapper = setup({
      onSubmit: function () { }
    });
    const event = {
      target: {
        name: 'password',
        value: 'secret'
      }
    };
    const expectedState = {
      username: '',
      password: 'secret',
      validation: {}
    };

    // Act
    wrapper.find('FormInput').last().simulate('change', event);

    // Assert
    expect(wrapper.state()).toEqual(expectedState);
  });

  it('should handle form submit when form is valid', () => {
    // Arrange
    const props = {
      onSubmit: jest.fn()
    };
    const wrapper = setup(props);
    wrapper.setState({
      username: 'John',
      password: 'JohnDoe'
    });

    const event = {
      preventDefault: jest.fn()
    };

    // Act
    wrapper.find('form').simulate('submit', event);

    // Assert
    expect(event.preventDefault.mock.calls.length).toBe(1);
    expect(props.onSubmit.mock.calls.length).toBe(1);
  });

  it('should not call form submit when form is invalid', () => {
    // Arrange
    const props = {
      onSubmit: jest.fn()
    };
    const wrapper = setup(props);
    wrapper.setState({
      username: 'J',
      password: 'D'
    });

    const event = {
      preventDefault: jest.fn()
    };

    // Act
    wrapper.find('form').simulate('submit', event);

    // Assert
    expect(event.preventDefault.mock.calls.length).toBe(1);
    expect(props.onSubmit.mock.calls.length).toBe(0);
  });
});
