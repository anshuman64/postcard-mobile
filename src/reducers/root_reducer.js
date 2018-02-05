// Library Imports
import { combineReducers } from 'redux';

// Local Imports
import ClientReducer      from './client_reducer.js'
import PostsReducer       from './posts_reducer.js';
import PostsCacheReducer  from './posts_cache_reducer.js';
import FriendshipsReducer from './friendships_reducer.js';
import ImagesReducer      from './images_reducer.js';
import NavigationReducer  from './navigation_reducer.js';

//--------------------------------------------------------------------//


const RootReducer = combineReducers({
  client:        ClientReducer,
  posts:       PostsReducer,
  postsCache:  PostsCacheReducer,
  friendships: FriendshipsReducer,
  images:      ImagesReducer,
  navigation:  NavigationReducer
});


//--------------------------------------------------------------------//

export default RootReducer;
