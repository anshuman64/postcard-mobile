// Library Imports
import { createStore, applyMiddleware } from 'redux';

// Local Imports
import thunk       from '../middleware/thunk';
import RootReducer from '../reducers/root_reducer.js';

//--------------------------------------------------------------------//

const configureStore = (preloadedState = {}) => (
  createStore(RootReducer, preloadedState, applyMiddleware(thunk))
);

//--------------------------------------------------------------------//

export default configureStore;
