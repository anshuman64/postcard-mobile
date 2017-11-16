// Local Imports
import * as PostAPI from '../api/post_api';

//--------------------------------------------------------------------//
//--------------------------------------------------------------------//


//     ____                _              _
//    / ___|___  _ __  ___| |_ __ _ _ __ | |_ ___
//    | |   / _ \| '_ \/ __| __/ _` | '_ \| __/ __|
//    | |__| (_) | | | \__ \ || (_| | | | | |_\__ \
//    \____\___/|_| |_|___/\__\__,_|_| |_|\__|___/


export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST  = 'RECEIVE_POST';
export const REMOVE_POST   = 'REMOVE_POST';


//        _        _   _                ____                _
//       / \   ___| |_(_) ___  _ __    / ___|_ __ ___  __ _| |_ ___  _ __ ___
//      / _ \ / __| __| |/ _ \| '_ \  | |   | '__/ _ \/ _` | __/ _ \| '__/ __|
//     / ___ \ (__| |_| | (_) | | | | | |___| | |  __/ (_| | || (_) | |  \__ \
//    /_/   \_\___|\__|_|\___/|_| |_|  \____|_|  \___|\__,_|\__\___/|_|  |___/


export const receivePosts = (data) => {
  return { type: RECEIVE_POSTS, data: data };
};

export const receivePost = (data) => {
  return { type: RECEIVE_POST, data: data };
};

export const removePost = (data) => {
  return { type: REMOVE_POST, data: data };
};


//        _
//       / \   ___ _   _ _ __   ___
//      / _ \ / __| | | | '_ \ / __|
//     / ___ \\__ \ |_| | | | | (__
//    /_/   \_\___/\__, |_| |_|\___|
//                 |___/


export const getPosts = (queryParams) => (dispatch) => {
  return PostAPI.getPosts(queryParams).then((posts) => {
    dispatch(receivePosts(posts));
  });
};

export const createPost = (post) => (dispatch) => {
  return PostAPI.createPost(post).then((newPost) => {
    dispatch(receivePost(newPost));
  });
};

export const deletePost = (postId) => (dispatch) => {
  return PostAPI.deletePost(postId).then((deletedPost) => {
    dispatch(removePost(deletedPost));
  });
};
