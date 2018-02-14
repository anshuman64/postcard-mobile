// Library Imports
import _  from 'lodash';

// Local Imports
import { IMAGE_ACTION_TYPES } from '../actions/image_actions.js';

//--------------------------------------------------------------------//

/* Data is in the form {
 *   imagePath1: {
 *     url:         string,
 *     lastUpdated: Date()
 *   },
 *   imagePath2: { ...
 */

const DEFAULT_STATE = {};

const ImagesCacheReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case IMAGE_ACTION_TYPES.RECEIVE_IMAGES:
      let updateImage = (image) => {
        newState[image.key] = {
          url: image.url,
          lastUpdated: new Date()
        }
      }

      _.forEach(action.data, (imageObj) => {
        if (newState[imageObj.key] && newState[imageObj.key].lastUpdated) {
          let currentTime = new Date();
          let lastUpdate = newState[imageObj.key].lastUpdated;
          let minsDiff = (currentTime - lastUpdate) / (1000 * 60);

          if (minsDiff > 59) {
            updateImage(imageObj);
          }
        } else {
          updateImage(imageObj);
        }
      })

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default ImagesCacheReducer;
