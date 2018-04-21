// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { styles } from './loading_modal_styles';
import { COLORS } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  -
Required Passed Props:
  -
Optional Passed Props:
  isLoading (bool): if the screen is loading so that the modal should render
*/
class LoadingModal extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return(
      <RN.Modal
        visible={this.props.isLoading}
        transparent={true}
        animationType={'none'}
        onRequestClose={() => null}
        >
        <RN.View style={styles.modal}>
          <RN.ActivityIndicator size='small' color={COLORS.grey500} />
        </RN.View>
      </RN.Modal>
    )
  }
}


//--------------------------------------------------------------------//


export default LoadingModal;
