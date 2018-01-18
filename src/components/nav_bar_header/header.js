// Library Imports
import React       from 'react';
import RN          from 'react-native';
import _           from 'lodash';
import Icon        from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon     from 'react-native-vector-icons/Ionicons';

// Local Imports
import LoadingModal          from '../loading_modal/loading_modal.js'
import { styles }            from './header_styles.js';
import { COLORS }            from '../../utilities/style_utility.js';
import { uploadImageFile }   from '../../utilities/file_utility.js';
import { defaultErrorAlert } from '../../utilities/error_utility.js';

//--------------------------------------------------------------------//


class Header extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    }

    this.isSharePressed  = false;
    this.isGoBackPressed = false;
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _uploadImage() {
    uploadImageFile(this.props.firebaseUserObj, this.props.refreshAuthToken, this.props.imagePath, this.props.imageType, this.props.user.id, 'posts/')
      .then((data) => {
        this._createPost(data.key);
      })
      .catch((error) => {
        this.setState({ isLoading: false }, () => {
          this.isSharePressed = false;
          defaultErrorAlert(error);
        });
      })
  }

  _createPost(imageKey) {
    this.props.createPost(this.props.authToken, this.props.firebaseUserObj, this.props.user.id, { body: this.props.postText, image_url: imageKey }, this.props.placeholderText)
      .then(() => {
        this.setState({ isLoading: false }, () => {
          this.props.goBack({ scrollToTop: Date() });
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false }, () => {
          this.isSharePressed = false;
          defaultErrorAlert(error);
        });
      });
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _goBack = () => {
    if (this.isGoBackPressed) {
      return;
    }

    this.isGoBackPressed = true;
    this.props.goBack();
  }

  _onPressShare = () => {
    if ((!this.props.postText && !this.props.imagePath) || this.isSharePressed) {
      return;
    }

    this.isSharePressed = true;

    this.setState({ isLoading: true },() => {
      if (this.props.imagePath) {
        this._uploadImage();
      } else {
        this._createPost();
      }
    });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderBackIcon() {
    if (this.props.backIcon) {
      return (
        <RN.View style={styles.backView}>
          <RN.TouchableWithoutFeedback
            onPressIn={() => this.backIcon.setNativeProps({style: styles.textHighlighted})}
            onPressOut={() => this.backIcon.setNativeProps({style: styles.backIcon})}
            onPress={this._goBack}
            >
            <RN.View style={styles.button}>
              <Ionicon
                ref={(ref) => this.backIcon = ref}
                name='ios-arrow-round-back'
                style={styles.backIcon}
                />
            </RN.View>
          </RN.TouchableWithoutFeedback>
          {this._renderBackTitle()}
        </RN.View>
      )
    }
  }

  _renderBackTitle() {
    if (this.props.backTitle) {
      return (
        <RN.Text style={[styles.backTitle, !this.props.backIcon && styles.marginLeft]}>
          {this.props.backTitle}
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
          source={require('../../assets/images/logo/logo.png')}
          resizeMode='contain'
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

  _renderLoadingModal() {
    return (
      <LoadingModal isLoading={this.state.isLoading}/>
    )
  }

  render() {
    const IS_NOT_BORDER = this.props.currentScreen === 'HomeScreen' || this.props.currentScreen === 'ProfileScreen' || this.props.currentScreen === 'UserScreen';

    return (
      <RN.View style={[styles.header, !IS_NOT_BORDER && styles.border]}>
        {this._renderBackIcon()}
        {this._renderSettingsIcon()}
        {this._renderLogo()}
        {this._renderNoteIcon()}
        {this._renderShareButton()}
        {this._renderLoadingModal()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default Header;
