// Local Imports
import * as APIUtility from '../utilities/api_utility.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


export const LIKE_ACTION_TYPES = {
  RECEIVE_LIKE: 'RECEIVE_LIKE',
  REMOVE_LIKE:  'REMOVE_LIKE'
};


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//


export const receiveLike = (data) => {
  return { type: LIKE_ACTION_TYPES.RECEIVE_LIKE, data: data };
};

export const removeLike = (data) => {
  return { type: LIKE_ACTION_TYPES.REMOVE_LIKE, data: data };
};


//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//


export const createLike = (authToken, likeObj) => (dispatch) => {
  return APIUtility.post(authToken, '/likes', likeObj)
    .then((newLike) => {
      dispatch(receiveLike(newLike));
    })
    .catch((error) => {
      if (!error.description) {
        error.description = 'POST like failed'
      }

      throw error;
    });
};

export const deleteLike = (authToken, postId) => (dispatch) => {
  return APIUtility.del(authToken, '/likes/' + postId)
    .then((deletedLike) => {
      dispatch(removeLike(deletedLike));
    })
    .catch((error) => {
      if (!error.description) {
        error.description = 'DEL like failed'
      }

      throw error;
    });
};
