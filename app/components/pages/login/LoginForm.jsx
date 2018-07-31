import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../../common/form/FormInput';
import formValidator from '../../../validators/formValidator';
import get from 'lodash.get';
import { formRules } from '../../../validators/formRules';

import './LoginForm.scss';

class LoginForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  state = {
    username: '',
    password: '',
    validation: {}
  };

  constructor() {
    super();

    this.validator = new formValidator(formRules.login);
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();

    const validation = this.validator.validate(this.state);

    this.setState({
      validation
    }, function () {
      if (validation.isValid) {
        this.props.onSubmit(
          this.state.username,
          this.state.password
        );
      }
    });
  }

  render() {
    const { validation } = this.state;
    const invalidUsername = validation.username &&
      !get(validation, 'username.isValid');
    const invalidPassword = validation.password &&
      !get(validation, 'password.isValid');

    return (
      <form className="login-form" onSubmit={this.handleOnSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <FormInput
          invalid={invalidUsername}
          inputId="inputEmail"
          feedback={get(validation, 'username.message')}
          label="Username or email address"
          onChange={this.handleOnChange}
          name="username"
          placeholder="Username or email address"
          value={this.state.username} />
        <FormInput
          invalid={invalidPassword}
          inputId="inputPassword"
          feedback={get(validation, 'password.message')}
          label="Password"
          onChange={this.handleOnChange}
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password} />
        <span>Hint: <i>username/password</i></span>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    );
  }
}

export default LoginForm;
