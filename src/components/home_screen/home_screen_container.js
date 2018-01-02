// Library Imports
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

// Local Imports
import HomeScreen           from './home_screen.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts }, ownProps) => ({
  allPosts:        posts.allPosts,
  currentScreen:   Actions.currentScene
});

export default connect(
  mapStateToProps,
)(HomeScreen);
