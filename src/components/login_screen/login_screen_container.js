// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoginScreen from './login_screen.js';
import { createRestaurant, fetchRestaurant, updateRestaurant, receiveRestaurantErrors } from '../../actions/restaurant_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ session, errors, restaurantDetail }, ownProps) => ({
  currentUser: session.currentUser,
  errors: errors.restaurantErrors,
  restaurant: restaurantDetail,
  formType: ownProps.location.pathname.endsWith('new') ? 'new' : 'edit'
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchRestaurant: (id) => dispatch(fetchRestaurant(id)),
  createRestaurant: (restaurant) => dispatch(createRestaurant(restaurant)),
  updateRestaurant: (restaurant) => dispatch(updateRestaurant(restaurant)),
  receiveRestaurantErrors: (err) => dispatch(receiveRestaurantErrors(err))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantForm);
