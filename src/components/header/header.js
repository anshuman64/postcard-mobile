// Library Imports
import React   from 'react';
import RN      from 'react-native';
import Icon    from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

// Local Imports
import LoadingModal                   from '../loading_modal/loading_modal.js'
import { styles }                     from './header_styles';
import { UTILITY_STYLES, scaleImage } from '../../utilities/style_utility';
import { isStringEmpty }              from '../../utilities/function_utility';
import { defaultErrorAlert }          from '../../utilities/error_utility';

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

    this.isNextPressed   = false;
    this.isButtonPressed  = false;
    this.isGoBackPressed = false;
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // Goes back one screen
  _goBack = () => {
    if (this.isGoBackPressed) {
      return;
    }

    this.isGoBackPressed = true;
    this.props.goBack();
  }

  // Next button from NewPostScreen
  _onPressToShare = () => {
    // Return if no post body or image selected
    if ((isStringEmpty(this.props.postText) && !this.props.imagePath) || this.isNextPressed) {
      return;
    }

    isNextPressed = true;

    this.props.navigateTo('ShareScreen', {
      postText: this.props.postText,
      placeholderText: this.props.placeholderText,
      imagePath: this.props.imagePath,
      imageType: this.props.imageType,
    });
  }

  // Share button from ShareScreen
  _onPressSharePost = () => {
    if (this.isButtonPressed || (!this.props.isPublic && this.props.recipients.length === 0)) {
      return;
    }

    this.isButtonPressed = true;

    this.setState({ isLoading: true },() => {
      let postBody = isStringEmpty(this.props.postText) ? null : this.props.postText; // sets post body as null if there is no text

      this.props.createPost(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.client.id, this.props.isPublic, this.props.recipients, postBody, this.props.imagePath, this.props.imageType, this.props.placeholderText)
        .then(() => {
          this.props.navigateTo('HomeScreen');
          this.isGoBackPressed = true;
        })
        .catch((error) => {
          this.isButtonPressed = false;
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    });
  }

  // Create button from CreateCircleScreen
  _onPressCreateCircle = () => {
    if (this.isButtonPressed || this.props.recipients.length === 0) {
      return;
    }

    this.isButtonPressed = true;

    this.setState({ isLoading: true },() => {
      this.props.createCircle(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.name, this.props.recipients)
        .then(() => {
          this.props.navigateTo('ShareScreen'); // TODO: figure out better behavior for this
          this.isGoBackPressed = true;
        })
        .catch((error) => {
          this.isButtonPressed = false;
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderBlank() {
    if (this.props.blank) {
      return (
        <RN.View />
      )
    }
  }

  _renderBackIcon() {
    if (this.props.backIcon) {
      return (
        <RN.View style={styles.backView}>
          <RN.TouchableWithoutFeedback
            onPressIn={() => this.backIcon.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
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
        <RN.Text numberOfLines={1} style={[UTILITY_STYLES.regularBlackText18, {maxWidth: scaleImage(125)}, !this.props.backIcon && {marginLeft: 50}]}>
          {this.props.backTitle}
        </RN.Text>
      )
    }
  }

  _renderSettingsIcon() {
    if (this.props.settingsIcon) {
      return (
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.settingsIcon.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
          onPressOut={() => this.settingsIcon.setNativeProps({style: styles.settingsIcon})}
          onPress={() => this.props.navigateTo('MenuScreen')}
          >
          <RN.View style={styles.button}>
            <Icon ref={(ref) => this.settingsIcon = ref} name='options-vertical' style={styles.settingsIcon} />
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

  _renderCustomButton() {
    if (this.props.shareButton || this.props.nextButton || this.props.createCircleButton) {
      let text;
      let func;

      if (this.props.shareButton) {
        text = 'Share';
        func = this._onPressSharePost;
      } else if (this.props.nextButton) {
        text = 'Next';
        func = this._onPressToShare;
      } else if (this.props.createCircleButton) {
        text = 'Create';
        func = this._onPressCreateCircle;
      }

      return (
        <RN.TouchableOpacity onPress={func} style={styles.button} >
          <RN.Text style={styles.customButton}>{text}</RN.Text>
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
    return (
      <RN.View style={[styles.header, !this.props.noBorder && styles.border]}>
        {this._renderBlank()}
        {(this.props.backTitle && !this.props.backIcon) ? this._renderBackTitle() : this._renderBackIcon()}
        {this._renderLogo()}
        {this._renderSettingsIcon()}
        {this._renderCustomButton()}
        {this._renderLoadingModal()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default Header;
