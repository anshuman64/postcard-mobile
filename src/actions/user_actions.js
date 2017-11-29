// Library Imports
import firebase from 'react-native-firebase';

//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT  = 'SIGN_OUT';


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//


export const signIn = (data) => {
  return { type: SIGN_IN, data: data };
};

export const signOut = (data) => {
  return { type: SIGN_OUT, data: data };
};


//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//


export const createLike = (like) => (dispatch) => {
  return LikeAPI.createLike(like).then((newLike) => {
    dispatch(receiveLike(newLike));
  });
};

export const deleteLike = (userId, postId) => (dispatch) => {
  return LikeAPI.deleteLike(userId, postId).then((deletedLike) => {
    dispatch(removeLike(deletedLike));
  });
};
