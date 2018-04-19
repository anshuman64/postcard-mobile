// Library Imports
import { connect } from 'react-redux';

// Local Imports
import CheckboxListItem  from './checkbox_list_item';
import { deleteCircle }  from '../../actions/circle_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client }, ownProps) => ({
  client: client,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteCircle: (authToken, firebaseUserObj, circleId) => dispatch(deleteCircle(authToken, firebaseUserObj, circleId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxListItem);
