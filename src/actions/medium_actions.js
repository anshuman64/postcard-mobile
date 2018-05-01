// Library Imports
import _ from 'lodash';

// Local Imports
import * as FileUtility     from '../utilities/file_utility';
import { refreshAuthToken } from './client_actions';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const MEDIUM_ACTION_TYPES = {
  RECEIVE_MEDIA: 'RECEIVE_MEDIA',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// media (array): array of photo and video urls for caching
export const receiveMedia = (data) => {
  return { type: MEDIUM_ACTION_TYPES.RECEIVE_MEDIA, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//


// TODO: fix this
export const refreshCredsAndGetImage = (firebaseUserObj, avatarUrl) => (dispatch) => {
  dispatch(refreshAuthToken(firebaseUserObj))
    .then(() => {
      dispatch(getMedia(avatarUrl));
    })
}
