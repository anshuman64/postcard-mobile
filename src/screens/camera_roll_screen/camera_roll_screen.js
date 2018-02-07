// Library Imports
import React       from 'react';
import RN          from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicon     from 'react-native-vector-icons/Ionicons';

// Local Imports
import { UTILITY_STYLES, COLORS, DEVICE_DIM, getUsableDimensions } from '../../utilities/style_utility.js';
import { styles }                                                  from './camera_roll_screen_styles.js';
import { defaultErrorAlert }                                       from '../../utilities/error_utility.js';
import { amplitude }                                               from '../../utilities/analytics_utility.js';

//--------------------------------------------------------------------//

const PAGE_SIZE   = Math.ceil(DEVICE_DIM.height / (getUsableDimensions().width / 3)) * 3;
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
      pageInfo: null,
    };

    this.isImagePressed = false;
    this.isLoading = false;
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this._getPhotos(SCROLL_SIZE);
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  // Gets from cameraRoll and adds data to this.state.images
  _getPhotos = (first, after) => {
    this.isLoading = true;

    let params;
    if (RN.Platform.OS === 'ios') {
      params = {first: first, after: after, groupTypes: 'All'};
    } else {
      params = {first: first, after: after};
    }

    RN.CameraRoll.getPhotos(params)
      .then((data) => {
        if (!after && data.edges.length === 0) {
          RN.Alert.alert('', 'No images in gallery.', [{text: 'OK', style: 'cancel'}]);
        } else {
          this.setState({ images: this.state.images.concat(data.edges), pageInfo: data.page_info });
        }
      })
      .catch((error) => {
        amplitude.logEvent('Error - Camera Roll', { error_description: 'Could not load images', error_message: error.message });
        RN.Alert.alert('','Could not load images. Please try again later.',[{text: 'OK', style: 'cancel'}]);
      })
      .finally(() => {
        this.isLoading = false;
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
        // console.log(error); // Debug Test
        this.isImagePressed = false;
      });
    }
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _onEndReached = () => {
    if (this.isLoading
        || !this.state.pageInfo.has_next_page) {
      return;
    }

    this._getPhotos(SCROLL_SIZE, this.state.pageInfo.end_cursor);
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
        renderFooter={this._renderFooter}
        initialListSize={SCROLL_SIZE}
        pageSize={SCROLL_SIZE}
        contentContainerStyle={styles.contentContainerStyle}
        enableEmptySections={true}
        showsVerticalScrollIndicator={false}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={10000}
        scrollRenderAheadDistance={10000}
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



  _renderFooter = () => {
    if (this.state.pageInfo && !this.state.pageInfo.has_next_page) {
      return (
        <RN.View style={styles.footerView}>
          <RN.View style={styles.horizontalLine} />
          <RN.Text style={styles.footerText}>
            No More Photos
          </RN.Text>
          <RN.View style={styles.horizontalLine} />
        </RN.View>
      )
    } else {
      return (
        <RN.View style={styles.footerView}>
          <RN.ActivityIndicator size='small' color={COLORS.grey400} />
        </RN.View>
      )
    }
  };

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
