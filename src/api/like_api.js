// Local Imports
import * as APIUtility from '../utilities/api_utility';

//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//


export const createLike = (payload) => {
  return APIUtility.post('/likes', payload);
};

export const deleteLike = (likeId) => {
  return APIUtility.del('/likes/' + likeId);
};
