// Library Imports
import _  from 'lodash';

// Local Imports
import { GROUP_ACTION_TYPES } from '../actions/group_actions';

//--------------------------------------------------------------------//

/*
Data is in the form {
  -groupId1: {
    "id":         7,
    "owner_id":   4,
    "name":       "Most Awesome Group Ever!",
    "created_at": "2018-01-18T23:48:06.000Z",
    "updated_at": "2018-01-18T23:48:06.000Z",
  },
  groupId1: {...
*/
const DEFAULT_STATE = {};

const GroupsCacheReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case GROUP_ACTION_TYPES.RECEIVE_GROUPS:
      _.forEach(action.data.groups, (group) => {
        newState[-1 * group.id] = group; //WARNING/NOTE: using negative values for groups
      });

      debugger

      return newState;
    case GROUP_ACTION_TYPES.RECEIVE_GROUP:
      group = action.data.group;
      newState[-1 * group.id] = group;

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default GroupsCacheReducer;
