// Library Imports
import Pusher    from 'pusher-js/react-native';
import OneSignal from 'react-native-onesignal';

// Local Imports
import { ENV_TYPES, PUSHER_ENV_SETTING } from '../app_config';
import { getBaseUrl }                    from './api_utility';
import { pusherReceiveLike }             from '../actions/like_actions';
import * as FriendshipActions            from '../actions/friendship_actions';
import { pusherReceiveMessage }          from '../actions/message_actions';
import { getImages }                     from '../actions/image_actions';
import { pusherReceivePost }             from '../actions/post_actions';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

let pusher    = null;
let myChannel = null;

//--------------------------------------------------------------------//
// Helpers
//--------------------------------------------------------------------//

let getPusherApiKey = () => {
  let apiKey;

  if (PUSHER_ENV_SETTING === ENV_TYPES.PRODUCTION) {
    apiKey = '53d300091a1ab13e964b'; // key for insiya-production
  } else if (PUSHER_ENV_SETTING === ENV_TYPES.TEST) {
    apiKey = 'a6d1856c0f4314516333'; // key for insiya-staging
  } else {
    apiKey = 'd2f580733ffae972b477'; // key for insiya-development
  }

  return apiKey;
};

//--------------------------------------------------------------------//
// Pusher Interface
//--------------------------------------------------------------------//

// Enable pusher logging
Pusher.logToConsole = true;

export const setPusherClient = (authToken, clientId) => (dispatch) => {
  pusher = new Pusher(getPusherApiKey(), {
    authEndpoint: getBaseUrl() + '/pusher/auth',
    cluster: 'us2',
    encrypted: true,
    auth: {
      headers: {
        Authorization: 'Bearer ' + authToken,
      }
    }
  });

  myChannel = pusher.subscribe('private-' + clientId);

  // Used to send user data when adding friend by username
  myChannel.bind('create-friendship', (data) => {
    dispatch(FriendshipActions.pusherCreateFriendship({ user: data.user }));
    dispatch(getImages(data.user));
  });

  // NOTE: the 'user' sending the Pusher message is defined as us, the 'client'.
  myChannel.bind('receive-friendship', (data) => {
    dispatch(FriendshipActions.pusherRecieveFriendship({ user: data.client }));
    dispatch(getImages(data.client));
  });

  // NOTE: the 'user' sending the Pusher message is defined as us, the 'client'.
  myChannel.bind('receive-accepted-friendship', (data) => {
    dispatch(FriendshipActions.pusherReceiveAcceptedFriendship({ user: data.client }));
  });

  // NOTE: the 'user' sending the Pusher message is defined as us, the 'client'.
  myChannel.bind('destroy-friendship', (data) => {
    dispatch(FriendshipActions.pusherDestroyFriendship({ user: data.client, friendship: data.friendship }));
  });

  // NOTE: the 'user' sending the Pusher message is defined as us, the 'client'.
  myChannel.bind('receive-post', (data) => {
    dispatch(pusherReceivePost({ clientId: data.user.id, post: data.post }));
    dispatch(getImages(data.post));
  });

  // NOTE: the 'user' sending the Pusher message is defined as us, the 'client'.
  myChannel.bind('receive-message', (data) => {
    dispatch(pusherReceiveMessage({ convoId: data.client.id, message: data.message }));
    dispatch(getImages(data.message));
  });
}

//--------------------------------------------------------------------//
// OneSignal Interface
//--------------------------------------------------------------------//

// OneSignal options
OneSignal.inFocusDisplaying(0); // Disables notifications in-app
