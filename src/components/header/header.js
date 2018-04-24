// Library Imports
import React       from 'react';
import RN          from 'react-native';
import Icon        from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon     from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

// Local Imports
import LoadingModal                   from '../loading_modal/loading_modal.js'
import { styles }                     from './header_styles';
import { UTILITY_STYLES, scaleImage } from '../../utilities/style_utility';
import { isStringEmpty }              from '../../utilities/function_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  -
Optional Passed Props:
  postText (string): text of the post to be shared, coming from NewPostScreen and/or CreateCircleScreen
  imagePath (string): folder path of image to upload to AWS
  placeholderText (string): placeholder text of NewPostScreen to send to analytics
  imageType (string): type of image for AWS uploading purposed
  isPublic (bool): if new post should be public or not from NewPostScreen
  recipients (array): users to be passed to API from 1) CreateCircleScreen, 2) CreateGroupScreen, or 3) AddGroupMembersScreen
  convoId (int): group id when adding members to the group
  blank (bool): leave blank space for ProfileTabs
  backIcon (bool): add a back icon
  backTitle (string): title for back icon
  settingsIcon (bool): add the three-dots settings icon for ProfileTabs or GroupMenuScreen
  logo (bool): add a logo for HomeScreen
  noBorder (bool): remove bottom border for ProfileTabs
  shareButton (bool): ShareScreen share button
  nextButton (bool): NewPostScreen next button
  createCircleButton (bool): CreateCircleScreen create button
  createGroupButton (bool): CreateGroupScreen create button
  addGroupMembersButton (bool): AddGroupMembersScreen add button
*/
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
    this.isButtonPressed = false;
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
    if (isStringEmpty(this.props.postText) && !this.props.imagePath) {
      return;
    }

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
          this.props.navigateTo('AuthoredScreen');
          this.isGoBackPressed = true;
        })
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isButtonPressed = false;
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
      this.props.createCircle(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.circleName, this.props.recipients)
        .then(() => {
          Actions.popTo('ShareScreen');
          this.isGoBackPressed = true;
        })
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isButtonPressed = false;
          this.setState({ isLoading: false });
        });
    });
  }


  // Create button from CreateGroupScreen
  _onPressCreateGroup = () => {
    if (this.isButtonPressed || this.props.recipients.length === 0) {
      return;
    }

    this.isButtonPressed = true;

    this.setState({ isLoading: true },() => {
      this.props.createGroup(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.recipients)
        .then(() => {
          this.props.navigateTo('FriendScreen');
          this.isGoBackPressed = true;
        })
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isButtonPressed = false;
          this.setState({ isLoading: false });
        });
    });
  }

  _onPressAddGroupMembers = () => {
    if (this.isButtonPressed || this.props.recipients.length === 0) {
      return;
    }

    this.isButtonPressed = true;

    this.setState({ isLoading: true },() => {
      this.props.addGroupMembers(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.convoId, this.props.recipients)
        .then(() => {
          this.props.goBack();
          this.isGoBackPressed = true;
        })
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isButtonPressed = false;
          this.setState({ isLoading: false });
        });
    });

  }

  _onPressSettings = () => {
    // If coming from ProfileTabs
    if (this.props.blank) {
      this.props.navigateTo('MenuScreen');
    // If coming from MessagesScreen
    } else {
      this.props.navigateTo('GroupMenuScreen', { convoId: this.props.convoId });
    }
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
          onPress={this._onPressSettings}
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
    if (this.props.shareButton || this.props.nextButton || this.props.createCircleButton || this.props.createGroupButton || this.props.addGroupMembersButton) {
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
      } else if (this.props.createGroupButton) {
        text = 'Create';
        func = this._onPressCreateGroup;
      } else if (this.props.addGroupMembersButton) {
        text = 'Add';
        func = this._onPressAddGroupMembers;
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
