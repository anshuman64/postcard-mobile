// Library Imports
import _  from 'lodash';

// Local Imports
import { CIRCLE_ACTION_TYPES } from '../actions/circle_actions';

//--------------------------------------------------------------------//

const DEFAULT_STATE = {
  circles: [],
};

const CirclesReducer = (state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type) {
    case CIRCLE_ACTION_TYPES.RECEIVE_CIRCLES:
      newState.circles = action.data.circles;

      return newState;
    case CIRCLE_ACTION_TYPES.RECEIVE_CIRCLE:
      newState.circles.push(action.data.circle);

      return newState;
    case CIRCLE_ACTION_TYPES.REMOVE_CIRCLE:
      _.remove(newState.circles, (circle) => {
        return circle.id === action.data.circle.id;
      });

      return newState;
    default:
      return state;
  }
};


//--------------------------------------------------------------------//

export default CirclesReducer;
