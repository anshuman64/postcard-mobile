import { Alert } from 'react-native';
import _         from 'lodash';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

const BASE_URL        = 'http://192.168.2.27:3000/api';
// const BASE_URL        = 'http://insiya-test.us-east-1.elasticbeanstalk.com/api';
const DEFAULT_HEADERS = {
  'Accept':       'application/json',
  'Content-Type': 'application/json'
};


//--------------------------------------------------------------------//
// Helpers
//--------------------------------------------------------------------//


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


export const get = (authToken, path, queryParams) => {
  let requestConfig = {
    method:  'GET',
    headers: _.merge({ Authorization: 'Bearer ' + authToken }, DEFAULT_HEADERS)
  };

  let url = BASE_URL + path + getQueryString(queryParams);

  return callApi(url, requestConfig);
};

export const post = (authToken, path, payload) => {
  let requestConfig = {
    method:  'POST',
    headers: _.merge({ Authorization: 'Bearer ' + authToken }, DEFAULT_HEADERS),
    body:    JSON.stringify(payload)
  };

  let url = BASE_URL + path;

  return callApi(url, requestConfig);
};

export const put = (authToken, path, payload) => {
  let requestConfig = {
    method:  'PUT',
    headers: _.merge({ Authorization: 'Bearer ' + authToken }, DEFAULT_HEADERS),
    body:    JSON.stringify(payload)
  };

  let url = BASE_URL + path;

  return callApi(url, requestConfig);
};

export const del = (authToken, path) => {
  let requestConfig = {
    method:  'DELETE',
    headers: _.merge({ Authorization: 'Bearer ' + authToken }, DEFAULT_HEADERS)
  };

  let url = BASE_URL + path;

  return callApi(url, requestConfig);
};
