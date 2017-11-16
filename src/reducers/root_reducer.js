// Library Imports
import { combineReducers } from 'redux';

// Local Imports
import PostsCacheReducer from './posts_cache_reducer';

//--------------------------------------------------------------------//
//--------------------------------------------------------------------//


const RootReducer = combineReducers({
  postsCache: PostsCacheReducer
});


//--------------------------------------------------------------------//
//--------------------------------------------------------------------//

export default RootReducer;
