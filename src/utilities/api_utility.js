let checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

let get = (url, queryParams) => {
  // TODO: convert queryParams

  return fetch(url)
    .then((response) => {
      return checkStatus(response);
    });
};

let post = (url) => {

};

let put = (url) => {

};

let del = (url) => {

};

const ApiUtility = {
  get:  get,
  post: post,
  put:  put,
  del:  del
};

//--------------------------------------------------------------------//

export default ApiUtility;
