// Library Imports
import React       from 'react';
import RN          from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicon     from 'react-native-vector-icons/Ionicons';

// Local Imports
import { cameraRollPhotos }  from '../../utilities/file_utility';
import ListFooter            from '../../components/list_footer/list_footer';
import * as StyleUtility     from '../../utilities/style_utility';
import { styles }            from './camera_roll_screen_styles';
import { defaultErrorAlert } from '../../utilities/error_utility';
import { amplitude }         from '../../utilities/analytics_utility';

//--------------------------------------------------------------------//

const PAGE_SIZE   = Math.ceil(StyleUtility.DEVICE_DIM.height / (StyleUtility.getUsableDimensions().width / 3)) * 3;
const SCROLL_SIZE = PAGE_SIZE * 5;

/*
Required Screen Props:
  -
Optional Screen Props:
  isAvatar (bool): determines if cropping shadow should be square or circle
*/
class CameraRollScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.ds = new RN.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  // Opens cropper on image selection
  _onPressImage(imagePath, isGif) {
    if (this.isImagePressed) {
      return;
    }

    this.isImagePressed = true;

    if (isGif) {
      this.props.goBack({ imagePath: imagePath, imageType: 'image/gif' });
    } else {
      ImagePicker.openCropper({
        path: imagePath,
        width: 500,
        height: 500,
        cropperCircleOverlay: this.props.isAvatar, // If isAvatar, use the circular cropping overlay
        showCropGuidelines: false,
        hideBottomControls: true,
        cropperToolbarColor: 'black',
      })
      .then((imageObj) => {
        this.props.goBack({ imagePath: imageObj.path, imageType: imageObj.mime });
      })
      .catch((error) => {
        // console.log(error); // Debug Test
        this.isImagePressed = false;
      });
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderCameraRoll() {
    return (
      <RN.ListView
        dataSource={this.ds.cloneWithRows(cameraRollPhotos)}
        style={styles.cameraRoll}
        renderRow={this._renderRow}
        renderFooter={this._renderFooter}
        initialListSize={PAGE_SIZE * 2}
        pageSize={SCROLL_SIZE}
        contentContainerStyle={styles.contentContainerStyle}
        enableEmptySections={true}
        showsVerticalScrollIndicator={false}
        />
    )
  }

  _renderRow = (rowData, sectionID, rowID) => {
    return (
      <RN.View ref={(ref) => rowID = ref} style={styles.imageContainer}>
        <RN.View style={styles.iconBackground}>
          <Ionicon name='md-image' style={styles.imageIcon} />
        </RN.View>
        <RN.TouchableWithoutFeedback
          onPressIn={() => rowID.setNativeProps({style: styles.imageHighlighted}) }
          onPressOut={() => rowID.setNativeProps({style: styles.imageContainer}) }
          onPress={() => this._onPressImage(rowData.uri, rowData.type === 'image/gif')}
          >
          <RN.Image
            source={{uri: rowData.uri}}
            resizeMode={'cover'}
            style={styles.image}
            />
        </RN.TouchableWithoutFeedback>
      </RN.View>
    )
  }

  _renderFooter = () => {
    return (
      <ListFooter footerWidth={StyleUtility.scaleFont(120)} text={'No More Photos'} />
    )
  }

  render() {
    return (
      <RN.View style={StyleUtility.UTILITY_STYLES.containerCenter}>
        {this._renderCameraRoll()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default CameraRollScreen;
