// Library Imports
import { connect } from 'react-redux';

// Local Imports
import RecentScreen from './recent_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, posts, navigation }, ownProps) => ({
  client:        client,
  posts:         posts,
  currentScreen: navigation.currentScreen
});

export default connect(
  mapStateToProps,
)(RecentScreen);
