// Library Imports
import React       from 'react';
import RN          from 'react-native';
import Icon        from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon     from 'react-native-vector-icons/Ionicons';
import EvilIcon    from 'react-native-vector-icons/EvilIcons';

// Local Imports
import ListFooter                            from '../../components/list_footer/list_footer.js';
import HeaderContainer                       from '../../components/header/header_container.js';
import MessageListItemContainer              from '../../components/message_list_item/message_list_item_container';
import { styles }                            from './messages_screen_styles.js';
import { setStateCallback, isStringEmpty }   from '../../utilities/function_utility.js';
import { UTILITY_STYLES, COLORS, scaleFont } from '../../utilities/style_utility.js';
import { defaultErrorAlert }                 from '../../utilities/error_utility.js';

//--------------------------------------------------------------------//

class MessagesScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      messageText: '',
      imagePath:   null,
      imageType:   null,
      isLoading:   false,
    };

    this.isSendPressed                    = false;
    this.isLoading                        = false;
    this.onEndReachedCalledDuringMomentum = false;
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    if (!this.props.messages[this.props.userId]) {
      this.props.getMessages(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
        .catch((error) => {
          defaultErrorAlert(error);
        })
    }
  }

  // If selected image from CameraRollScreen, adds image
  componentWillReceiveProps(nextProps) {
    if (nextProps.imagePath && nextProps.imagePath != this.state.imagePath && nextProps.imagePath != this.props.imagePath) {
      this.setState({ imagePath: nextProps.imagePath, imageType: nextProps.imageType })
    }
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressSend = () => {
    if (this.isSendPressed || (isStringEmpty(this.state.messageText) && !this.state.imagePath)) {
      return;
    }

    this.isSendPressed = true;
    let messageBody = isStringEmpty(this.state.messageText) ? null : this.state.messageText; // sets post body as null if there is no text

    this.setState({ isLoading: true }, () => {
      this.props.createMessage(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.client.id, this.props.userId, messageBody, this.state.imagePath, this.state.imageType)
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
    let messages = this.props.messages[this.props.userId];

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
    this.props.getMessages(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId, {start_at: lastMessageId})
      .catch((error) => {
        defaultErrorAlert(error)
      })
      .finally(() => {
        this.isLoading = false;
      });
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
          onChangeText={(value) => this.setState({ messageText: value })}
          value={this.state.messageText}
          autoFocus={true}
          multiline={true}
          returnKeyType={'done'}
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
      <MessageListItemContainer userId={this.props.userId} index={index} message={item} />
    )
  }

  _renderFooter = () => {
    let messages = this.props.messages[this.props.userId];

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
    if (this.state.isLoading) {
      return (
        <RN.View style={styles.headerView}>
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
    let messages = this.props.messages[this.props.userId];

    return (
      <RN.FlatList
        ref={(ref) => this.flatList = ref}
        data={messages ? messages.data : null}
        renderItem={this._renderItem.bind(this)}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        initialNumToRender={25}
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
    let username = this.props.usersCache[this.props.userId] ? this.props.usersCache[this.props.userId].username : null;

    return (
      <RN.KeyboardAvoidingView behavior={RN.Platform.OS === 'ios' ? 'padding' : null}>
        <RN.TouchableWithoutFeedback onPress={RN.Keyboard.dismiss} accessible={false}>
          <RN.View style={UTILITY_STYLES.containerStart}>
            <HeaderContainer
              backIcon={true}
              backTitle={username + "'s Messages"}
              />
            {this._renderMessageList()}
            {this._renderTextInputRow()}
          </RN.View>
        </RN.TouchableWithoutFeedback>
      </RN.KeyboardAvoidingView>
    )
  }
}

//--------------------------------------------------------------------//

export default MessagesScreen;
