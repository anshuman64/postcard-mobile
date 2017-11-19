// Local Imports
import * as LikeAPI from '../api/like_api';

//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE  = 'REMOVE_LIKE';


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//


export const receiveLike = (data) => {
  return { type: RECEIVE_LIKE, data: data };
};

export const removeLike = (data) => {
  return { type: REMOVE_LIKE, data: data };
};


//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//


export const createLike = (like) => (dispatch) => {
  return LikeAPI.createLike(like).then((newLike) => {
    dispatch(receiveLike(newLike));
  });
};

export const deleteLike = (likeId) => (dispatch) => {
  return LikeAPI.deleteLike(likeId).then((deletedLike) => {
    dispatch(removeLike(deletedLike));
  });
};
