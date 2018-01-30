// Library Imports
import { combineReducers } from 'redux';

// Local Imports
import UserReducer       from './user_reducer.js'
import PostsReducer      from './posts_reducer.js';
import PostsCacheReducer from './posts_cache_reducer.js';
import ImageReducer      from './image_reducer.js';
import NavigationReducer from './navigation_reducer.js';

//--------------------------------------------------------------------//


const RootReducer = combineReducers({
  user:       UserReducer,
  posts:      PostsReducer,
  postsCache: PostsCacheReducer,
  images:     ImageReducer,
  navigation: NavigationReducer
});


//--------------------------------------------------------------------//

export default RootReducer;
