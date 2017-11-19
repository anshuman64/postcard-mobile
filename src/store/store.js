// Library Imports
import Redux from 'redux';

// Local Imports
import thunk       from '../middleware/thunk';
import RootReducer from '../reducers/root_reducer';

//--------------------------------------------------------------------//


const configureStore = (preloadedState = {}) => (
  Redux.createStore(RootReducer, preloadedState, Redux.applyMiddleware(thunk))
);


//--------------------------------------------------------------------//

export default configureStore;
