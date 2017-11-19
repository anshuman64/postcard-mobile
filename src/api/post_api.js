// Local Imports
import * as APIUtility from '../utilities/api_utility';

//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//


export const getPosts = (queryParams) => {
  return APIUtility.get('/posts', queryParams);
};

export const createPost = (payload) => {
  return APIUtility.post('/posts', payload);
};

export const deletePost = (postId) => {
  return APIUtility.del('/posts/' + postId);
};
