// Library Imports
import React       from 'react';
import RN          from 'react-native';
import Icon        from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon     from 'react-native-vector-icons/Ionicons';
import EvilIcon    from 'react-native-vector-icons/EvilIcons';

// Local Imports
import ListFooter                                              from '../../components/list_footer/list_footer';
import HeaderContainer                                         from '../../components/header/header_container';
import MessageListItemContainer                                from '../../components/message_list_item/message_list_item_container';
import { styles }                                              from './messages_screen_styles';
import { setStateCallback, isStringEmpty, getConvo, getConvoDisplayName }   from '../../utilities/function_utility';
import { UTILITY_STYLES, COLORS, scaleFont }                   from '../../utilities/style_utility';
import { defaultErrorAlert }                                   from '../../utilities/error_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  convoId (id): id of group or user whose conversation it is with
Optional Screen Props:
  imagePath (string): path of image if coming from CameraRollScreen
*/
class MessagesScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      messageText:  '',
      imagePath:    null,
      imageType:    null,
      isLoading:    false,
      isLoadingNew: false
    };

    this.isSendPressed                    = false;
    this.isLoading                        = false;
    this.onEndReachedCalledDuringMomentum = false;
    this.currentAppState = 'active';
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

  // If selected image from CameraRollScreen, adds image
  componentWillReceiveProps(nextProps) {
    if (nextProps.imagePath && nextProps.imagePath != this.state.imagePath && nextProps.imagePath != this.props.imagePath) {
      this.setState({ imagePath: nextProps.imagePath, imageType: nextProps.imageType })
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

  _onPressSend = () => {
    if (this.isSendPressed || (isStringEmpty(this.state.messageText) && !this.state.imagePath)) {
      return;
    }

    this.isSendPressed = true;
    let messageBody = isStringEmpty(this.state.messageText) ? null : this.state.messageText; // sets post body as null if there is no text

    this.setState({ isLoading: true }, () => {
      this.props.createMessage(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.client.id, this.props.convoId, messageBody, this.state.imagePath, this.state.imageType)
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isSendPressed = false;
          this.setState({ isLoading: false });
        });

        // Leave this out of .then for faster clearing
        this.setState({ messageText: '', imagePath: null, imageType: null });
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
        <RN.TouchableOpacity style={styles.imageButton} onPress={() => this.props.navigateTo('CameraRollScreen', { isAvatar: false })}>
          <Ionicon name='md-images' style={styles.imageButtonIcon} />
        </RN.TouchableOpacity>
        <RN.TextInput
          style={styles.textInput}
          placeholderTextColor={COLORS.grey400}
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
        <ListFooter footerWidth={scaleFont(150)} text={'Begin Conversation'} />
      )
    } else {
      return (
        <RN.View style={styles.footerView}>
          <RN.ActivityIndicator size='small' color={COLORS.grey400} />
        </RN.View>
      )
    }
  }

  _renderHeader = () => {
    if (this.state.isLoading || this.state.isLoadingNew) {
      return (
        <RN.View style={[styles.headerView, this.state.isLoadingNew && {justifyContent: 'center'}]}>
          <RN.ActivityIndicator size='small' color={COLORS.grey400} />
        </RN.View>
      )
    } else if (this.state.imagePath) {
      return (
        <RN.ImageBackground source={{uri: this.state.imagePath}} style={styles.image} resizeMode={'contain'}>
          <RN.TouchableWithoutFeedback style={styles.closeButton} onPress={setStateCallback(this, { imagePath: null, imageType: null })}>
            <RN.View style={styles.closeButtonBackground}>
              <EvilIcon name='close' style={styles.closeIcon} />
            </RN.View>
          </RN.TouchableWithoutFeedback>
        </RN.ImageBackground>
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
    let convo = getConvo(this.props.convoId, this.props.usersCache, this.props.groupsCache);
    let displayName = getConvoDisplayName(this.props.convoId, this.props.usersCache, this.props.groupsCache);

    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <HeaderContainer
          backIcon={true}
          backTitle={displayName + "'s Messages"}
          settingsIcon={this.props.convoId < 0}
          convoId={this.props.convoId}
          />
        {this._renderMessageList()}
        {this._renderTextInputRow()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default MessagesScreen;
