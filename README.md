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
