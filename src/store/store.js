// Library Imports
import { createStore, applyMiddleware } from 'redux';

// Local Imports
import { thunk }                        from '../middleware/thunk';
import RootReducer                      from '../reducers/root_reducer';

//--------------------------------------------------------------------//


const configureStore = (preloadedState = {}) => (
  createStore(RootReducer, preloadedState, applyMiddleware(thunk))
);

store = configureStore();

//--------------------------------------------------------------------//

export default store;
