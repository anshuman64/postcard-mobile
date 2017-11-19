// Library Imports
import Redux from 'redux';

// Local Imports
import PostsReducer      from './posts_reducer';
import PostsCacheReducer from './posts_cache_reducer';

//--------------------------------------------------------------------//


const RootReducer = Redux.combineReducers({
  posts:      PostsReducer,
  postsCache: PostsCacheReducer
});


//--------------------------------------------------------------------//

export default RootReducer;
