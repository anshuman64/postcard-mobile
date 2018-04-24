// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ConversationListItem              from './conversation_list_item';
import { navigateTo, navigateToProfile } from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, groupsCache, postsCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  groupsCache: groupsCache,
  postsCache:  postsCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo:         (screen, props) => dispatch(navigateTo(screen, props)),
  navigateToProfile:  (props) => dispatch(navigateToProfile(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationListItem);
