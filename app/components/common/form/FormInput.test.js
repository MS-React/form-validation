import React from 'react';
import { shallow } from 'enzyme';
import FormInput from './FormInput';

function setup(props) {
  return shallow(<FormInput {...props} />);
}

describe('<InputForm /> component', () => {
  it('renders itself', () => {
    // Arrange Act
    const wrapper = setup();
    expect(wrapper.find('Input')).toHaveLength(1);
  });

  it('uses "type" attribute', () => {
    // Arrange
    const type = 'email';

    // Act
    const wrapper = setup({
      type
    });
    // Assert
    expect(wrapper.find('Input').prop('type')).toEqual(type);
  });

  it('uses "name" attribute', () => {
    // Arrange
    const name = 'test';

    // Act
    const wrapper = setup({
      name
    });

    // Assert
    expect(wrapper.find('Input').prop('name')).toEqual(name);
  });

  it('uses "placeholder" attribute', () => {
    // Arrange
    const placeholder = 'test';

    // Act
    const wrapper = setup({
      placeholder
    });
  
    // Assert
    expect(wrapper.find('Input').prop('placeholder')).toEqual(placeholder);
  });

  it('uses "required" attribute', () => {
    // Arrange
    const required = true;

    // Act
    const wrapper = setup({
      required
    });

    // Assert
    expect(wrapper.instance().props.required).toEqual(required);
  });
});
