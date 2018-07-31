import React from 'react';
import { shallow } from 'enzyme';
import { HomePage, mapDispatchToProps, mapStateToProps } from './HomePage';
import initialState from '../../../reducers/initialState';

function setup(props) {
  return shallow(<HomePage {...props} />);
}

describe('<HomePage /> component', () => {
  it('renders itself', () => {
    // Arrange Act
    const wrapper = setup({
      usersActions: {
        getUsers: jest.fn(),
        selectUser: jest.fn()
      }
    });

    // Assert
    expect(wrapper.find('Header')).toHaveLength(1);
    expect(wrapper.find('.container')).toHaveLength(1);
  });

  describe('mapStateToProps functions', () => {
    it('should return the initial state of users module', () => {
      // Arrange
      const expectedProps = {
        users: []
      };

      //Act
      const props = mapStateToProps(Object.assign({}, initialState));

      // Assert
      expect(props).toEqual(expectedProps);
    });
  });

  describe('mapDispatchToProps functions', () => {
    it('usersActions prop should be defined', () => {
      // Arrange
      const dispatch = () => {};

      // Act
      const props = mapDispatchToProps(dispatch);

      // Assert
      expect(props.usersActions).toBeDefined();
    });

    it('should return the binded actions', () => {
      // Arrange
      const dispatch = () => {};
      const expectedActions = [
        'loadingUsersBegin',
        'loadingUsersComplete',
        'loadingUsersFailed',
        'createUsersSuccess',
        'selectUsersSuccess',
        'getUsersSuccess',
        'updateUsersSuccess',
        'deleteUsersSuccess',
        'selectUser',
        'deleteUser',
        'updateUser',
        'createUser',
        'getUsers'
      ];

      // Act
      const props = mapDispatchToProps(dispatch);

      // Assert
      expect(Object.keys(props.usersActions)).toEqual(expectedActions);
    });
  });

  describe('setSelectedRow handler', () => {
    it('should select user', () => {
      // Arrange
      const user = {
        id: 'id'
      };
      const selectUser = jest.fn();
      const wrapper = setup({
        usersActions: {
          selectUser,
          getUsers: () => {},
          createUser: () => {},
          updateUser: () => {},
          deleteUser: () => {}
        },
      });

      // Act
      wrapper.instance().setSelectedRow(user);

      // Assert
      expect(selectUser).toHaveBeenCalledTimes(1);
    });

    it('should select user', () => {
      // Arrange
      const user = {
        id: 'id'
      };
      const selectUser = jest.fn();
      const wrapper = setup({
        usersActions: {
          selectUser: 'text',
          getUsers: () => {},
          createUser: () => {},
          updateUser: () => {},
          deleteUser: () => {}
        },
      });

      // Act
      wrapper.instance().setSelectedRow(user);

      // Assert
      expect(selectUser).toHaveBeenCalledTimes(0);
    });
  });

  describe('handleUserActionType handler', () => {
    it('should return Add handler', () => {
      // Arrange
      const type = 'add';
      const user = {
        id: 'id'
      };
      const createUser = jest.fn();
      const wrapper = setup({
        usersActions: {
          selectUser: () => {},
          getUsers: () => {},
          createUser,
          updateUser: () => {},
          deleteUser: () => {}
        },
      });

      // Act
      wrapper.instance().handleUserActionType(type, user);

      // Assert
      expect(createUser).toHaveBeenCalledTimes(1);
    });

    it('should return Edit handler', () => {
      // Arrange
      const type = 'edit';
      const user = {
        id: 'id'
      };
      const updateUser = jest.fn();
      const wrapper = setup({
        usersActions: {
          selectUser: () => {},
          getUsers: () => {},
          createUser: () => {},
          updateUser,
          deleteUser: () => {}
        },
      });

      // Act
      wrapper.instance().handleUserActionType(type, user);

      // Assert
      expect(updateUser).toHaveBeenCalledTimes(1);
    });

    it('should return Delete handler', () => {
      // Arrange
      const type = 'delete';
      const user = {
        id: 'id'
      };
      const deleteUser = jest.fn();
      const wrapper = setup({
        usersActions: {
          selectUser: () => {},
          getUsers: () => {},
          createUser: () => {},
          updateUser: () => {},
          deleteUser
        },
      });

      // Act
      wrapper.instance().handleUserActionType(type, user);

      // Assert
      expect(deleteUser).toHaveBeenCalledTimes(1);
    });

    it('should return add Handler when type is other than add, edit, delete', () => {
      // Arrange
      const type = 'other';
      const user = {
        id: 'id'
      };
      const selectUser = jest.fn();
      const createUser = jest.fn();
      const deleteUser = jest.fn();
      const updateUser = jest.fn();
      const wrapper = setup({
        usersActions: {
          selectUser,
          getUsers: () => {},
          createUser,
          updateUser,
          deleteUser
        },
      });

      // Act
      wrapper.instance().handleUserActionType(type, user);

      // Assert
      expect(selectUser).toHaveBeenCalledTimes(0);
      expect(createUser).toHaveBeenCalledTimes(0);
      expect(deleteUser).toHaveBeenCalledTimes(0);
      expect(updateUser).toHaveBeenCalledTimes(0);
    });

    it('should return Add as default handler when no type is passed', () => {
      // Arrange
      const type = undefined;
      const user = {
        id: 'id'
      };
      const createUser = jest.fn();
      const wrapper = setup({
        usersActions: {
          selectUser: () => {},
          getUsers: () => {},
          createUser,
          updateUser: () => {},
          deleteUser: () => {}
        },
      });

      // Act
      wrapper.instance().handleUserActionType(type, user);

      // Assert
      expect(createUser).toHaveBeenCalledTimes(1);
    });
  });
});
