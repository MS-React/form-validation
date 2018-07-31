import formValidator from './formValidator';
import { formRules } from './formRules';

describe('Form validator class', () => {

  it('Should validate login form', () => {
    // Arrange
    const validator = new formValidator(formRules.login);

    // Act
    const validState = validator.validate({
      username: 'John',
      password: 'Doe1234'
    });

    // Assert
    expect(validState).toEqual({
      isValid: true,
      password: {
        isValid: true,
        message: ''
      },
      username: {
        isValid: true,
        message: ''
      }
    });
  });

  it('Should validate login form for empty fields', () => {
    // Arrange
    const validator = new formValidator(formRules.login);

    // Act
    const emptyState = validator.validate({
      username: '',
      password: ''
    });

    // Assert
    expect(emptyState).toEqual({
      isValid: false,
      password: {
        isValid: false,
        message: 'Please provide a valid password.'
      },
      username: {
        isValid: false,
        message: 'Please provide a valid username.'
      }
    });
  });

  it('Should validate login form with min length', () => {
    // Arrange
    const validator = new formValidator(formRules.login);

    // Act
    const lengthState = validator.validate({
      username: 'j',
      password: 'd'
    });

    // Assert
    expect(lengthState).toEqual({
      isValid: false,
      password: {
        isValid: false,
        message: 'Password must be between 2 and 35 characters.'
      },
      username: {
        isValid: false,
        message: 'Username must be between 2 and 35 characters.'
      }
    });
  });

  it('Should validate user form', () => {
    // Arrange
    const validator = new formValidator(formRules.user);

    // Act
    const validState = validator.validate({
      name: 'john',
      email: 'johndoe@gmail.com',
      phone: '12345',
      skypeId: ''
    });

    // Assert
    expect(validState).toEqual({
      isValid: true,
      email: {
        isValid: true,
        message: ''
      },
      name: {
        isValid: true,
        message: ''
      },
      phone: {
        isValid: true,
        message: ''
      },
      skypeId: {
        isValid: true,
        message: ''
      }
    });
  });

  it('Should validate user form for empty fields', () => {
    // Arrange
    const validator = new formValidator(formRules.user);

    // Act
    const emptyState = validator.validate({
      name: '',
      email: '',
      skypeId: '',
      phone: ''
    });

    // Assert
    expect(emptyState).toEqual({
      isValid: false,
      email: {
        isValid: false,
        message: 'Please provide an email address.'
      },
      name: {
        isValid: false,
        message: 'Please provide a name.'
      },
      phone: {
        isValid: false,
        message: 'Please provide a phone number.'
      },
      skypeId: {
        isValid: true,
        message: ''
      }
    });
  });

  it('Should validate user form with min length', () => {
    // Arrange
    const validator = new formValidator(formRules.user);

    // Act
    const lengthState = validator.validate({
      name: 'n',
      email: 'johndoe@gmail.com',
      skypeId: 's',
      phone: '1'
    });

    // Assert
    expect(lengthState).toEqual({
      isValid: false,
      email: {
        isValid: true,
        message: ''
      },
      name: {
        isValid: false,
        message: 'Name must be between 2 and 35 characters.'
      },
      phone: {
        isValid: false,
        message: 'Phone must be between 2 and 35 characters.'
      },
      skypeId: {
        isValid: false,
        message: 'Skype ID must be between 2 and 35 characters.'
      }
    });
  });

  it('Should extend options from validator', () => {
    // Arrange
    let validator = new formValidator(formRules.login);

    // Act
    const emptyStateNotRequired = validator.validate({
      username: '',
      password: ''
    }, {
      username: {
        required: false
      }
    });

    // Assert
    expect(emptyStateNotRequired).toEqual({
      isValid: false,
      password: {
        isValid: false,
        message: 'Please provide a valid password.'
      },
      username: {
        isValid: true,
        message: ''
      }
    });
  });

  it('Should not return state when properties are differents', () => {
    // Arrange
    let validator = new formValidator(formRules.login);

    // Act
    const emptyState = validator.validate({
      test: ''
    });

    // Assert
    expect(emptyState).toEqual({
      isValid: true
    });
  });
});
