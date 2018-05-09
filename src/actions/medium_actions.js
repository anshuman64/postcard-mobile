// Library Imports
import _ from 'lodash';

// Local Imports
import { refreshAuthToken } from './client_actions';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const MEDIUM_ACTION_TYPES = {
  RECEIVE_MEDIUM: 'RECEIVE_MEDIUM',
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// media (array): array of photo and video urls for caching
export const receiveMedium = (data) => {
  return { type: MEDIUM_ACTION_TYPES.RECEIVE_MEDIUM, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//

export const refreshCredsAndGetMedium = (firebaseUserObj, medium) => (dispatch) => {
  dispatch(refreshAuthToken(firebaseUserObj))
    .then(() => {
      dispatch(receiveMedium({ medium: medium }));
    })
    .catch((error) => {
      if (error.message === 'Token refresh was in progress') {
        dispatch(refreshCredsAndGetMedium(firebaseUserObj, medium));
      }
    });
}
