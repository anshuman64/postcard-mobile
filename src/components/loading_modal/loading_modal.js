// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { styles } from './loading_modal_styles.js';
import { COLORS } from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


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
