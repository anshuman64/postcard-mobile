// Library Imports
import { connect } from 'react-redux';

// Local Imports
import HomeScreen  from './home_screen.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ posts, navigation }, ownProps) => ({
  allPosts:        posts.allPosts,
  currentScreen:   navigation.currentScreen
});

export default connect(
  mapStateToProps,
)(HomeScreen);
