export const DEFAULT_API_BASE_URL = 'https://ms-labs-be.herokuapp.com/service';
export const DEFAULT_API_USERS_ENDPOINT = `${DEFAULT_API_BASE_URL}/users`;

/* eslint-disable-next-line */
export const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const DEFAULT_USER_VALID_ID_PATHS = [ '_id', 'id' ];
export const DEFAULT_PAGINATION_QUERY = { page: 1, limit: 100 };