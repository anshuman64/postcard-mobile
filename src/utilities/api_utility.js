// Library Imports
import { Alert } from 'react-native';
import _         from 'lodash';

// Local Imports
import { ENV_TYPES, GLOBAL_ENV_SETTING } from './app_utility.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

const BASE_URL        = getBaseUrl();
const DEFAULT_HEADERS = {
  'Accept':       'application/json',
  'Content-Type': 'application/json'
};


//--------------------------------------------------------------------//
// Helpers
//--------------------------------------------------------------------//

// Chooses right API url based on environment setting
function getBaseUrl() {
  if (GLOBAL_ENV_SETTING === ENV_TYPES.PRODUCTION) {
    return 'https://api.insiya.io/api';
  } else if (GLOBAL_ENV_SETTING === ENV_TYPES.TEST) {
    return 'http://insiya-test.us-east-1.elasticbeanstalk.com/api';
  } else {
    return 'http://192.168.2.12:3000/api';
  }
}

// Turns params into a URI string
let getQueryString = (params) => {
  if (!params) {
    return '';
  }

  let paramList = [];

  for (let i in params) {
    if (params.hasOwnProperty(i)) {
      paramList.push(encodeURIComponent(i) + "=" + encodeURIComponent(params[i]));
    }
  }

  return '?' + paramList.join("&");
};

// Checks status of an API response and return either the body or an error
// If there's no status (no internet connection), returns.
let checkStatus = (response) => {
  if (!response.status) {
    return;
  }

  let body;
  try {
    body = JSON.parse(response._bodyText);
  } catch (e) {
    body = response._bodyText;
  }

  if (response.status >= 200 && response.status < 300) {
    return JSON.parse(response._bodyText);
  } else {
    let error = new Error(body);
    error.status = response.status;
    throw error;
  }
};

// Calls API and checks status
let callApi = (url, requestConfig) => {
  return fetch(url, requestConfig)
    .then((response) => {
      return checkStatus(response);
    })
    .catch((error) => {
      if (!error.status) {
        error.description = 'No internet connection'
      }

      throw error;
    });
};


//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

// GET request to API. Returns status.
export const get = (authToken, path, queryParams) => {
  let requestConfig = {
    method:  'GET',
    headers: _.merge({ Authorization: 'Bearer ' + authToken }, DEFAULT_HEADERS)
  };

  let url = BASE_URL + path + getQueryString(queryParams);

  return callApi(url, requestConfig);
};

// POST request to API. Returns status.
export const post = (authToken, path, payload) => {
  let requestConfig = {
    method:  'POST',
    headers: _.merge({ Authorization: 'Bearer ' + authToken }, DEFAULT_HEADERS),
    body:    JSON.stringify(payload)
  };

  let url = BASE_URL + path;

  return callApi(url, requestConfig);
};

// PUT request to API. Returns status.
export const put = (authToken, path, payload) => {
  let requestConfig = {
    method:  'PUT',
    headers: _.merge({ Authorization: 'Bearer ' + authToken }, DEFAULT_HEADERS),
    body:    JSON.stringify(payload)
  };

  let url = BASE_URL + path;

  return callApi(url, requestConfig);
};

// DEL request to API. Returns status.
export const del = (authToken, path) => {
  let requestConfig = {
    method:  'DELETE',
    headers: _.merge({ Authorization: 'Bearer ' + authToken }, DEFAULT_HEADERS)
  };

  let url = BASE_URL + path;

  return callApi(url, requestConfig);
};
