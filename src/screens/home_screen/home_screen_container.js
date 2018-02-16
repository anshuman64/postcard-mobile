// Library Imports
import { connect } from 'react-redux';

// Local Imports
import HomeScreen from './home_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, posts, navigation }, ownProps) => ({
  client:        client,
  posts:         posts,
  currentScreen: navigation.currentScreen
});

export default connect(
  mapStateToProps,
)(HomeScreen);
