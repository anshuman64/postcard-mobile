// Library Imports
import React       from 'react';
import RN          from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

// Local Imports
import { COLORS, getUsableDimensions } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  isModalVisible (bool): if the modal should be visible
  imageUrls (array): imageUrls to display on ImageViewer
  setParentState (func): sets parent state isModalVisible
Optional Passed Props:
  -
*/
class Medium extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    RN.BackHandler.addEventListener("hardwareBackPress", this._onBackPress);
  }

  componentWillUnmount() {
    RN.BackHandler.removeEventListener("hardwareBackPress", this._onBackPress);
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onBackPress = () => {
    this.props.setParentState({ isModalVisible: false });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//
  render() {
    return (
      <RN.Modal visible={this.props.isModalVisible} transparent={true} onRequestClose={this._onBackPress}>
        <ImageViewer
          imageUrls={this.props.imageUrls}
          onCancel={this._onBackPress}
          onClick={this._onBackPress}
          onSwipeDown={this._onBackPress}
          failImageSource={'Could not load image'}
          loadingRender={() => <RN.ActivityIndicator size='small' color={COLORS.grey500} style={{height: getUsableDimensions().height}}/>}
          renderIndicator={() => null}
          index={this.props.index}
          />
      </RN.Modal>
    )
  }
}

//--------------------------------------------------------------------//

export default Medium;
