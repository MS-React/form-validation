import React from 'react';
import { shallow } from 'enzyme';
import { ActionButtons, mapStateToProps } from './ActionButtons';
import initialState from '../../../reducers/initialState';

function setup(props) {
  return shallow(
    <ActionButtons
      {...props}
      onCreateUser={jest.fn()}
    />
  );
}

describe('<ActionButtons />', () => {
  it('renders itself', () => {
    // Arrange
    const wrapper = setup({
      user: {}
    });

    // Assert
    expect(wrapper.find('Button')).toHaveLength(3);
    expect(wrapper.find('MsModal')).toHaveLength(1);
  });

  describe('mapStateToProps function', () => {
    it('should return the initial state', () => {
      // Arrange
      const expectedProps = {
        user: {}
      };
      const props = mapStateToProps(Object.assign({}, initialState));

      // Assert
      expect(props).toEqual(expectedProps);
    });
  });

  describe('componentWillReceiveProps function', () => {
    it('should set the new selected user', () => {
      // Arrange
      const expectedState = {
        user: {
          id: 'id'
        }
      };
      const wrapper = setup({
        user: {}
      });

      const user = {
        id: 'id'
      };

      wrapper.setProps({user});

      // Assert
      expect(wrapper.state().user).toEqual(expectedState.user);
    });

    it('should skip setting selected user when it is the same', () => {
      // Arrange
      const user = {
        id: 'id'
      };
      const expectedState = {
        email: '',
        id: 'id',
        name: '',
        phone: '',
        skypeId: ''
      };
      const wrapper = setup({
        user
      });

      wrapper.setProps({user});

      // Assert
      expect(wrapper.state().user).toEqual(expectedState);
    });

    it('should use default parameters when users are undefined', () => {
      // Arrange
      const expectedState = {
        email: '',
        name: '',
        phone: '',
        skypeId: ''
      };
      const wrapper = setup({
        user: undefined
      });

      wrapper.setProps({user: undefined});

      // Assert
      expect(wrapper.state().user).toEqual(expectedState);
    });
  });

  describe('toggleModal Functions', () => {
    const state = {
      actionType: '',
      isUserModalOpen: true,
      modalBody: {},
      modalTitle: '',
      modalYesLabel: '',
      user: {
        email: '',
        name: '',
        phone: '',
        skypeId: ''
      },
      validation: {}
    };

    it('should toggle Add Modal', () => {
      // Arrange
      const wrapper = setup({
        user: {}
      });
      const expectedState = {
        ...state,
        actionType: 'add',
      };

      // Act
      wrapper.find('Button[color="primary"]').simulate('click');

      // Assert
      expect(wrapper.state()).toEqual(expectedState);
    });

    it('should toggle Edit Modal', () => {
      // Arrange
      const wrapper = setup({
        user: {}
      });
      const expectedState = {
        ...state,
        actionType: 'edit',
      };

      // Act
      wrapper.find('Button[color="info"]').simulate('click');

      // Assert
      expect(wrapper.state()).toEqual(expectedState);
    });

    it('should toggle Delete Modal', () => {
      // Arrange
      const wrapper = setup({
        user: {}
      });
      const expectedState = {
        ...state,
        actionType: 'delete',
      };

      // Act
      wrapper.find('Button[color="danger"]').simulate('click');

      // Assert
      expect(wrapper.state()).toEqual(expectedState);
    });
  });

  describe('saveUser handler', () => {
    it('should not saveUser', () => {
      // Arrange
      const onConfirm = jest.fn();
      const wrapper = setup({
        user: {
          name: 'j',
          email: 'johndoe',
          phone: '1234',
          skypeId: ''
        },
        onConfirm
      });

      // Act
      wrapper.instance().saveUser();

      // Assert
      expect(onConfirm).toHaveBeenCalledTimes(0);
    });

    it('should saveUser', () => {
      // Arrange
      const onConfirm = jest.fn().mockReturnValue(Promise.resolve());
      const wrapper = setup({
        user: {
          name: 'John',
          email: 'johndoe@gmail.com',
          phone: '12345',
          skypeId: ''
        },
        onConfirm
      });

      // Act
      wrapper.instance().saveUser();

      // Assert
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('should not call onConfirm when it\'s not a function', () => {
      // Arrange
      const onConfirm = undefined;
      const wrapper = setup({
        user: {
          name: 'John',
          email: 'johndoe@gmail.com',
          phone: '12345',
          skypeId: ''
        },
        onConfirm
      });

      // Act
      wrapper.instance().toggle = jest.fn();
      wrapper.instance().saveUser();

      // Assert
      expect(wrapper.instance().toggle).toHaveBeenCalledTimes(0);
    });
  });

  describe('update user state on users form change', () => {
    it('should set new state', () => {
      // Arrange
      const event = {
        target: {
          name: 'name',
          value: 'John Doe'
        }
      };
      const expectedUserState = {
        email: '',
        name: 'John Doe',
        phone: '',
        skypeId: ''};
      const wrapper = setup({});

      // Act
      wrapper.instance().updateUserState(event);

      // Assert
      expect(wrapper.state().user).toEqual(expectedUserState);
    });
  });

  describe('cancel modal editions', () => {
    it('should reset selected user to state', () => {
      // Arrange
      const expectedUserState = {
        id: '1',
        email: 'john@doe.com',
        name: 'John Doe',
        phone: '123456',
        skypeId: 'jdoe'
      };
      const wrapper = setup({
        user: expectedUserState
      });

      // Act
      wrapper.instance().cancel();

      // Assert
      expect(wrapper.state().user).toEqual(expectedUserState);
    });

    it('should reset state to empty user', () => {
      // Arrange
      const expectedUserState = {
        email: '',
        name: '',
        phone: '',
        skypeId: ''
      };
      const wrapper = setup({
        user: {}
      });

      // Act
      wrapper.instance().cancel();

      // Assert
      expect(wrapper.state().user).toEqual(expectedUserState);
    });
  });

  describe('getModalLabels', () => {
    it('should use default parameter', () => {
      // Arrange
      const expected = {confirmButtonText: 'Save'};
      const wrapper = setup({});

      // Act
      const label = wrapper.instance().getModalLabels();

      // Assert
      expect(label).toEqual(expected);
    });
  });
});
