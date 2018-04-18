// Library Imports
import { connect } from 'react-redux';

// Local Imports
import HomeScreen  from './home_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client }, ownProps) => ({
  client:        client,
});

export default connect(
  mapStateToProps,
)(HomeScreen);
