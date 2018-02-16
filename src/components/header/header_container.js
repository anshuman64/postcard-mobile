// Library Imports
import { connect } from 'react-redux';

// Local Imports
import Header                  from './header';
import { createPost }          from '../../actions/post_actions';
import { navigateTo, goBack }  from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client }, ownProps) => ({
  client: client,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPost:       (authToken, firebaseUserObj, clientId, isPublic, recipients, postBody, postImagePath, postImageType, placeholderText) => dispatch(createPost(authToken, firebaseUserObj, clientId, isPublic, recipients, postBody, postImagePath, postImageType, placeholderText)),
  navigateTo:       (screen, props) => dispatch(navigateTo(screen, props)),
  goBack:           (props) => dispatch(goBack(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
