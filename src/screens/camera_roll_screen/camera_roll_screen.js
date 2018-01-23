// Library Imports
import React       from 'react';
import RN          from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicon     from 'react-native-vector-icons/Ionicons';

// Local Imports
import { UTILITY_STYLES, DEVICE_DIM, getUsableDimensions } from '../../utilities/style_utility.js';
import { styles }                                          from './camera_roll_screen_styles.js';
import { defaultErrorAlert }                               from '../../utilities/error_utility.js';

//--------------------------------------------------------------------//

const PAGE_SIZE = Math.ceil(DEVICE_DIM.height / getUsableDimensions().width / 3) * 3;

class CameraRollScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.ds = new RN.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      images: [],
    };

    this.isImagePressed = false;
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this._getPhotos(999999999);
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  //TODO: decide to paginate or wait for bugs!
  // Recursively gets all images from cameraRoll and adds data to this.state.images
  _getPhotos = (first, after) => {
    RN.CameraRoll.getPhotos({first: first, after: after})
      .then((data) => {
        // If there are no images, give an alert
        if (!after && data.edges.length === 0) {
          RN.Alert.alert('', 'No images in gallery.', [{text: 'OK', style: 'cancel'}]);
        } else {
          this.setState({ images: this.state.images.concat(data.edges) }, () => {
            if (data.page_info.has_next_page) {
              this._getPhotos(999999999, data.page_info.end_cursor);
            }
          });
        }
      })
      .catch((error) => {
        RN.Alert.alert('','Could not load images. Please try again later.',[{text: 'OK', style: 'cancel'}]);
      });
  }

  // Opens cropper on image selection
  _onPressImage(imageNode) {
    if (this.isImagePressed) {
      return;
    }

    this.isImagePressed = true;

    // If image selected is a gif, skip the cropping
    if (imageNode.type === 'image/gif') {
      this.props.goBack({ imagePath: imageNode.image.uri, imageType: imageNode.type });
    } else {
      ImagePicker.openCropper({
        path: imageNode.image.uri,
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
        console.log(error);
        this.isImagePressed = false;
      })
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderCameraRoll() {
    return (
      <RN.ListView
        dataSource={this.ds.cloneWithRows(this.state.images)}
        style={styles.cameraRoll}
        renderRow={this._renderRow()}
        initialListSize={PAGE_SIZE * 2}
        pageSize={PAGE_SIZE * 10}
        contentContainerStyle={styles.contentContainerStyle}
        enableEmptySections={true}
      />
    )
  }

  _renderRow() {
    return (
      (rowData, sectionID, rowID) => (
        <RN.View ref={(ref) => rowID = ref} style={styles.imageContainer}>
          <RN.View style={styles.iconBackground}>
            <Ionicon name='md-image' style={styles.imageIcon} />
          </RN.View>
          <RN.TouchableWithoutFeedback
            onPressIn={() => rowID.setNativeProps({style: styles.imageHighlighted}) }
            onPressOut={() => rowID.setNativeProps({style: styles.imageContainer}) }
            onPress={() => this._onPressImage(rowData.node)}
            >
            <RN.Image
              source={{uri: rowData.node.image.uri}}
              resizeMode={'cover'}
              style={styles.image}
              />
          </RN.TouchableWithoutFeedback>
        </RN.View>
      )
    )
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerCenter}>
        {this._renderCameraRoll()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default CameraRollScreen;
