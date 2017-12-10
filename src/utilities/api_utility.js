import * as _ from 'lodash';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


const BASE_URL = 'http://192.168.2.14:3000/api';
const HEADERS  = {
  'Accept':       'application/json',
  'Content-Type': 'application/json'
};


//--------------------------------------------------------------------//
// Helpers
//--------------------------------------------------------------------//


let getQueryString = (params) => {
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
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};


//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//


export const get = (authToken, path, queryParams) => {
  let url     = BASE_URL + path;
  let headers = _.merge({}, HEADERS);

  headers['Authorization'] = 'Bearer ' + authToken;

  if (queryParams) {
    url += getQueryString(queryParams);
  }

  return fetch(url, {
    method: 'GET',
    headers: headers
  }).then((response) => {
    return checkStatus(response);
  });
};

export const post = (authToken, path, payload) => {
  let url     = BASE_URL + path;
  let headers = _.merge({}, HEADERS);

  headers['Authorization'] = 'Bearer ' + authToken;

  return fetch(url, {
    method:  'POST',
    headers: headers,
    body:    JSON.stringify(payload)
  }).then((response) => {
    return checkStatus(response);
  });
};

export const put = (authToken, path, payload) => {
  let url     = BASE_URL + path;
  let headers = _.merge({}, HEADERS);

  headers['Authorization'] = 'Bearer ' + authToken;

  return fetch(url, {
    method:  'PUT',
    headers: headers,
    body:    JSON.stringify(payload)
  }).then((response) => {
    return checkStatus(response);
  });
};

export const del = (authToken, path) => {
  let url     = BASE_URL + path;
  let headers = _.merge({}, HEADERS);

  headers['Authorization'] = 'Bearer ' + authToken;

  return fetch(url, {
    method: 'DELETE',
    headers: headers
  }).then((response) => {
    return checkStatus(response);
  });
};
