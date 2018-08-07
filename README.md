# Directly Training Frontend

Directly training app, is an application with **webpack**, **react** and **redux** to make additions, deletions, and modifications from users.

## Prerequisites

## Ubuntu

**install npm version, node >= 8**
  * `sudo apt-get update`
  * `sudo apt-get install nodejs`
  * `sudo apt-get install npm`

Also, you can use [nvm node version management tool](https://github.com/creationix/nvm)

**install yarn latest**
  * `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
  * `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
  * `sudo apt-get update && sudo apt-get install yarn`

## Windows

  * [Install npm](http://blog.teamtreehouse.com/install-node-js-npm-windows)
  * [Install yarn](https://yarnpkg.com/lang/en/docs/install/#windows-stable)

## Start application
  - Install packages `npm install` or `yarn install`
  - Run app: `npm start` or `yarn start`
  - By default, the application starts on http://localhost:8080
  - The backend is integrated with the API [MS BE with heroku](https://ms-labs-be.herokuapp.com) you can check the repo here: [MS BE Repository](https://github.com/MS-React/backend)
  - You can point to the local backend with the file **app/constants.js**

  >For now don't commit this **.env.development** or **constants.js** file changes

### Commands

**install packages**
```ssh
npm install
```
**start app**
```ssh
npm start
```
### Dev tools

**run tests**
```ssh
npm test
```

**run test with watch**
```ssh
test:dev
```

**linter rules**
```ssh
npm run lint
```
**sass rules**
```ssh
npm run sass-lint
```

# Form Validation

### The Plan
My design goals are as follows:

- Portability/Reusability. I want to be able to use the same validation code several places in my project, and in future projects.
- Flexibility. It needs to be able to handle most common validation scenarios, like checking if a field is empty, that it’s numeric, etc.
- Multiple validations per field. This is a very common requirement.

To achieve these, I decided to create a **FormValidator** object that might look something like this:

```javascript
class FormValidator {
  constructor(validations) {
    // validations is an array of form-specific validation rules
    this.validations = validations;
  }
  validate(state) {
    // iterate through the validation rules and construct
    // a validation object, and return it
    return validation;
  }
}
```

File: **app/validators/formValidator.jsx**

To use this object, my form just creates an **instance of the FormValidator**, passing into an array of validation rules. (We’ll discuss validation rules later)

**const validator = new FormValidator([rule1, rule2, rule3]);**

Then when the form wants to check if state is valid, it calls validate(state).

**const validation = validator.validate(this.state);**

The form can then use the validation object to determine if the form can be submitted and what to display. We’ll get to the details of the validation object in a minute or two.


### Validation Rules

Conceptually, a validation rule needs the following things:

- What field is being validated.
- What function should be invoked to check if it’s valid
- What that function should return when the field is valid (usually true or false)
- What message should be displayed if the field isn’t valid.

Ok, so then why not write a rules for a name field like this:
```javascript
validator = new FormValidator([
  ...
  {
    field: 'age',
    method: validator.isInt,
    args: [{min: 21, max: 65}],  // an array of additional arguments
    validWhen: true,
    message: 'Your age must be an integer between 21 and 65'
  }
])
```

File: **app/validators/formRules.jsx**

```javascript
import { validationSettings } from './validationSettings';

export const formRules = {
  login: [
    ...validationSettings.username.rules,
    ...validationSettings.password.rules
  ]
}
```

File: **app/validators/validationSettings.jsx

```javascript
export const validationSettings = {
  name: {
    required: true,
    rules: [
      {
        args: [{
          min: 4,
          max: 35
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
  }
}
```

### Validation Object
Before we go into detail about how the FormValidator validate method works, we need to think about what the form needs to get back. How do we plan to use the information we get back?

Well the most obvious thing is that we will want to be able to quickly check if the form is valid so that we know if we should submit it or not. So let’s start by requiring that our validation object has an isValid property.

This validator use the set of rules **formRules** created before and returns this object
```javascript
{
  isValid: bool,
  keyFromYourField: {
    isValid: bool,
    message: string
  }
}
```

### Validate the form
```javascript
class LoginForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  // Important validation state
  state = {
    username: '',
    password: '',
    validation: {}
  };

  constructor() {
    super();

    // Set of rules from your form
    this.validator = new formValidator(formRules.login);
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    // Validate your form
    const validation = this.validator.validate(this.state);
    this.setState({
      validation
    }, function () {
      // Your code when form isValid
      if (validation.isValid) {
         ...
      }
    });
  }
}
```
