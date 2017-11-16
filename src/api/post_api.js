// Local Imports
import * as APIUtility from '../utilities/api_utility';

//--------------------------------------------------------------------//
//--------------------------------------------------------------------//


//     ___       _             __
//    |_ _|_ __ | |_ ___ _ __ / _| __ _  ___ ___
//    | || '_ \| __/ _ \ '__| |_ / _` |/ __/ _ \
//    | || | | | ||  __/ |  |  _| (_| | (_|  __/
//    |___|_| |_|\__\___|_|  |_|  \__,_|\___\___|


export const getPosts = (queryParams) => {
  return APIUtility.get('/posts', queryParams);
};

export const createPost = (payload) => {
  return APIUtility.post('/posts', payload);
};

export const deletePost = (postId) => {
  return APIUtility.del('/posts/' + postId);
};
