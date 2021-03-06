// Library Imports
import _ from 'lodash';

// Local Imports
import { CLIENT_ACTION_TYPES }           from '../actions/client_actions';
import { POST_ACTION_TYPES, POST_TYPES } from '../actions/post_actions';
import { LIKE_ACTION_TYPES }             from '../actions/like_actions';
import { mergeSorted }                   from '../utilities/function_utility';

//--------------------------------------------------------------------//

/*
Data is in the form {
  clientId: {
    receivedPosts: { data: [], lastUpdated: null, isEnd: false },
    authoredPosts: { data: [], lastUpdated: null, isEnd: false },
    likedPosts:    { data: [], lastUpdated: null, isEnd: false },
  },
  userId2: { ...
*/

const DEFAULT_STATE = {};

const PostsReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {

    //--------------------------------------------------------------------//
    // Receive User Action
    //--------------------------------------------------------------------//

    // When a user logs in, instantiate blank objects in store for that userId
    case CLIENT_ACTION_TYPES.RECEIVE_CLIENT:
      clientId = action.data.client.id;

      newState[clientId] = newState[clientId] || {};

      _.forEach(POST_TYPES, (postTypes) => {
        newState[clientId][postTypes]             = newState[clientId][postTypes]             || {};
        newState[clientId][postTypes].data        = newState[clientId][postTypes].data        || [];
        newState[clientId][postTypes].lastUpdated = newState[clientId][postTypes].lastUpdated || new Date();
        newState[clientId][postTypes].isEnd       = newState[clientId][postTypes].isEnd       || false;
      })

      return newState;

    //--------------------------------------------------------------------//
    // Get and Refresh Post Actions
    //--------------------------------------------------------------------//

    // When new posts are received, push to the PostListItem
    // If < 10 posts are received, mark isEnd true
    case POST_ACTION_TYPES.RECEIVE_POSTS:
      postData = newState[action.data.userId][action.data.postType];

      if (action.data.posts.length < 10) {
        postData.isEnd = true;
      }

      if (action.data.posts.length > 0) {
        _.forEach(action.data.posts, (post) => {
          postData.data.push(post.id);
        });
      }

      return newState;
    // When refreshing posts, first make sure objects in store are instantiated
    // Update lastUpdated
    // If number of posts received is < 10, mark isEnd to true
    // Merge new posts with current posts
    case POST_ACTION_TYPES.REFRESH_POSTS:
      userId   = action.data.userId;
      postType = action.data.postType;

      // Make sure objects exist
      newState[userId] = newState[userId] || {};

      _.forEach(POST_TYPES, (postTypes) => {
        newState[userId][postTypes]      = newState[userId][postTypes] || {};
        newState[userId][postTypes].data = newState[userId][postTypes].data || [];
      })

      postData = newState[userId][postType];
      postData.lastUpdated = new Date();

      if (action.data.posts.length < 10) { // 10 = number of posts fetched
        postData.isEnd = true;
      } else {
        postData.isEnd = false;
      }

      if (action.data.posts.length > 0) {
        postData.data = mergeSorted(postData.data, action.data.posts.map(post => post.id));
      }

      return newState;

    //--------------------------------------------------------------------//
    // Create and Remove Post Actions
    //--------------------------------------------------------------------//

    // Add new post to beginning of AllPosts and AuthoredPosts when user creates a post
    case POST_ACTION_TYPES.RECEIVE_POST:
      clientId = action.data.clientId;
      postId = action.data.post.id;

      // Assumes that this case is only hit when the client creates a post
      newState[clientId][POST_TYPES.RECEIVED].data.unshift(postId);
      newState[clientId][POST_TYPES.AUTHORED].data.unshift(postId);

      return newState;
    // Remove post from AllPosts and AuthoredPosts when user deletes a post
    case POST_ACTION_TYPES.REMOVE_POST:
      clientId = action.data.clientId;
      postId = action.data.post.id;

      // Assumes that this case is only hit when the client removes their own post
      _.remove(newState[clientId][POST_TYPES.RECEIVED].data, (postsId) => {
        return postsId === postId;
      });

      _.remove(newState[clientId][POST_TYPES.AUTHORED].data, (postsId) => {
        return postsId === postId;
      });

      return newState;

    //--------------------------------------------------------------------//
    // Like Post Actions
    //--------------------------------------------------------------------//

    // TODO: add the liked post in the correct chronological spot
    // Adds post to beginning of LikedPosts when user likes a post
    case LIKE_ACTION_TYPES.RECEIVE_LIKE:
      clientId = action.data.clientId;
      postId = action.data.like.post_id;

      newState[clientId][POST_TYPES.LIKED].data.unshift(postId);

      return newState;
    // Remove post from LikedPosts when user unlikes a post
    case LIKE_ACTION_TYPES.REMOVE_LIKE:
      clientId = action.data.clientId;
      postId = action.data.like.post_id;

      _.remove(newState[clientId][POST_TYPES.LIKED].data, (postsId) => {
        return postsId === postId;
      });

      return newState;

    //--------------------------------------------------------------------//
    // Pusher Post Actions
    //--------------------------------------------------------------------//

    case POST_ACTION_TYPES.PUSHER_RECEIVE_POST:
      clientId = action.data.clientId;
      postId = action.data.post.id;

      newState[clientId][POST_TYPES.RECEIVED].data.unshift(postId);

      return newState;

    //--------------------------------------------------------------------//
    // Other Actions
    //--------------------------------------------------------------------//

    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default PostsReducer;
