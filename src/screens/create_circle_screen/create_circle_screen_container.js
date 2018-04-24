// Library Imports
import { connect } from 'react-redux';

// Local Imports
import CreateCircleScreen from './create_circle_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ conversations }, ownProps) => ({
  conversations:   conversations.conversations,
});

export default connect(
  mapStateToProps
)(CreateCircleScreen);
