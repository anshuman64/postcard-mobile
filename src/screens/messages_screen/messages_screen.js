// Library Imports
import React       from 'react';
import RN          from 'react-native';
import Ionicon     from 'react-native-vector-icons/Ionicons';
import EvilIcon    from 'react-native-vector-icons/EvilIcons';

// Local Imports
import HeaderContainer                    from '../../components/header/header_container.js';
import { styles }                         from './messages_screen_styles.js';
import { getRandomInt, setStateCallback } from '../../utilities/function_utility.js';
import { postPlaceholders }              from '../../utilities/file_utility.js';
import { UTILITY_STYLES, COLORS }         from '../../utilities/style_utility.js';

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
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // If selected image from CameraRollScreen, adds image
  componentWillReceiveProps(nextProps) {
    if (nextProps.imagePath) {
      this.setState({ imagePath: nextProps.imagePath, imageType: nextProps.imageType })
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderTextInput() {
    return (
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
    )
  }

  _renderImage() {
    if (this.state.imagePath) {
      return (
        <RN.ImageBackground source={{uri: this.state.imagePath}} style={styles.image} resizeMode={'contain'}>
          <RN.TouchableWithoutFeedback style={styles.closeButton} onPress={setStateCallback(this, { imagePath: null, imageType: null })}>
            <RN.View style={styles.closeButtonBackground}>
              <EvilIcon name='close' style={styles.closeIcon} />
            </RN.View>
          </RN.TouchableWithoutFeedback>
        </RN.ImageBackground>
      )
    }
  }

  _renderImageButton() {
    return (
      <RN.View style={styles.imageButtonView}>
        <RN.TouchableOpacity style={styles.imageButtonView} onPress={() => this.props.navigateTo('CameraRollScreen', { isAvatar: false })}>
          <Ionicon name='md-images' style={styles.imageButtonIcon} />
          <RN.Text style={styles.imageButtonText}>
            Photos
          </RN.Text>
        </RN.TouchableOpacity>
      </RN.View>
    )
  }

  _renderItem = ({item}) => {
    return (
      <RN.View>
        <RN.Text>hey</RN.Text>
      </RN.View>
    )
  }

  _renderMessageList() {
    let messageData = this.props.messagesCache[this.props.userId];

    return (
      <RN.FlatList
        ref={(ref) => this.flatList = ref}
        data={messageData ? messageData : null}
        renderItem={this._renderItem.bind(this)}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        initialNumToRender={25}
        maxToRenderPerBatch={25}
        showsVerticalScrollIndicator={false}
        inverted={true}
        onEndReached={this._onEndReached}
        ListFooterComponent={this._renderFooter}
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
              backTitle={'Create Post'}
              />
            {this._renderMessageList()}
            {this._renderImage()}
            {this._renderImageButton()}
            {this._renderTextInput()}
          </RN.View>
        </RN.TouchableWithoutFeedback>
      </RN.KeyboardAvoidingView>
    )
  }
}

//--------------------------------------------------------------------//

export default MessagesScreen;
