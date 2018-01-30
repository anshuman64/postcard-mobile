// Library Imports
import _  from 'lodash';

// Local Imports
import { IMAGE_ACTION_TYPES } from '../actions/image_actions.js';

//--------------------------------------------------------------------//

/* Data is in the form {
 *   imageKey1: {
 *      url:         string,
 *      lastUpdated: Date
 *  },
 *   imageKey2: {...
 */
const DEFAULT_STATE = {};

const ImageReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    // When an image is downloaded from S3, update the url and lastUpdated
    case IMAGE_ACTION_TYPES.RECEIVE_IMAGE:
      newState[action.data.key] = {
        url:         action.data.signedUrl,
        lastUpdated: new Date()
      };

      return newState;
    case IMAGE_ACTION_TYPES.DELETE_IMAGE:
      _.remove(newState, (keys) => {
        return keys === action.data.key;
      });

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default ImageReducer;
