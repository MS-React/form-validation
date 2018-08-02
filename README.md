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

### Configuration files

* app/validators/validationSettings.jsx
* app/validators/formRules.jsx
* app/validators/formValidator.jsx

### How to use

**app/validators/validationSettings.jsx**

Have each rule from your field / state and uses the library [Validator](https://github.com/chriso/validator.js) from npm but you can create your own functions
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

**app/validators/formRules.jsx**

Then here you can create your own set of rules by field / state
```javascript
import { validationSettings } from './validationSettings';

export const formRules = {
  login: [
    ...validationSettings.username.rules,
    ...validationSettings.password.rules
  ]
}
```

**app/validators/formValidator.jsx**

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

**validate**
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
