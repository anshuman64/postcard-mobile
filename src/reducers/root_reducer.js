// Library Imports
import { combineReducers } from 'redux';

// Local Imports
import ClientReducer      from './client_reducer.js'
import PostsReducer       from './posts_reducer.js';
import PostsCacheReducer  from './posts_cache_reducer.js';
import MessagesReducer    from './messages_reducer.js';
import UsersCacheReducer  from './users_cache_reducer.js';
import FriendshipsReducer from './friendships_reducer.js';
import BlocksReducer      from './blocks_reducer.js';
import ImagesCacheReducer from './images_cache_reducer.js';
import NavigationReducer  from './navigation_reducer.js';

//--------------------------------------------------------------------//

const RootReducer = combineReducers({
  client:      ClientReducer,
  posts:       PostsReducer,
  postsCache:  PostsCacheReducer,
  messages:    MessagesReducer,
  usersCache:  UsersCacheReducer,
  friendships: FriendshipsReducer,
  imagesCache: ImagesCacheReducer,
  blocks:      BlocksReducer,
  navigation:  NavigationReducer
});

//--------------------------------------------------------------------//

export default RootReducer;
