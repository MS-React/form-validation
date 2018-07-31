import { validationSettings } from './validationSettings';

export const formRules = {
  login: [
    ...validationSettings.username.rules,
    ...validationSettings.password.rules
  ],
  user: [
    ...validationSettings.name.rules,
    ...validationSettings.email.rules,
    ...validationSettings.skypeId.rules,
    ...validationSettings.phone.rules
  ]
};
