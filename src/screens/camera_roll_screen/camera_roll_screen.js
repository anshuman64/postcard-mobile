// Library Imports
import React       from 'react';
import RN          from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicon     from 'react-native-vector-icons/Ionicons';

// Local Imports
import MediaLibrary          from '../../components/media_library/media_library'; // don't add .js or else this won't work
import ListFooter            from '../../components/list_footer/list_footer.js';
import * as StyleUtility     from '../../utilities/style_utility.js';
import { styles }            from './camera_roll_screen_styles.js';
import { defaultErrorAlert } from '../../utilities/error_utility.js';
import { amplitude }         from '../../utilities/analytics_utility.js';

//--------------------------------------------------------------------//

const PAGE_SIZE   = Math.ceil(StyleUtility.DEVICE_DIM.height / (StyleUtility.getUsableDimensions().width / 3)) * 3;
const SCROLL_SIZE = PAGE_SIZE * 16;

class CameraRollScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.ds = new RN.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      images:   [],
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    // Note: data in different formats depending on iOS vs. Android, but both have uri param
    MediaLibrary.fetchMedia()
      .then((data) => {
        if (data.length === 0) {
          RN.Alert.alert('', 'No images in gallery.', [{text: 'OK', style: 'cancel'}]);
        } else {
          this.setState({ images: this.state.images.concat(data) });
        }
      })
      .catch((error) => {
        amplitude.logEvent('Error - Camera Roll', { error_description: 'Could not load images', error_message: error.message });
        RN.Alert.alert('','Could not load images. Please try again later.',[{text: 'OK', style: 'cancel'}]);
      });
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  // Opens cropper on image selection
  _onPressImage(imagePath) {
    if (this.isImagePressed) {
      return;
    }

    this.isImagePressed = true;

    // TODO: add gif and video support
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

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderCameraRoll() {
    return (
      <RN.ListView
        dataSource={this.ds.cloneWithRows(this.state.images)}
        style={styles.cameraRoll}
        renderRow={this._renderRow}
        renderFooter={this._renderFooter}
        initialListSize={SCROLL_SIZE}
        pageSize={SCROLL_SIZE}
        contentContainerStyle={styles.contentContainerStyle}
        enableEmptySections={true}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={10000}
        scrollRenderAheadDistance={10000}
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
          onPress={() => this._onPressImage(rowData.uri)}
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
