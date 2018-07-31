import React from 'react';
import { shallow } from 'enzyme';
import UsersForm from './UsersForm';

function setup(props) {
  return shallow(<UsersForm {...props} />);
}

describe('<UsersForm /> component', () => {
  it('renders itself', () => {
    // Arrange Act
    const wrapper = setup({
      onChange: () => {},
      user: {},
      validation: {}
    });

    // Assert
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('FormInput')).toHaveLength(4);
  });

  it('should render form input with the right props', () => {
    // Arrange Act
    const wrapper = setup({
      onChange: () => {},
      user: {},
      validation: {
        isValid: false,
        name: {
          isValid: false,
          message: 'Error name'
        },
        email: {
          isValid: false,
          message: 'Error email'
        },
        phone: {
          isValid: false,
          message: 'Error phone'
        },
        skypeId: {
          isValid: false,
          message: 'Error skype ID'
        }
      }
    });

    // Assert
    expect(wrapper.find('FormInput').at(0).props()).toMatchObject({
      feedback: 'Error name',
      invalid: true
    });
    expect(wrapper.find('FormInput').at(1).props()).toMatchObject({
      feedback: 'Error email',
      invalid: true
    });
    expect(wrapper.find('FormInput').at(2).props()).toMatchObject({
      feedback: 'Error phone',
      invalid: true
    });
    expect(wrapper.find('FormInput').at(3).props()).toMatchObject({
      feedback: 'Error skype ID',
      invalid: true
    });
  });
});
