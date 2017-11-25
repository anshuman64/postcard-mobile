// Library Imports
import { combineReducers } from 'redux';

// Local Imports
import nav from './navigation_reducer.js';
import PostsReducer      from './posts_reducer.js';
import PostsCacheReducer from './posts_cache_reducer.js';

//--------------------------------------------------------------------//


const RootReducer = combineReducers({
  nav:        nav,
  posts:      PostsReducer,
  postsCache: PostsCacheReducer
});


//--------------------------------------------------------------------//

export default RootReducer;
