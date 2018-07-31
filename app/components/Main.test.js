import React from 'react';
import { shallow } from 'enzyme';
import { Main, mapDispatchToProps, mapStateToProps } from './Main'; // Undecorated version.
import initialState from '../reducers/initialState';

function setup(props) {
  return shallow(<Main {...props} />);
}

describe('<Main /> component', () => {
  it('renders itself', () => {
    // Arrange
    const wrapper = setup({
      actions: {},
      usersActions: {}
    });

    // Assert
    expect(wrapper.find('Switch')).toHaveLength(1);
    expect(wrapper.find('Route')).toHaveLength(3);
  });

  describe('mapStateToProps functions', () => {
    it('should return the initial state of auth module', () => {
      // Act
      const props = mapStateToProps(Object.assign({}, initialState));

      // Assert
      expect(props.isAuthenticated).toBe(false);
    });
  });

  describe('mapDispatchToProps functions', () => {
    it('actions prop should be defined', () => {
      // Arrange
      const dispatch = () => {};
      // Act
      const props = mapDispatchToProps(dispatch);

      // Assert
      expect(props.actions).toBeDefined();
    });

    it('should return the binded actions', () => {
      // Arrange
      const dispatch = () => {};
      const expectedActions = [
        'loginRequest',
        'loginSuccess',
        'loginFailed',
        'login'
      ];

      // Act
      const props = mapDispatchToProps(dispatch);

      // Assert
      expect(Object.keys(props.actions)).toEqual(expectedActions);
    });
  });
});
