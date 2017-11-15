// Local Imports
import APIUtility from '../utilities/api_utility';

//--------------------------------------------------------------------//
//--------------------------------------------------------------------//


//     ___       _             __
//    |_ _|_ __ | |_ ___ _ __ / _| __ _  ___ ___
//    | || '_ \| __/ _ \ '__| |_ / _` |/ __/ _ \
//    | || | | | ||  __/ |  |  _| (_| | (_|  __/
//    |___|_| |_|\__\___|_|  |_|  \__,_|\___\___|


let getPosts = (queryParams) => {
  return APIUtility.get('/posts', queryParams);
};

let createPost = (payload) => {
  return APIUtility.post('/posts', payload);
};

let deletePost = (postId) => {
  return APIUtility.del('/posts/' + postId);
};

const PostAPI = {
  getPosts:   getPosts,
  createPost: createPost,
  deletePost: deletePost
};


//--------------------------------------------------------------------//
//--------------------------------------------------------------------//

export default PostAPI;
