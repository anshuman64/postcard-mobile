// Library Imports
import React       from 'react';
import RN          from 'react-native';
import _           from 'lodash';
import AWS         from 'aws-sdk/dist/aws-sdk-react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { Buffer }  from 'buffer';
import uuid        from 'react-native-uuid';
import mime        from 'mime-types';
import Icon        from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon     from 'react-native-vector-icons/Ionicons';

// Local Imports
import { styles }            from './header_styles.js';
import { COLORS }            from '../../../utilities/style_utility.js';
import { defaultErrorAlert } from '../../../utilities/error_utility.js';

//--------------------------------------------------------------------//


class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    this.isSharePressed  = false;
    this.isGoBackPressed = false;
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _goBack = () => {
    if (this.isGoBackPressed) {
      return;
    }

    this.isGoBackPressed = true;
    this.props.goBack();
  }

  _getS3Key(imageNode) {
    folder = this.props.user.id;
    name = uuid.v1();
    ext = mime.extension(imageNode.type)

    key = folder + '/' + name + '.' + ext;

    return key;
  }

  _uploadImage(imageNode) {
    s3 = new AWS.S3();

    RNFetchBlob.fs.readFile(imageNode.image.uri, 'base64')
      .then((data) => new Buffer(data, 'base64'))
      .then((buffer) => {
        params = {
          Body: buffer,
          Bucket: "insiya-users",
          Key: this._getS3Key(imageNode),
          ServerSideEncryption: "AES256",
          ContentType: imageNode.type
        };

        s3.upload(params, (error, data) => {
          if (error) {
            this.isSharePressed = false;
            defaultErrorAlert(error);
          } else {
            this._createPost(data.key);
          }
       })
      })
  }

  _createPost(imageKey) {
    this.props.createPost(this.props.authToken, this.props.firebaseUserObj, { body: this.props.postText, image_url: imageKey })
      .then(() => {
        this.props.goBack({scrollToTop: Date()});
      })
      .catch((error) => {
        this.isSharePressed = false;
        defaultErrorAlert(error);
      })
  }

  //TODO: add spinner
  _onPressShare = () => {
    if ((!this.props.postText && !this.props.imageNode) || this.isSharePressed) {
      return;
    }

    this.isSharePressed = true;

    if (this.props.imageNode) {
      this._uploadImage(this.props.imageNode);
    } else {
      this._createPost()
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderBackIcon() {
    if (this.props.backIcon) {
      return (
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.backIcon.setNativeProps({style: styles.textHighlighted})}
          onPressOut={() => this.backIcon.setNativeProps({style: styles.backIcon})}
          onPress={() => this._goBack()}
          >
          <RN.View style={styles.button}>
            <Ionicon
              ref={(ref) => this.backIcon = ref}
              name='ios-arrow-round-back'
              style={styles.backIcon}
              />
          </RN.View>
        </RN.TouchableWithoutFeedback>
      )
    }
  }

  _renderBackTitle() {
    if (this.props.backTitle) {
      return (
        <RN.Text style={styles.backTitle}>
          this.props.backTitle
        </RN.Text>
      )
    }
  }

  _renderSettingsIcon() {
    if (this.props.settingsIcon) {
      return (
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.settingsIcon.setNativeProps({style: styles.textHighlighted})}
          onPressOut={() => this.settingsIcon.setNativeProps({style: styles.settingsIcon})}
          onPress={() => this.props.navigateTo('MenuScreen')}
          >
          <RN.View style={styles.button}>
            <Icon ref={(ref) => this.settingsIcon = ref} name='settings' style={styles.settingsIcon} />
          </RN.View>
        </RN.TouchableWithoutFeedback>
      )
    }
  }

  _renderLogo() {
    if (this.props.logo) {
      return (
        <RN.Image
          style={styles.logo}
          source={require('../../../assets/images/icon/icon.png')}
          resizeMode='cover'
          />
      )
    }
  }

  _renderNoteIcon() {
    if (this.props.noteIcon) {
      return (
        <RN.TouchableOpacity onPress={() => this.props.navigateTo('NewPostScreen')} style={styles.button} >
          <Icon name='note' style={styles.noteIcon} />
        </RN.TouchableOpacity>
      )
    }
  }

  _renderShareButton() {
    if (this.props.shareButton) {
      return (
        <RN.TouchableOpacity onPress={this._onPressShare} style={styles.button} >
          <RN.Text style={styles.shareButton}>Share</RN.Text>
        </RN.TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <RN.View style={[styles.header, this.props.backTitle && styles.backHeader, (this.props.currentScreen === '_HomeScreen' || this.props.currentScreen === '_NewPostScreen') && styles.border]}>
        {this._renderBackIcon()}
        {this._renderSettingsIcon()}
        {this._renderLogo()}
        {this._renderNoteIcon()}
        {this._renderShareButton()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default Header;
