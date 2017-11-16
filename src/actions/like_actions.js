// Local Imports
import * as LikeAPI from '../api/like_api';

//--------------------------------------------------------------------//
//--------------------------------------------------------------------//


//     ____                _              _
//    / ___|___  _ __  ___| |_ __ _ _ __ | |_ ___
//    | |   / _ \| '_ \/ __| __/ _` | '_ \| __/ __|
//    | |__| (_) | | | \__ \ || (_| | | | | |_\__ \
//    \____\___/|_| |_|___/\__\__,_|_| |_|\__|___/


export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE  = 'REMOVE_LIKE';


//        _        _   _                ____                _
//       / \   ___| |_(_) ___  _ __    / ___|_ __ ___  __ _| |_ ___  _ __ ___
//      / _ \ / __| __| |/ _ \| '_ \  | |   | '__/ _ \/ _` | __/ _ \| '__/ __|
//     / ___ \ (__| |_| | (_) | | | | | |___| | |  __/ (_| | || (_) | |  \__ \
//    /_/   \_\___|\__|_|\___/|_| |_|  \____|_|  \___|\__,_|\__\___/|_|  |___/


export const receiveLike = (data) => {
  return { type: RECEIVE_LIKE, data: data };
};

export const removeLike = (data) => {
  return { type: REMOVE_LIKE, data: data };
};


//        _
//       / \   ___ _   _ _ __   ___
//      / _ \ / __| | | | '_ \ / __|
//     / ___ \\__ \ |_| | | | | (__
//    /_/   \_\___/\__, |_| |_|\___|
//                 |___/


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
