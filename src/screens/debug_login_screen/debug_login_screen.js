// Library Imports
import React from 'react';
import RN    from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';

// Local Imports
import { styles }         from './debug_login_screen_styles';
import { UTILITY_STYLES } from '../../utilities/style_utility';
import { uploadFile }     from '../../utilities/file_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  -
*/
class DebugLoginScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      emailInput:     'test1@insiya.io',
      passwordInput:  'socialnetwork',
      videos: null
    };

    this.isNextPressed = false;
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onNextButtonPress = () => {
    // if (this.isNextPressed) {
    //   return;
    // }
    //
    // this.isNextPressed = true;
    //
    // this.props.debugSignIn(this.state.emailInput, this.state.passwordInput)
    //   .then(() => {
    //     this.props.navigateTo('LoadingScreen');
    //   })
    //   .finally(() => {
    //     this.isNextPressed = false;
    //   });

    if (!this.state.videos) {
      ImagePicker.openPicker({
        mediaType: 'video',
        multiple: true,
        includeBase64: true,
        showCropGuidelines: false,
        hideBottomControls: true,
        cropperToolbarColor: 'black',
      })
      .then((videos) => {
        console.log(videos)
        this.setState({ videos: videos })
      })
      .catch((error) => {
        // console.log(error); // Debug Test
        this.isImagePressed = false;
      });
    } else {
      uploadFile(this.props.client.authToken, this.props.client.firebaseUserObj, this.state.videos[0].path, this.state.videos[0].mime, 1, '/')
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })
    }



  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderLogo() {
    return (
      <RN.View style={styles.topView}>
        <RN.Image
          style={styles.logo}
          source={require('../../assets/images/logo/logo.png')}
          resizeMode='contain'
          />
      </RN.View>
    )
  }

  _renderEmailInput() {
    return (
      <RN.TextInput
        style={styles.textInput}
        onChangeText={(value) => this.setState({ emailInput: value })}
        value={this.state.emailInput}
        underlineColorAndroid={'transparent'}
        returnKeyType={RN.Platform.OS === 'ios' ? 'done' : null}
      />
    )
  }

  _renderPasswordInput() {
    return (
      <RN.TextInput
        style={styles.textInput}
        onChangeText={(value) => this.setState({ emailInput: value })}
        value={this.state.passwordInput}
        underlineColorAndroid={'transparent'}
        returnKeyType={RN.Platform.OS === 'ios' ? 'done' : null}
      />
    )
  }

  _renderNextButton() {
    return (
      <RN.TouchableHighlight
        style={[UTILITY_STYLES.nextButtonBackground, UTILITY_STYLES.marginTop50]}
        onPress={this._onNextButtonPress}
        underlayColor={'#0050a7'}
        >
        <RN.Text style={UTILITY_STYLES.lightWhiteText16}>
          Next
        </RN.Text>
      </RN.TouchableHighlight>
    )
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerCenter}>
        <VideoPlayer
        style={{width: 200, height: 200}}
        video={{uri: 'https://s3.amazonaws.com/insiya-users-dev/1//c5824d20-4c91-11e8-a3f4-ef24c6acd6b7.mp4'}}
        videoWidth={2000}
        videoHeight={2000}
        autoPlay={true}
        defaultMuted={true}
        disableControlsAutoHide={true}
        disableFullscreen={false}
        pauseOnPress={true}
        fullScreenOnLongPress={true}
        / >

        <RN.View style={styles.bottomView}>

          {this._renderEmailInput()}
          {this._renderPasswordInput()}
          {this._renderNextButton()}
        </RN.View>
      </RN.View>
    )
  }
}


// --------------------------------------------------------------------


export default DebugLoginScreen;
