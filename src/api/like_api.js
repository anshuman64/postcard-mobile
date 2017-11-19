// Local Imports
import * as APIUtility from '../utilities/api_utility';

//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//


export const createLike = (payload) => {
  return APIUtility.post('/likes', payload);
};

export const deleteLike = (userId, postId) => {
  return APIUtility.del('/likes/' + userId + postId);
};
