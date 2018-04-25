// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ContactInfoView from './contact_info_view';

//--------------------------------------------------------------------//

const mapStateToProps = ({ contactsCache }, ownProps) => ({
  contactsCache: contactsCache,
});

export default connect(
  mapStateToProps
)(ContactInfoView);
