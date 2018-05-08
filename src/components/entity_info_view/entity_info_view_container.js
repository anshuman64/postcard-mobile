// Library Imports
import { connect } from 'react-redux';

// Local Imports
import EntityInfoView        from './entity_info_view';
import { navigateToProfile } from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ usersCache, groupsCache, contactsCache }, ownProps) => ({
  usersCache:    usersCache,
  groupsCache:   groupsCache,
  contactsCache: contactsCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateToProfile: (props) => dispatch(navigateToProfile(props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityInfoView);
