// Library Imports
import _ from 'lodash';

// Local Imports
import { ENV_TYPES, SERVER_ENV_SETTING } from '../app_config';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


const DEFAULT_HEADERS = {
  'Accept':       'application/json',
  'Content-Type': 'application/json'
};

//--------------------------------------------------------------------//
// Helpers
//--------------------------------------------------------------------//

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

// Calls API, checks status, and returns response or error
let callApi = (url, requestConfig) => {
  return fetch(url, requestConfig)
    .then((response) => {
      return response.json()
        .then((responseJson) =>{
          if (response.ok) {
            return responseJson;
          } else {
            let error = new Error(responseJson);
            error.status = response.status;
            throw error;
          }
        });
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

// Chooses right API url based on environment setting
export const getBaseUrl = () => {
  if (SERVER_ENV_SETTING === ENV_TYPES.PRODUCTION) {
    return 'https://api.insiya.io/api';
  } else if (SERVER_ENV_SETTING === ENV_TYPES.TEST) {
    return 'http://insiya-production-server-2.us-east-1.elasticbeanstalk.com/api';
  } else {
    return 'http://192.168.2.11:3000/api';
  }
};

// GET request to API. Returns status.
export const get = (authToken, path, queryParams) => {
  let requestConfig = {
    method:  'GET',
    headers: _.merge({ Authorization: 'Bearer ' + authToken }, DEFAULT_HEADERS)
  };

  let url = getBaseUrl() + path + getQueryString(queryParams);

  return callApi(url, requestConfig);
};

// POST request to API. Returns status.
export const post = (authToken, path, payload) => {
  let requestConfig = {
    method:  'POST',
    headers: _.merge({ Authorization: 'Bearer ' + authToken }, DEFAULT_HEADERS),
    body:    JSON.stringify(payload)
  };

  let url = getBaseUrl() + path;

  return callApi(url, requestConfig);
};

// PUT request to API. Returns status.
export const put = (authToken, path, payload) => {
  let requestConfig = {
    method:  'PUT',
    headers: _.merge({ Authorization: 'Bearer ' + authToken }, DEFAULT_HEADERS),
    body:    JSON.stringify(payload)
  };

  let url = getBaseUrl() + path;

  return callApi(url, requestConfig);
};

// DEL request to API. Returns status.
export const del = (authToken, path) => {
  let requestConfig = {
    method:  'DELETE',
    headers: _.merge({ Authorization: 'Bearer ' + authToken }, DEFAULT_HEADERS)
  };

  let url = getBaseUrl() + path;

  return callApi(url, requestConfig);
};
