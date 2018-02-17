// Library Imports
import { connect } from 'react-redux';

// Local Imports
import HomeScreen from './home_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, posts }, ownProps) => ({
  client:        client,
  posts:         posts,
});

export default connect(
  mapStateToProps,
)(HomeScreen);
