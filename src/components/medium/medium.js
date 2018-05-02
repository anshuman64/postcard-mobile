// Library Imports
import React       from 'react';
import RN          from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import VideoPlayer from 'react-native-video-player';

// Local Imports
import { COLORS, getUsableDimensions } from '../../utilities/style_utility';
import { setStateCallback }            from '../../utilities/function_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  medium (medium object): medium to render
  mediumStyle  (style object): desired styling of medium, with height, width
  containerStyle (style object): desired styling of container
Optional Passed Props:
  imageUrls (array): imageUrls to display on ImageViewer
*/
class Medium extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      isSpinnerVisible: true
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderImageViewer(mediumUrl) {
    if (mediumUrl && this.state.isModalVisible) {
      return (
        <RN.Modal visible={this.state.isModalVisible} transparent={true}>
          <ImageViewer
            imageUrls={this.props.imageUrls || [{ url: mediumUrl }]}
            onCancel={setStateCallback(this, { isModalVisible: false })}
            onClick={setStateCallback(this, { isModalVisible: false })}
            onSwipeDown={setStateCallback(this, { isModalVisible: false })}
            failImageSource={'Could not load image'}
            loadingRender={() => <RN.ActivityIndicator size='small' color={COLORS.grey500} style={{height: getUsableDimensions().height}}/>}
            renderIndicator={() => null}
            index={this.props.imageUrls ? this.props.imageUrls.map(x => x.url).indexOf(mediumUrl) : null}
            />
        </RN.Modal>
      )
    }
  }

  _renderMedium(medium, cachedMedium, mediumUrl) {
    if (mediumUrl) {
      if (cachedMedium.mime_type.startsWith('image/')) {
        return (
          <RN.View style={this.props.containerStyle}>
            {this.state.isSpinnerVisible ?
              <RN.ActivityIndicator size='small' color={COLORS.grey500} style={{position: 'absolute'}}/> :
            null}
            <RN.TouchableWithoutFeedback onLongPress={setStateCallback(this, { isModalVisible: true })}>
              <RN.Image
                source={{uri: mediumUrl}}
                style={this.props.mediumStyle}
                resizeMode={'cover'}
                onLoad={setStateCallback(this, { isSpinnerVisible: false })}
                onError={() => this.props.refreshCredsAndGetMedium(this.props.client.firebaseUserObj, medium)}
                />
            </RN.TouchableWithoutFeedback>
          </RN.View>
        )
      } else if (cachedMedium.mime_type.startsWith('video/')) {
        return (
          <RN.View style={this.props.containerStyle}>
            <RN.ActivityIndicator size='small' color={COLORS.grey500} style={{position: 'absolute'}}/>
            <VideoPlayer
              style={this.props.mediumStyle}
              video={{uri: mediumUrl}}
              videoWidth={medium.width}
              videoHeight={medium.height}
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
    } else if (cachedMedium) {
      return (
        <RN.View style={this.props.style}>
          <RN.ActivityIndicator size='small' color={COLORS.grey500} style={{position: 'absolute'}}/>
        </RN.View>
      )
    } else {
      return null;
    }
  }

  render() {
    let medium       = this.props.medium;
    let cachedMedium = medium ? this.props.mediaCache[medium.id] : null;
    let mediumUrl    = cachedMedium ? cachedMedium.url : null;

    return (
      <RN.View style={this.props.containerStyle}>
        {this._renderMedium(medium, cachedMedium, mediumUrl)}
        {this._renderImageViewer(mediumUrl)}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default Medium;
