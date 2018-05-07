// Library Imports
import _ from 'lodash';

// Local Imports
import { POST_ACTION_TYPES }       from '../actions/post_actions';
import { FRIENDSHIP_ACTION_TYPES } from '../actions/friendship_actions';
import { MESSAGE_ACTION_TYPES }    from '../actions/message_actions';
import { LIKE_ACTION_TYPES }       from '../actions/like_actions';
import { FLAG_ACTION_TYPES }       from '../actions/flag_actions';

//--------------------------------------------------------------------//

/*
Data is in the form {
  postId1: {
    id:                        30,
    body:                      hello world!,
    author_id:                 1,
    media:                     [{url: imagePath1, type: PHOTO, owner_id: 1, post_id: 30}, ...],
    created_at:                2018-01-18T23:48:06.000Z,
    updated_at:                2018-01-18T23:48:06.000Z,
    num_likes:                 0,
    is_liked_by_client:        false,
    is_flagged_by_client:      false,
    media:                     [{mediaObj1, mediaObj2}],
    author:                    {userObj},
    recipient_ids:             [1,3,-5,-6,7],
    recipient_ids_with_client: [1,-5],
  },
  postId2: {...
*/

const DEFAULT_STATE = {};

const PostsCacheReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  let initializePost = (post) => {
    newState[post.id]                           = post;
    newState[post.id].recipient_ids             = post.group_recipient_ids.map((x) => -1 * x).concat(post.user_recipient_ids);
    newState[post.id].recipient_ids_with_client = post.group_ids_with_client.map((x) => -1 * x).concat(post.user_ids_with_client);
  }

  switch(action.type) {

    //--------------------------------------------------------------------//
    // Receive and Refresh Post Actions
    //--------------------------------------------------------------------//

    // When receiving or refreshing posts, update the store with new post information
    case POST_ACTION_TYPES.RECEIVE_POSTS:
    case POST_ACTION_TYPES.REFRESH_POSTS:
      _.forEach(action.data.posts, (post) => {
        initializePost(post);
      });

      return newState;

    //--------------------------------------------------------------------//
    // Create Post Actions
    //--------------------------------------------------------------------//

    // When creating a new post, update the store with the new post
    case POST_ACTION_TYPES.RECEIVE_POST:
      post = action.data.post;
      initializePost(post);

      return newState;

  //--------------------------------------------------------------------//
  // Like Post Actions
  //--------------------------------------------------------------------//

    // When liking a post, increment the likes by 1 and set is_liked_by_client to true
    case LIKE_ACTION_TYPES.RECEIVE_LIKE:
      postToUpdate = newState[action.data.like.post_id];

      postToUpdate.num_likes++;
      postToUpdate.is_liked_by_client = true;

      return newState;
    // When unliking a post, decrement the likes by 1 and set is_liked_by_client to false
    case LIKE_ACTION_TYPES.REMOVE_LIKE:
      postToUpdate = newState[action.data.like.post_id];

      postToUpdate.num_likes--;
      postToUpdate.is_liked_by_client = false;

      return newState;

    //--------------------------------------------------------------------//
    // Flag Post Actions
    //--------------------------------------------------------------------//

    // When flagging a post, set is_flagged_by_client to true
    case FLAG_ACTION_TYPES.RECEIVE_FLAG:
      newState[action.data.flag.post_id].is_flagged_by_client = true;

      return newState;
    // When unflagging a post, set is_flagged_by_client to false
    case FLAG_ACTION_TYPES.REMOVE_FLAG:
      newState[action.data.flag.post_id].is_flagged_by_client = false;

      return newState;

    //--------------------------------------------------------------------//
    // Pusher Actions
    //--------------------------------------------------------------------//

    case POST_ACTION_TYPES.PUSHER_RECEIVE_POST:
      post = action.data.post;
      initializePost(post);

      return newState;

    //--------------------------------------------------------------------//
    // Message Actions
    //--------------------------------------------------------------------//

    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGES:
      posts = [];

      _.forEach(action.data.messages, (message) => {
        if (message.post) {
          posts.push(message.post);
        }
      });

      _.forEach(posts, (post) => {
        initializePost(post);
      });

      return newState;

    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default PostsCacheReducer;
