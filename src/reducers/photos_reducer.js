// Library Imports
import _ from 'lodash';

// Local Imports
import { IMAGE_ACTION_TYPES } from '../actions/image_actions';

//--------------------------------------------------------------------//

const DEFAULT_STATE = {
  photos: []
};

const PhotosReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case IMAGE_ACTION_TYPES.RECEIVE_PHOTOS:
      newState.photos = action.data.photos;

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default PhotosReducer;
