import mockAxios from 'axios';
import {
  createUsers,
  deleteUsers,
  fetchUsers,
  updateUsers
} from './userService';
import { DEFAULT_API_USERS_ENDPOINT } from '../constants';

describe('User Service', () => {
  describe('fetchUsers', () => {
    beforeEach(() => {
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          statusCode: 200,
          statusText: 'OK',
          data: [ 'foo', 'bar' ]
        })
      );
    });

    afterEach(() => {
      mockAxios.get.mockClear();
    });

    it('should be defined', () => {
      // Assert
      expect(fetchUsers).toBeDefined();
    });

    it('should be a function', () => {
      // Assert
      expect(fetchUsers).toEqual(expect.any(Function));
    });

    it('should call the service Once', () => {
      // Act
      fetchUsers();

      // Assert
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });

    it('should call the service with the expected params', () => {
      // Act
      fetchUsers({
        foo: '',
        bar: ''
      });

      // Assert
      expect(mockAxios.get).toHaveBeenCalledWith(
        DEFAULT_API_USERS_ENDPOINT,
        {
          params: {
            foo: '',
            bar: ''
          }
        }
      );
    });

    it('should return users from the service', async () => {
      // Act
      const result = await fetchUsers();

      // Assert
      expect(result.data).toEqual([ 'foo', 'bar' ]);
    });
    
    it('should call the service without any params', () => {
      // Act
      fetchUsers();

      // Assert
      expect(mockAxios.get).toHaveBeenCalledWith(
        DEFAULT_API_USERS_ENDPOINT,
        {
          params: {}
        }
      );
    });
  });

  describe('createUsers', () => {
    beforeEach(() => {
      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          statusCode: 200,
          statusText: 'OK',
          data: [ 'id' ]
        })
      );
    });

    afterEach(() => {
      mockAxios.post.mockClear();
    });

    it('should be defined', () => {
      // Assert
      expect(createUsers).toBeDefined();
    });

    it('should be a function', () => {
      // Assert
      expect(createUsers).toEqual(expect.any(Function));
    });

    it('should call the service with the expected params', () => {
      // Act
      createUsers({
        foo: '',
        bar: ''
      });

      // Assert
      expect(mockAxios.post).toHaveBeenCalledWith(
        DEFAULT_API_USERS_ENDPOINT,
        {
          foo: '',
          bar: ''
        });
    });

    it('should call the service without any data', () => {
      // Act
      createUsers();

      // Assert
      expect(mockAxios.post).toHaveBeenCalledWith(DEFAULT_API_USERS_ENDPOINT, {} );
    });
  });

  describe('updateUsers', () => {
    beforeEach(() => {
      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          statusCode: 200,
          statusText: 'OK',
          data: [ 'id' ]
        })
      );
    });

    afterEach(() => {
      mockAxios.put.mockClear();
    });

    it('should be defined', () => {
      // Assert
      expect(updateUsers).toBeDefined();
    });

    it('should be a function', () => {
      // Assert
      expect(updateUsers).toEqual(expect.any(Function));
    });

    it('should call the service with the expected params', () => {
      // Act
      updateUsers('id', {
        foo: '',
        bar: ''
      });

      // Assert
      expect(mockAxios.put).toHaveBeenCalledWith(
        `${DEFAULT_API_USERS_ENDPOINT}/id`,
        {
          foo: '',
          bar: ''
        });
    });

    it('should call the service without any data', () => {
      // Act
      updateUsers('id');

      // Assert
      expect(mockAxios.put).toHaveBeenCalledWith(`${DEFAULT_API_USERS_ENDPOINT}/id`, {} );
    });

  });

  describe('deleteUsers', () => {
    beforeEach(() => {
      mockAxios.delete.mockImplementationOnce(() =>
        Promise.resolve({
          statusCode: 200,
          statusText: 'OK',
          data: [ 'id' ]
        })
      );
    });

    afterEach(() => {
      mockAxios.delete.mockClear();
    });


    it('should be defined', () => {
      // Assert
      expect(deleteUsers).toBeDefined();
    });

    it('should be a function', () => {
      // Assert
      expect(deleteUsers).toEqual(expect.any(Function));
    });

    it('should call the service Once', () => {
      // Act
      deleteUsers();

      // Assert
      expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    });

    it('should call the service with the expected params', () => {
      // Act
      deleteUsers('id');

      // Assert
      expect(mockAxios.delete).toHaveBeenCalledWith(`${DEFAULT_API_USERS_ENDPOINT}/id`);
    });
  });
});
