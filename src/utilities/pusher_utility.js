
import Pusher from 'pusher-js/react-native';

import { ENV_TYPES, PUSHER_ENV_SETTING } from '../app_config.js';
import { getBaseUrl }                    from './api_utility.js';
import { receiveUserLike }               from '../actions/like_actions.js';


// Enable pusher logging
Pusher.logToConsole = true;

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
// Interface
//--------------------------------------------------------------------//

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

  myChannel.bind('create-like', (data) => {
    dispatch(receiveUserLike);
  });
}
