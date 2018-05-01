// Library Imports
import { combineReducers } from 'redux';

// Local Imports
import ClientReducer        from './client_reducer.js'
import PostsReducer         from './posts_reducer';
import PostsCacheReducer    from './posts_cache_reducer';
import MessagesReducer      from './messages_reducer';
import UsersCacheReducer    from './users_cache_reducer';
import FriendshipsReducer   from './friendships_reducer';
import BlocksReducer        from './blocks_reducer';
import CirclesReducer       from './circles_reducer';
import ConversationsReducer from './conversations_reducer';
import GroupsCacheReducer   from './groups_cache_reducer';
import ContactsReducer      from './contacts_reducer';
import ContactsCacheReducer from './contacts_cache_reducer';
import MediaCacheReducer    from './media_cache_reducer';
import NavigationReducer    from './navigation_reducer';

//--------------------------------------------------------------------//

const RootReducer = combineReducers({
  client:        ClientReducer,
  posts:         PostsReducer,
  postsCache:    PostsCacheReducer,
  messages:      MessagesReducer,
  usersCache:    UsersCacheReducer,
  friendships:   FriendshipsReducer,
  mediaCache:    MediaCacheReducer,
  blocks:        BlocksReducer,
  circles:       CirclesReducer,
  conversations: ConversationsReducer,
  groupsCache:   GroupsCacheReducer,
  contacts:      ContactsReducer,
  contactsCache: ContactsCacheReducer,
  navigation:    NavigationReducer
});

//--------------------------------------------------------------------//

export default RootReducer;
