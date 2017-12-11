import * as _ from 'lodash';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


const BASE_URL         = 'http://192.168.2.2:3000/api';
const DEFAULT_HEADERS  = {
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
  if (response.status >= 200 && response.status < 300) {
    return response._bodyText;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

let callApi = (url, requestConfig) => {
  return fetch(url, requestConfig)
    .then((response) => {
      return checkStatus(response);
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

  return callApi(BASE_URL + path + getQueryString(queryParams), requestConfig);
};

export const post = (authToken, path, payload) => {
  let requestConfig = {
    method:  'POST',
    headers: _.merge({ Authorization: 'Bearer ' + authToken }, DEFAULT_HEADERS),
    body:    JSON.stringify(payload)
  };

  return callApi(BASE_URL + path, requestConfig);
};

export const put = (authToken, path, payload) => {
  let requestConfig = {
    method:  'PUT',
    headers: _.merge({ Authorization: 'Bearer ' + authToken }, DEFAULT_HEADERS),
    body:    JSON.stringify(payload)
  };

  return callApi(BASE_URL + path, requestConfig);
};

export const del = (authToken, path) => {
  let requestConfig = {
    method:  'DELETE',
    headers: _.merge({ Authorization: 'Bearer ' + authToken }, DEFAULT_HEADERS)
  };

  return callApi(BASE_URL + path, requestConfig);
};
