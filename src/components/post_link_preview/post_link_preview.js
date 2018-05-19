// Library Imports
import React       from 'react';
import RN          from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import VideoPlayer from 'react-native-video-player';

// Local Imports
import { styles }                             from './post_link_preview_styles';
import * as StyleUtility                      from '../../utilities/style_utility';
import { setStateCallback, getDomainFromUrl } from '../../utilities/function_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  data (LinkPreview object): contains information about the link
  width (int): width of item (post vs. post as message)
Optional Passed Props:
  -
*/
class PostLinkPreview extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      isSpinnerVisible: true,
      previewType:   null,
      mediumDimensions: null,
      scaledDimensions: null
    }
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    if (this.props.data.contentType.startsWith('text/') && this.props.data.images && this.props.data.images[0]) {
      this._setMediumDimensions(this.props.data.images[0], 'text');
    } else if (this.props.data.contentType.startsWith('image/')) {
      this._setMediumDimensions(this.props.data.url, 'image');
    } else if (this.props.data.contentType.startsWith('video/')) {
      let width = this.props.width;
      let height = 0.4 * width;

      this.setState({ previewType: 'video', mediumDimensions: { width: width, height: height }, scaledDimensions: { width: width, height: height } });
    }
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _setMediumDimensions = (url, previewType) => {
    RN.Image.getSize(url, (width, height) => {
      let scaledWidth = this.props.width;
      let scaledHeight = StyleUtility.getScaledHeight({ width: width, height: height }, scaledWidth);

      this.setState({ previewType: previewType, mediumDimensions: { width: width, height: height }, scaledDimensions: { width: scaledWidth, height: scaledHeight } });
    });
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressLink = () => {
    RN.Linking.openURL(this.props.data.url);
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderVideo() {
    return (
      <RN.View style={[styles.mediumContainer, { width: this.state.scaledDimensions.width, height: this.state.scaledDimensions.height }]}>
        <RN.ActivityIndicator size='small' color={StyleUtility.COLORS.grey500} style={{position: 'absolute'}}/>
        <VideoPlayer
          style={{ width: this.state.scaledDimensions.width, height: this.state.scaledDimensions.height }}
          video={{uri: this.props.data.url }}
          videoWidth={this.state.scaledDimensions.width}
          videoHeight={this.state.scaledDimensions.height}
          autoPlay={true}
          defaultMuted={true}
          disableControlsAutoHide={true}
          disableFullscreen={false}
          pauseOnPress={true}
          fullScreenOnLongPress={true}
          />
      </RN.View>
    )
  }

  _renderImage() {
    let url = this.state.previewType === 'text' && this.props.data.images && this.props.data.images[0] ? this.props.data.images[0] : this.props.data.url;

    return (
      <RN.View style={[styles.mediumContainer, { width: this.state.scaledDimensions.width, height: this.state.scaledDimensions.height }]}>
        {this.state.isSpinnerVisible ?
          <RN.ActivityIndicator size='small' color={StyleUtility.COLORS.grey500} style={{position: 'absolute'}}/> :
        null}
        <RN.Image
          source={{uri: url }}
          style={{ width: this.state.scaledDimensions.width, height: this.state.scaledDimensions.height }}
          resizeMode={'cover'}
          onLoad={setStateCallback(this, { isSpinnerVisible: false })}
          />
      </RN.View>
    )
  }

  _renderMedium() {
    if (this.state.previewType === 'text' || this.state.previewType === 'image') {
      return this._renderImage();
    } else if (this.state.previewType === 'video') {
      return this._renderVideo();
    } else {
      return null;
    }
  }

  _renderCaption() {
    let domain = getDomainFromUrl(this.props.data.url);

    return (
      <RN.View style={styles.captionView}>
        {this.props.data.title ?
          <RN.Text allowFontScaling={false} numberOfLines={2} style={styles.titleText}>
            {this.props.data.title}
          </RN.Text> :
          null
        }
        <RN.Text allowFontScaling={false} style={styles.urlText}>
          {domain}
        </RN.Text>
      </RN.View>
    )
  }

  render() {
    return (
    <RN.TouchableWithoutFeedback onPress={this._onPressLink}>
        <RN.View style={styles.container}>
          {this._renderMedium()}
          {this._renderCaption()}
        </RN.View>
    </RN.TouchableWithoutFeedback>
    )
  }
}

//--------------------------------------------------------------------//

export default PostLinkPreview;
