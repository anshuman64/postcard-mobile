// Library Imports
import React       from 'react';
import RN          from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon        from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import ListFooter                         from '../../components/list_footer/list_footer';
import HeaderContainer                    from '../../components/header/header_container';
import MessageListItemContainer           from '../../components/message_list_item/message_list_item_container';
import { styles }                         from './messages_screen_styles';
import { isStringEmpty, setStateCallback} from '../../utilities/function_utility';
import { getEntityDisplayName }           from '../../utilities/entity_utility';
import * as StyleUtility                  from '../../utilities/style_utility';
import { defaultErrorAlert }              from '../../utilities/error_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  convoId (id): id of group or user whose conversation it is with
*/
class MessagesScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      messageText:      '',
      medium:           null,
      takePhotoMedium:  null,
      isLoading:        false,
      isLoadingNew:     false
    };

    this.isMediaButtonPressed             = false;
    this.isSendPressed                    = false;
    this.isLoading                        = false;
    this.onEndReachedCalledDuringMomentum = false;
    this.currentAppState                  = 'active';
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    RN.AppState.addEventListener('change', this._handleAppStateChange);

    let messages = this.props.messages[this.props.convoId];

    if (!messages) {
      this._loadOldMessages();
    } else if (messages && messages.data.length > 0) {
      this._loadNewMessages();
    }
  }

  componentWillUnmount() {
    RN.AppState.removeEventListener('change', this._handleAppStateChange);
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _loadOldMessages = (queryParams) => {
    this.props.getMessages(this.props.client.authToken, this.props.client.firebaseUserObj, false, this.props.convoId, queryParams)
      .catch((error) => {
        defaultErrorAlert(error)
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  _loadNewMessages = () => {
    this.setState({ isLoadingNew: true }, () => {
      this.props.getMessages(this.props.client.authToken, this.props.client.firebaseUserObj, true, this.props.convoId, { start_at: this.props.messages[this.props.convoId].data[0].id, is_new: true })
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.setState({ isLoadingNew: false });
        });
    });
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // When refocusing app, refresh messages
  _handleAppStateChange = (nextAppState) => {
    let messages = this.props.messages[this.props.convoId];

    if (this.currentAppState.match(/inactive|background/) && nextAppState === 'active' && messages && messages.data.length > 0) {
      this._loadNewMessages();
    }

    this.currentAppState = nextAppState;
  }

  _onPressAddMedia = () => {
    if (this.isMediaButtonPressed) {
      return;
    }

    this.isMediaButtonPressed = true;

    ImagePicker.openPicker({
      compressImageMaxHeight: 512,
      compressImageMaxWidth: 512,
      showCropGuidelines: false,
      hideBottomControls: true,
      cropperToolbarColor: 'black',
    })
    .then((medium) => {
      this.setState({ medium: medium, takePhotoMedium: null });
    })
    .catch((error) => {
      error = setErrorDescription(error, 'Add media failed');
      amplitude.logEvent('Media - Add Media', { is_successful: false, error_description: error.description, error_message: error.message });
    })
    .finally(() => {
      this.isMediaButtonPressed = false;
    });

  }

  _onPresstakePhotoMedium = () => {
    if (this.isMediaButtonPressed) {
      return;
    }

    this.isMediaButtonPressed = true;

    ImagePicker.openCamera({
      // TODO: add image size params
    })
    .then((photo) => {
      this.setState({ medium: null, takePhotoMedium: photo });
    })
    .catch((error) => {
      error = setErrorDescription(error, 'Take photo failed');
      amplitude.logEvent('Media - Take Photo', { is_successful: false, error_description: error.description, error_message: error.message });
    })
    .finally(() => {
      this.isMediaButtonPressed = false;
    });

  }

  _onPressSend = () => {
    if (this.isSendPressed || (isStringEmpty(this.state.messageText) && !this.state.medium && !this.state.takePhotoMedium)) {
      return;
    }

    this.isSendPressed = true;
    let messageBody = isStringEmpty(this.state.messageText) ? null : this.state.messageText; // sets post body as null if there is no text

    this.setState({ isLoading: true }, () => {
      this.props.createMessage(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.client.id, this.props.convoId, messageBody, this.state.medium || this.state.takePhotoMedium)
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isSendPressed = false;
          this.setState({ isLoading: false });
        });

        // Leave this out of .then for faster clearing
        this.setState({ messageText: '', medium: null, takePhotoMedium: null });
    })
  }

  _onEndReached = () => {
    let messages = this.props.messages[this.props.convoId];

    if (this.isLoading
        || this.onEndReachedCalledDuringMomentum
        || !messages
        || messages.data.length === 0 // order matters; this might not exist!
        || messages.isEnd) {
      return;
    }

    this.isLoading = true;
    this.onEndReachedCalledDuringMomentum = true;

    let messageData = messages.data;
    let lastMessageId = messageData[messageData.length-1].id;

    this._loadOldMessages({ start_at: lastMessageId });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderTextInputRow() {
    return (
      <RN.View style={styles.textInputRow}>
        <RN.TouchableOpacity style={styles.imageButton} onPress={this._onPresstakePhotoMedium}>
          <Icon name='camera' style={[styles.imageButtonIcon, this.state.takePhotoMedium && StyleUtility.UTILITY_STYLES.textHighlighted]} />
        </RN.TouchableOpacity>
        <RN.TouchableOpacity style={styles.imageButton} onPress={this._onPressAddMedia}>
          <Icon name='picture' style={[styles.imageButtonIcon, this.state.medium && StyleUtility.UTILITY_STYLES.textHighlighted]} />
        </RN.TouchableOpacity>
        <RN.TextInput
          style={styles.textInput}
          placeholderTextColor={StyleUtility.COLORS.grey400}
          placeholder={'Write a message...'}
          returnKeyType={RN.Platform.OS === 'ios' ? null : 'done'}
          onChangeText={(value) => this.setState({ messageText: value })}
          value={this.state.messageText}
          autoFocus={true}
          multiline={true}
          underlineColorAndroid={'transparent'}
          />
        <RN.TouchableOpacity style={styles.sendButton} onPress={this._onPressSend}>
          <Icon name='paper-plane' style={styles.sendButtonIcon} />
        </RN.TouchableOpacity>
      </RN.View>
    )
  }

  _renderItem = ({item, index}) => {
    return (
      <MessageListItemContainer convoId={this.props.convoId} index={index} message={item} />
    )
  }

  _renderFooter = () => {
    let messages = this.props.messages[this.props.convoId];

    if (messages && messages.isEnd) {
      return (
        <ListFooter footerWidth={StyleUtility.scaleFont(150)} text={'Begin Conversation'} />
      )
    } else {
      return (
        <RN.View style={styles.footerView}>
          <RN.ActivityIndicator size='small' color={StyleUtility.COLORS.grey400} />
        </RN.View>
      )
    }
  }

  _renderHeader = () => {
    if (this.state.isLoading || this.state.isLoadingNew) {
      return (
        <RN.View style={[styles.headerView, this.state.isLoadingNew && {justifyContent: 'center'}]}>
          <RN.ActivityIndicator size='small' color={StyleUtility.COLORS.grey400} />
        </RN.View>
      )
    } else {
      return null;
    }
  }

  _renderMessageList() {
    let messages = this.props.messages[this.props.convoId];

    return (
      <RN.FlatList
        ref={(ref) => this.flatList = ref}
        data={messages ? messages.data : null}
        renderItem={this._renderItem.bind(this)}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        initialNumToRender={10}
        maxToRenderPerBatch={25}
        showsVerticalScrollIndicator={false}
        inverted={true}
        onEndReached={this._onEndReached}
        ListFooterComponent={this._renderFooter}
        ListHeaderComponent={this._renderHeader}
        onMomentumScrollBegin={() => this.onEndReachedCalledDuringMomentum = false}
        onEndReachedThreshold={0.01}
        />
    )
  }

  render() {
    let displayName = getEntityDisplayName(this.props.convoId, this.props.usersCache, this.props.groupsCache, this.props.contactsCache);

    return (
      <RN.KeyboardAvoidingView behavior={RN.Platform.OS === 'ios' ? 'padding' : null}>
        <RN.View style={StyleUtility.UTILITY_STYLES.containerStart}>
          <HeaderContainer
            backIcon={true}
            backTitle={displayName + "'s Messages"}
            settingsIcon={this.props.convoId < 0}
            convoId={this.props.convoId}
            />
          {this._renderMessageList()}
          {this._renderTextInputRow()}
        </RN.View>
      </RN.KeyboardAvoidingView>
    )
  }
}

//--------------------------------------------------------------------//

export default MessagesScreen;
