// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ConversationListItem  from './conversation_list_item';
import { navigateTo }        from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, groupsCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  groupsCache: groupsCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationListItem);
