import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../../common/form/FormInput';
import { Row } from 'reactstrap';
import get from 'lodash.get';

class UsersForm extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    validation: PropTypes.shape({
      isValid: PropTypes.bool,
      name: PropTypes.shape({
        isValid: PropTypes.bool,
        message: PropTypes.string
      }),
      email: PropTypes.shape({
        isValid: PropTypes.bool,
        message: PropTypes.string
      }),
      phone: PropTypes.shape({
        isValid: PropTypes.bool,
        message: PropTypes.string
      }),
      skypeId: PropTypes.shape({
        isValid: PropTypes.bool,
        message: PropTypes.string
      })
    }).isRequired
  };

  render() {
    const { user, onChange, validation } = this.props;
    const invalidName = validation.name &&
      !get(validation, 'name.isValid');
    const invalidEmail = validation.email &&
      !get(validation, 'email.isValid');
    const invalidPhone = validation.phone &&
      !get(validation, 'phone.isValid');
    const invalidSkypeId = validation.skypeId &&
      !get(validation, 'skypeId.isValid');

    return (
      <div className="container">
        <Row>
          <section>
            <form>
              <FormInput
                inputId="name"
                label="Name"
                onChange={onChange}
                value={user.name}
                name="name"
                placeholder="Full Name"
                required={true}
                invalid={invalidName}
                feedback={get(validation, 'name.message')}
              />
              <FormInput
                inputId="email"
                label="Email"
                onChange={onChange}
                value={user.email}
                name="email"
                placeholder="Email"
                required={true}
                invalid={invalidEmail}
                feedback={get(validation, 'email.message')}
              />
              <FormInput
                inputId="phone"
                label="Phone Number"
                onChange={onChange}
                value={user.phone}
                name="phone"
                placeholder="Phone Number"
                required={true}
                invalid={invalidPhone}
                feedback={get(validation, 'phone.message')}
              />
              <FormInput
                inputId="skypeId"
                label="Skype Id"
                onChange={onChange}
                value={user.skypeId}
                name="skypeId"
                placeholder="skype Id"
                required={true}
                invalid={invalidSkypeId}
                feedback={get(validation, 'skypeId.message')}
              />
            </form>
          </section>
        </Row>
      </div>
    );
  }
}

export default UsersForm;
