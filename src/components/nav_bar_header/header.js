// Library Imports
import React       from 'react';
import RN          from 'react-native';
import Icon        from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon     from 'react-native-vector-icons/Ionicons';

// Local Imports
import LoadingModal          from '../loading_modal/loading_modal.js'
import { styles }            from './header_styles.js';
import { UTILITY_STYLES }    from '../../utilities/style_utility.js';
import { isStringEmpty }     from '../../utilities/function_utility.js';
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

    this.isNextPressed   = false;
    this.isSharePressed  = false;
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

  _onPressNext = () => {
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

  // Attempts to upload image to AWS S3 and save post to DB
  _onPressShare = () => {
    if (this.isSharePressed) {
      return;
    }

    this.isSharePressed = true;

    this.setState({ isLoading: true },() => {
      let postBody = isStringEmpty(this.props.postText) ? null : this.props.postText; // sets post body as null if there is no text

      this.props.createPost(this.props.authToken, this.props.firebaseUserObj, this.props.client.id, postBody, this.props.imagePath, this.props.imageType, this.props.placeholderText)
        .then(() => {
          this.props.goBack({ scrollToTop: Date() }); // sets scrollToTop to new Date to signal to postList to scrollToTop
        })
        .catch((error) => {
          this.isSharePressed = false;
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
        <RN.Text style={[UTILITY_STYLES.regularBlackText18, !this.props.backIcon && {marginLeft: 50}]}>
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

  _renderShareButton() {
    if (this.props.shareButton || this.props.nextButton) {
      return (
        <RN.TouchableOpacity onPress={this.props.shareButton ? this._onPressShare : this._onPressNext} style={styles.button} >
          <RN.Text style={styles.shareButton}>{this.props.shareButton ? 'Share' : 'Next'}</RN.Text>
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
        {this._renderShareButton()}
        {this._renderLoadingModal()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default Header;
