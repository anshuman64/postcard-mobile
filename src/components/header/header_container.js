// Library Imports
import { connect } from 'react-redux';

// Local Imports
import Header                  from './header.js';
import { createPost }          from '../../actions/post_actions.js';
import { navigateTo, goBack }  from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ client }, ownProps) => ({
  client: client,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPost:       (authToken, firebaseUserObj, userId, isPublic, recipients, postBody, postImagePath, postImageType, placeholderText) => dispatch(createPost(authToken, firebaseUserObj, userId, isPublic, recipients, postBody, postImagePath, postImageType, placeholderText)),
  navigateTo:       (screen, props) => dispatch(navigateTo(screen, props)),
  goBack:           (props) => dispatch(goBack(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
