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

const ImagesReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case IMAGE_ACTION_TYPES.RECEIVE_IMAGE:
      if (newState[action.data.key] && newState[action.data.key].lastUpdated) {
        let currentTime = new Date();
        let lastUpdate = newState[action.data.key].lastUpdated;
        let minsDiff = (currentTime - lastUpdate) / (1000 * 60);

        if (minsDiff < 59) {
          return newState;
        }
      }

      newState[action.data.key] = {
        url: action.data.url,
        lastUpdated: new Date()
      }

      return newState;
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

export default ImagesReducer;
