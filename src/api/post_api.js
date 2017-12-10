// Local Imports
import * as APIUtility from '../utilities/api_utility';

//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

// TODO: Add new endpoints for liked/authored
export const getPosts = (queryParams, authToken) => {
  return APIUtility.get('/posts', queryParams, authToken);
};

export const createPost = (payload, authToken) => {
  return APIUtility.post('/posts', payload, authToken);
};

export const deletePost = (postId, authToken) => {
  return APIUtility.del('/posts/' + postId, authToken);
};
