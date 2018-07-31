import validator from 'validator';
import some from 'lodash.some';
import { cloneDeep, extend } from 'lodash';
import { validationSettings } from './validationSettings';

export default class FormValidator {

  constructor(validations) {
    this.validations = cloneDeep(validations);
    this.validationSettings = cloneDeep(validationSettings);
  }

  getValidation = (state) => {
    let validation = {};

    this.validations.forEach(rule => {
      if (state.hasOwnProperty(rule.field)) {
        validation[rule.field] = {
          isValid: true,
          message: ''
        };
      }
    });

    return {
      isValid: true,
      ...validation
    };
  }

  shouldValidateField = (state, field) => {
    return (
      this.validationSettings[field].required ||
      state[field] !== ''
    );
  }

  extendValidations = (options) => {
    Object.keys(options).map(function (objectKey) {
      this.validationSettings[objectKey] = extend(
        this.validationSettings[objectKey],
        options[objectKey]
      );
    }, this);
  }

  validate = (state, options) => {
    let validation = this.getValidation(state);

    if (options) {
      this.extendValidations(options);
    }

    this.validations.forEach(rule => {
      if (state.hasOwnProperty(rule.field)) {
        if (this.shouldValidateField(state, rule.field)) {
          const fieldValue = state[rule.field].toString();
          const args = rule.args || [];
          const validationMethod = (typeof rule.method === 'string') ?
            validator[rule.method] : rule.method;

          if (validationMethod(fieldValue, ...args, state) !== rule.validWhen) {
            validation[rule.field] = {
              isValid: false,
              message: rule.message
            };
          }
        }
      }
    });

    return {
      ...validation,
      isValid:  (!some(validation, { isValid: false }))
    };
  }
}
