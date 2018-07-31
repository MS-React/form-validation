import {
  isEmail,
  isEmpty,
  isNumeric,
  isLength
} from 'validator';
const minLength = 2;
const maxLength = 35;
const minPhoneLength = 4;
const maxPhoneLength = 8;

export const validationSettings = {
  name: {
    required: true,
    rules: [
      {
        args: [{
          min: minLength,
          max: maxLength
        }],
        field: 'name',
        message: `Name must be between ${minLength} and ${maxLength} characters.`,
        method: isLength,
        validWhen: true
      },
      {
        field: 'name',
        method: isEmpty,
        message: 'Please provide a name.',
        validWhen: false
      }
    ]
  },
  skypeId: {
    required: false,
    rules: [
      {
        args: [{
          min: minLength,
          max: maxLength
        }],
        field: 'skypeId',
        message: `Skype ID must be between ${minLength} and ${maxLength} characters.`,
        method: isLength,
        validWhen: true
      },
      {
        field: 'skypeId',
        method: isEmpty,
        message: 'Please provide a skype ID.',
        validWhen: false
      }
    ]
  },
  email: {
    required: true,
    rules: [
      {
        args: [{
          min: minLength,
          max: maxLength
        }],
        field: 'email',
        message: `Email must be between ${minLength} and ${maxLength} characters.`,
        method: isLength,
        validWhen: true
      },
      {
        field: 'email',
        method: isEmail,
        message: 'That is not a valid email.',
        validWhen: true
      },
      {
        field: 'email',
        method: isEmpty,
        message: 'Please provide an email address.',
        validWhen: false
      }
    ]
  },
  phone: {
    required: true,
    rules: [
      {
        args: [{
          min: minPhoneLength,
          max: maxPhoneLength
        }],
        field: 'phone',
        message: `Phone must be between ${minLength} and ${maxLength} characters.`,
        method: isLength,
        validWhen: true
      },
      {
        field: 'phone',
        message: 'Please provide a valid phone number',
        method: isNumeric,
        validWhen: true
      },
      {
        field: 'phone',
        method: isEmpty,
        message: 'Please provide a phone number.',
        validWhen: false
      }
    ]
  },
  username: {
    required: true,
    rules: [
      {
        args: [{
          min: minLength,
          max: maxLength
        }],
        field: 'username',
        message: `Username must be between ${minLength} and ${maxLength} characters.`,
        method: isLength,
        validWhen: true
      },
      {
        field: 'username',
        method: isEmpty,
        validWhen: false,
        message: 'Please provide a valid username.'
      }
    ]
  },
  password: {
    required: true,
    rules: [
      {
        args: [{
          min: minLength,
          max: maxLength
        }],
        field: 'password',
        message: `Password must be between ${minLength} and ${maxLength} characters.`,
        method: isLength,
        validWhen: true
      },
      {
        field: 'password',
        method: isEmpty,
        message: 'Please provide a valid password.',
        validWhen: false
      }
    ]
  }
};
