// Library Imports
import _ from 'lodash';

// Local Imports
import { getFile }                 from '../utilities/file_utility';
import { MEDIUM_ACTION_TYPES }     from '../actions/medium_actions';
import { CLIENT_ACTION_TYPES }     from '../actions/client_actions';
import { FRIENDSHIP_ACTION_TYPES } from '../actions/friendship_actions';
import { POST_ACTION_TYPES }       from '../actions/post_actions';
import { MESSAGE_ACTION_TYPES }    from '../actions/message_actions';
import { GROUP_ACTION_TYPES }      from '../actions/group_actions';
import { BLOCK_ACTION_TYPES }      from '../actions/block_actions';

//--------------------------------------------------------------------//

/*
Data is in the form {
  mediumId1: {
    aws_path:    '2/messages/direct/24352j45kl-4235lhk4.jpg',
    mime_type:   'image/jpeg',
    height:      1600,
    width:       900,
    owner_id:    5,
    post_id:     6,
    message_id:  null,
    url:         'www.insiya-public.com/asdlkalsdjkf'
    lastUpdated: Date()
  },
  mediumId2: { ...
*/

const DEFAULT_STATE = {};


// Takes an array or single object and returns an array with extracted media
const extractMedia = (object) => {
  let media = [];

  let addMedium = (obj) => {
    // If the object is a message with a medium
    if (obj.medium) {
      obj.medium.url = getFile(obj.medium.aws_path);
      media.push(obj.medium);
    }

    // If the object is a post with media
    if (obj.media) {
      _.forEach(obj.media, (medium) => {
        medium.url = getFile(medium.aws_path);
        media.push(medium);
      })
    }

    // If the object is a user with an avatar
    if (obj.avatar) {
      obj.avatar.url = getFile(obj.avatar.aws_path);
      media.push(obj.avatar)
    }
  }

  if (Array.isArray(object)) {
    _.forEach(object, (obj) => {
      addMedium(obj);
    });
  } else {
    addMedium(object);
  }

  return media;
}

const MediaCacheReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  let checkAndUpdateMedia = (media) => {
    _.forEach(media, (medium) => {
      if (newState[medium.id] && newState[medium.id].lastUpdated) {
        let currentTime = new Date();
        let lastUpdate = newState[medium.id].lastUpdated;
        let minsDiff = (currentTime - lastUpdate) / (1000 * 60);

        if (minsDiff > 59) {
          medium.lastUpdated = new Date();
          newState[medium.id] = medium;
        }
      } else {
        medium.lastUpdated = new Date();
        newState[medium.id] = medium;
      }
    });
  }

  switch(action.type) {

    //--------------------------------------------------------------------//
    // Medium Actions
    //--------------------------------------------------------------------//

    case MEDIUM_ACTION_TYPES.RECEIVE_MEDIUM:
      checkAndUpdateMedia([action.data.medium]);

      return newState;

    //--------------------------------------------------------------------//
    // Client Actions
    //--------------------------------------------------------------------//

    case CLIENT_ACTION_TYPES.RECEIVE_CLIENT:
      media = extractMedia(action.data.client);
      checkAndUpdateMedia(media);

      return newState;

    //--------------------------------------------------------------------//
    // Friendship Actions
    //--------------------------------------------------------------------//

    case FRIENDSHIP_ACTION_TYPES.RECEIVE_FRIENDSHIPS:
      media = extractMedia(action.data.friends);
      checkAndUpdateMedia(media);

      return newState;
    case FRIENDSHIP_ACTION_TYPES.PUSHER_CREATE_FRIENDSHIP:
    case FRIENDSHIP_ACTION_TYPES.PUSHER_RECEIVE_FRIENDSHIP:
      media = extractMedia(action.data.user);
      checkAndUpdateMedia(media);

      return newState;

    //--------------------------------------------------------------------//
    // Post Actions
    //--------------------------------------------------------------------//

    case POST_ACTION_TYPES.RECEIVE_POSTS:
      media = extractMedia(action.data.posts);
      checkAndUpdateMedia(media);

      return newState;
    case POST_ACTION_TYPES.RECEIVE_POST:
    case POST_ACTION_TYPES.PUSHER_RECEIVE_POST:
      media = extractMedia(action.data.post);
      checkAndUpdateMedia(media);

      return newState;

    //--------------------------------------------------------------------//
    // Message Actions
    //--------------------------------------------------------------------//

    case MESSAGE_ACTION_TYPES.RECEIVE_CONVERSATIONS:
      _.forEach(action.data.groups, (group) => {
        media = extractMedia(group.users);
        checkAndUpdateMedia(media);
      });

      return newState;
    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGES:
      media = extractMedia(action.data.messages);
      checkAndUpdateMedia(media);

      return newState;
    case MESSAGE_ACTION_TYPES.RECEIVE_MESSAGE:
    case MESSAGE_ACTION_TYPES.PUSHER_RECEIVE_MESSAGE:
      media = extractMedia(action.data.message);
      checkAndUpdateMedia(media);

      return newState;

    //--------------------------------------------------------------------//
    // Other Actions
    //--------------------------------------------------------------------//

    case GROUP_ACTION_TYPES.RECEIVE_GROUP:
      media = extractMedia(action.data.group.users);
      checkAndUpdateMedia(media);

      return newState;
    case BLOCK_ACTION_TYPES.RECEIVE_BLOCKED_USERS:
      media = extractMedia(action.data.blockedUsers);
      checkAndUpdateMedia(media);

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default MediaCacheReducer;
