// Library Imports
import { combineReducers } from 'redux';

// Local Imports
import PostsReducer      from './posts_reducer';
import PostsCacheReducer from './posts_cache_reducer';

//--------------------------------------------------------------------//


const RootReducer = combineReducers({
  posts:      PostsReducer,
  postsCache: PostsCacheReducer
});


//--------------------------------------------------------------------//

export default RootReducer;
