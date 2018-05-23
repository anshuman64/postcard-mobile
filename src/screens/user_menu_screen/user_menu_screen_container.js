// Library Imports
import { connect } from 'react-redux';

// Local Imports
import UserMenuScreen                         from './user_menu_screen';
import { deleteFriendship, removeFriendship } from '../../actions/friendship_actions';
import { createBlock }                        from '../../actions/block_actions';
import { navigateTo, navigateToProfile }      from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, groupsCache, contactsCache }, ownProps) => ({
  client:        client,
  usersCache:    usersCache,
  groupsCache:   groupsCache,
  contactsCache: contactsCache
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteFriendship:  (authToken, firebaseUserObj, userId)     => dispatch(deleteFriendship(authToken, firebaseUserObj, userId)),
  removeFriendship:  (deletedFriendship)                      => dispatch(removeFriendship(deletedFriendship)),
  createBlock:       (authToken, firebaseUserObj, blockeeId)  => dispatch(createBlock(authToken, firebaseUserObj, blockeeId)),
  navigateTo:        (screen, props)                          => dispatch(navigateTo(screen, props)),
  navigateToProfile: (props)                                  => dispatch(navigateToProfile(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMenuScreen);
