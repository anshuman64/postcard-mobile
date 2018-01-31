// Library Imports
import _  from 'lodash';

// Local Imports
import { IMAGE_ACTION_TYPES } from '../actions/image_actions.js';

//--------------------------------------------------------------------//

const DEFAULT_STATE = {};

const ImageReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case IMAGE_ACTION_TYPES.RECEIVE_IMAGE:
      newState[action.data.key] = action.data.url;

      return newState;
    case IMAGE_ACTION_TYPES.RECEIVE_IMAGES:
      _.forEach(action.data, (imageObj) => {
        newState[imageObj.key] = imageObj.url;
      })

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
