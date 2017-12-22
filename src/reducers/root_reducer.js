// Library Imports
import { combineReducers } from 'redux';

// Local Imports
import UserReducer       from './user_reducer.js'
import PostsReducer      from './posts_reducer.js';
import PostsCacheReducer from './posts_cache_reducer.js';
import NavigationReducer from './navigation_reducer.js';

//--------------------------------------------------------------------//


const RootReducer = combineReducers({
  user:       UserReducer,
  posts:      PostsReducer,
  postsCache: PostsCacheReducer,
  navigation: NavigationReducer
});


//--------------------------------------------------------------------//

export default RootReducer;
