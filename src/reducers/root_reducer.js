// Library Imports
import { combineReducers } from 'redux';

// Local Imports
import NavigationReducer from './navigation_reducer.js';
import UserReducer       from './user_reducer.js'
import PostsReducer      from './posts_reducer.js';
import PostsCacheReducer from './posts_cache_reducer.js';

//--------------------------------------------------------------------//


const RootReducer = combineReducers({
  nav:        NavigationReducer,
  user:       UserReducer,
  posts:      PostsReducer,
  postsCache: PostsCacheReducer
});


//--------------------------------------------------------------------//

export default RootReducer;
