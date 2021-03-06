// Library Imports
import React       from 'react';
import RN          from 'react-native';
import VideoPlayer from 'react-native-video-player';

// Local Imports
import ImageViewerModal      from '../image_viewer_modal/image_viewer_modal';
import { styles }            from './medium_styles';
import { COLORS }            from '../../utilities/style_utility';
import { setStateCallback }  from '../../utilities/function_utility';

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
  // Public Methods
  //--------------------------------------------------------------------//

  setParentState = (state) => {
    this.setState(state);
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderImageViewer() {
    let medium       = this.props.medium;
    let cachedMedium = medium ? this.props.mediaCache[medium.id] : null;
    let mediumUrl    = cachedMedium ? cachedMedium.url : null;

    if (mediumUrl && this.state.isModalVisible) {
      let imageUrls = this.props.imageUrls || [{ url: mediumUrl }];
      let index = this.props.imageUrls ? this.props.imageUrls.map(x => x.url).indexOf(mediumUrl) : 0;

      return (
        <ImageViewerModal isModalVisible={this.state.isModalVisible} imageUrls={imageUrls} setParentState={this.setParentState} index={index} />
      )
    }
  }

  _renderMedium() {
    let medium       = this.props.medium;
    let cachedMedium = medium ? this.props.mediaCache[medium.id] : null;
    let mediumUrl    = cachedMedium ? cachedMedium.url : null;

    if (mediumUrl) {
      if (cachedMedium.mime_type.startsWith('image/')) {
        return (
          <RN.View style={[styles.mediumContainer, this.props.mediumStyle]}>
            {this.state.isSpinnerVisible ?
              <RN.ActivityIndicator size='small' color={COLORS.grey500} style={{position: 'absolute'}}/> :
            null}
            <RN.TouchableWithoutFeedback onPress={setStateCallback(this, { isModalVisible: true })}>
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
          <RN.View style={[styles.mediumContainer, this.props.mediumStyle]}>
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
        <RN.View style={this.props.mediumStyle}>
          <RN.ActivityIndicator size='small' color={COLORS.grey500} style={{position: 'absolute'}}/>
        </RN.View>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <RN.View style={styles.container}>
        {this._renderMedium()}
        {this._renderImageViewer()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default Medium;
