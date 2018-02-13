// Library Imports
import Pusher    from 'pusher-js/react-native';
import OneSignal from 'react-native-onesignal';

// Local Imports
import { ENV_TYPES, PUSHER_ENV_SETTING } from '../app_config.js';
import { getBaseUrl }                    from './api_utility.js';
import { pusherReceiveLike }             from '../actions/like_actions.js';
import * as FriendshipActions            from '../actions/friendship_actions.js';
import { pusherReceiveMessage }          from '../actions/message_actions.js';
import { getImages }                      from '../actions/image_actions';
import { pusherReceivePost }             from '../actions/post_actions.js';

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

  myChannel.bind('receive-like', (data) => {
    dispatch(pusherReceiveLike({ client: data.client, user: data.user, like: data.like }));
  });

  myChannel.bind('create-friendship', (data) => {
    dispatch(FriendshipActions.pusherCreateFriendship({ client: data.client, user: data.user, friendship: data.friendship }));
    dispatch(getImages(data.user));
  });

  myChannel.bind('receive-friendship', (data) => {
    dispatch(FriendshipActions.pusherRecieveFriendship({ client: data.client, user: data.user, friendship: data.friendship }));
    dispatch(getImages(data.client));
  });

  myChannel.bind('receive-accepted-friendship', (data) => {
    dispatch(FriendshipActions.pusherReceiveAcceptedFriendship({ client: data.client, user: data.user, friendship: data.friendship }));
  });

  myChannel.bind('destroy-friendship', (data) => {
    dispatch(FriendshipActions.pusherDestroyFriendship({ client: data.client, user: data.user, friendship: data.friendship }));
  });

  myChannel.bind('receive-post', (data) => {
    dispatch(pusherReceivePost({ client: data.client, user: data.user, post: data.post }));
    dispatch(getImages(data.post));
  });

  myChannel.bind('receive-message', (data) => {
    dispatch(pusherReceiveMessage({ client: data.client, user: data.user, message: data.message }));
    dispatch(getImages(data.message));
  });
}

//--------------------------------------------------------------------//
// OneSignal Interface
//--------------------------------------------------------------------//

// OneSignal options
OneSignal.inFocusDisplaying(0); // Disables notifications in-app

export function onReceived(notification) {
  // console.log("Notification received: ", notification);
}

export function onOpened(openResult) {
  OneSignal.clearOneSignalNotifications(); // clears all notifications on Android when one is opened

  // console.log('Message: ', openResult.notification.payload.body);
  // console.log('Data: ', openResult.notification.payload.additionalData);
  // console.log('isActive: ', openResult.notification.isAppInFocus);
  // console.log('openResult: ', openResult);
}

export function onRegistered(notifData) {
  // console.log("Device had been registered for push notifications!", notifData);
}

export function onIds(device) {
  // console.log('Device info: ', device);
}
