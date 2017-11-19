//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


// TODO: configure all ENV variables

const BASE_URL = 'http://localhost:3000';
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


export const get = (path, queryParams) => {
  let url = BASE_URL + path;

  if (queryParams) {
    url += getQueryString(queryParams);
  }

  return fetch(url).then((response) => {
    return checkStatus(response);
  });
};

export const post = (path, payload) => {
  let url = BASE_URL + path;

  return fetch(url, {
    method:  'POST',
    headers: HEADERS,
    body:    JSON.stringify(payload)
  }).then((response) => {
    return checkStatus(response);
  });
};

export const put = (path, payload) => {
  let url = BASE_URL + path;

  return fetch(url, {
    method:  'PUT',
    headers: HEADERS,
    body:    JSON.stringify(payload)
  }).then((response) => {
    return checkStatus(response);
  });
};

export const del = (path) => {
  let url = BASE_URL + path;

  return fetch(url, {
    method: 'DELETE'
  }).then((response) => {
    return checkStatus(response);
  });
};
