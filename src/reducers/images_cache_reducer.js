// Library Imports
import _ from 'lodash';

// Local Imports
import { MEDIUM_ACTION_TYPES } from '../actions/medium_actions';

//--------------------------------------------------------------------//

/*
Data is in the form {
  mediumPath1: {
    url:         string,
    type:        'PHOTO',
    lastUpdated: Date()
  },
  mediumPath2: { ...
*/

const DEFAULT_STATE = {};

const MediaCacheReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case MEDIUM_ACTION_TYPES.RECEIVE_MEDIA:
      let updateMedium = (medium) => {
        newState[medium.key] = {
          url:  medium.url,
          type: medium.type,
          lastUpdated: new Date()
        }
      }

      _.forEach(action.data.media, (mediumObj) => {
        if (newState[mediumObj.key] && newState[mediumObj.key].lastUpdated) {
          let currentTime = new Date();
          let lastUpdate = newState[mediumObj.key].lastUpdated;
          let minsDiff = (currentTime - lastUpdate) / (1000 * 60);

          if (minsDiff > 59) {
            updateMedium(mediumObj);
          }
        } else {
          updateMedium(mediumObj);
        }
      });

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default MediaCacheReducer;
