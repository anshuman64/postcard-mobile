//     ____                _              _
//    / ___|___  _ __  ___| |_ __ _ _ __ | |_ ___
//    | |   / _ \| '_ \/ __| __/ _` | '_ \| __/ __|
//    | |__| (_) | | | \__ \ || (_| | | | | |_\__ \
//    \____\___/|_| |_|___/\__\__,_|_| |_|\__|___/


const BASE_URL = 'http://localhost:3000/';
const HEADERS  = {
  'Accept':       'application/json',
  'Content-Type': 'application/json'
};


//     _   _      _
//    | | | | ___| |_ __   ___ _ __ ___
//    | |_| |/ _ \ | '_ \ / _ \ '__/ __|
//    |  _  |  __/ | |_) |  __/ |  \__ \
//    |_| |_|\___|_| .__/ \___|_|  |___/
//                |_|


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


//     ___       _             __
//    |_ _|_ __ | |_ ___ _ __ / _| __ _  ___ ___
//    | || '_ \| __/ _ \ '__| |_ / _` |/ __/ _ \
//    | || | | | ||  __/ |  |  _| (_| | (_|  __/
//    |___|_| |_|\__\___|_|  |_|  \__,_|\___\___|


let get = (path, queryParams) => {
  let url = BASE_URL + path;

  if (queryParams) {
    url += getQueryString(queryParams);
  }

  return fetch(url).then((response) => {
    return checkStatus(response);
  });
};

let post = (path, payload) => {
  let url = BASE_URL + path;

  return fetch(url, {
    method:  'POST',
    headers: HEADERS,
    body:    JSON.stringify(payload)
  }).then((response) => {
    return checkStatus(response);
  });
};

let put = (path, payload) => {
  let url = BASE_URL + path;

  return fetch(url, {
    method:  'PUT',
    headers: HEADERS,
    body:    JSON.stringify(payload)
  }).then((response) => {
    return checkStatus(response);
  });
};

let del = (path) => {
  let url = BASE_URL + path;

  return fetch(url, {
    method: 'DELETE'
  }).then((response) => {
    return checkStatus(response);
  });
};

const ApiUtility = {
  get:  get,
  post: post,
  put:  put,
  del:  del
};


//--------------------------------------------------------------------//

export default ApiUtility;
