// Library Imports
import React  from 'react';
import RN     from 'react-native';
import _      from 'lodash';

// Local Imports
import LoadingModal             from '../loading_modal/loading_modal';
import EntityInfoViewContainer    from '../entity_info_view/entity_info_view_container';
import { styles }               from './list_modal_styles';
import * as StyleUtility        from '../../utilities/style_utility';
import { COUNTRY_CODES }        from '../../utilities/country_utility';
import { defaultErrorAlert }    from '../../utilities/error_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  isModalVisible (bool): determines if modal should be visible
  setParentState (func): used on CancelButton to close modal
Optional Passed Props:
  recipientIds (array): array of convoIds of recipient users and groups
  authorId (int): id of author of post; used to go to right messages
  postId (int): id of post to send to messages
  countryIndex (int): index of selected country in country_utility to determine scroll position
  setCountry (func): changes LoginScreen state with new country and country code. Used as proxy for login screen
*/
class ListModal extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);
    const ds = new RN.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource:     ds.cloneWithRows(COUNTRY_CODES),
      isModalMounted: false,
      isLoading:      false
    };

    this.isReplyDisabled = false;
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Renders the RN.ScrollView after other modal contents are mounted for performance
  componentDidMount() {
    setTimeout(() => this.setState({ isModalMounted: true }), 10);
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // Scrolls directly to the currently selected country when RN.ScrollView is opened
  _onListViewContentSizeChange = () => {
    let height = 0.85 * StyleUtility.getUsableDimensions().height;
    let countryPosition = this.props.countryIndex * 45 - 2; // countryIndex * height of each bar minus aesthetic two pixels
    let maxPosition = COUNTRY_CODES.length * 45 - (height - 50 - 45); // length of full list minus length of one page of scrollView
    this.scrollView.scrollTo({x: 0, y: Math.min(countryPosition, maxPosition), animated: true})
  }

  // Navigates to messages of selected group or user
  _onPressReply(convoId) {
    if (this.isReplyDisabled) {
      return;
    }

    this.isReplyDisabled = true;

    RN.Alert.alert('', 'Reply to this post as a message?',
      [{text: 'Cancel', onPress: () => this.isReplyDisabled = false, style: 'cancel'},
       {text: 'Reply', onPress: () => this._onConfirmReply(convoId)}],
       {onDismiss: () => this.isReplyDisabled = false}
    )
  }

  _onConfirmReply(convoId) {
    let revisedConvoId = this.props.client.id === convoId ? this.props.authorId : convoId;

    this.setState({ isLoading: true },() => {
      this.props.createMessage(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.client.id, revisedConvoId, null, null, this.props.postId)
        .then(() => {
          this.setState({ isLoading: false }, () => {
            this.props.setParentState({ isModalVisible: false });
            this.props.navigateTo('MessagesScreen', { convoId: revisedConvoId });
          });
        })
        .catch((error) => {
          this.setState({ isLoading: false }, () => {
            defaultErrorAlert(error);
          });
        });
    });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderTitle() {
    let titleString;

    if (this.props.setCountry) {
      titleString = 'Select Country';
    } else if (this.props.isModalForReply) {
      titleString = 'Reply To';
    } else {
      titleString = 'Recipients';
    }

    return (
      <RN.View style={styles.titleView}>
        <RN.Text allowFontScaling={false} style={StyleUtility.UTILITY_STYLES.regularBlackText16}>
          {titleString}
        </RN.Text>
      </RN.View>
    )
  }

  _renderCountryList() {
    if (this.props.setCountry) {
      if(this.state.isModalMounted) {
        return (
          <RN.ScrollView
            ref={(ref) => this.scrollView = ref}
            style={styles.listView}
            onContentSizeChange={this._onListViewContentSizeChange}
            >
            {this._renderCountryListItem()}
          </RN.ScrollView>
        )
      } else {
        return (
          <RN.ActivityIndicator size='small' color={StyleUtility.COLORS.grey400}  />
        )
      }
    } else {
      return null;
    }
  }

  _renderCountryListItem() {
    if (this.props.setCountry) {
      let rows = [];

      for (i = 0; i < COUNTRY_CODES.length; i++) {
        rows.push(
          <RN.TouchableWithoutFeedback
            onPressIn={() => {
              this.countryText.setNativeProps({style: StyleUtility.UTILITY_STYLES.textHighlighted})
              this.dialingCodeText.setNativeProps({style: StyleUtility.UTILITY_STYLES.textHighlighted})
            }}
            onPressOut={() => {
              this.countryText.setNativeProps({style: StyleUtility.UTILITY_STYLES.lightBlackText15})
              this.dialingCodeText.setNativeProps({style: StyleUtility.UTILITY_STYLES.lightBlackText15})
            }}
            onPress={this.props.setCountry(i)}
            key={i}
            >
            <RN.View style={styles.rowContainer}>
              <RN.Text
                allowFontScaling={false}
                ref={(ref) => this.countryText = ref}
                style={StyleUtility.UTILITY_STYLES.lightBlackText15}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {COUNTRY_CODES[i].country_name}
              </RN.Text>
              <RN.Text allowFontScaling={false} ref={(ref) => this.dialingCodeText = ref} style={StyleUtility.UTILITY_STYLES.lightBlackText15}>
                {COUNTRY_CODES[i].dialing_code}
              </RN.Text>
            </RN.View>
          </RN.TouchableWithoutFeedback>
        )
      }

      return rows;
    } else {
      return null;
    }
  }

  _renderRecipientList() {
    if (!this.props.setCountry) {
      return (
        <RN.SectionList
          sections={[{data: this.props.recipientIds, renderItem: this._renderItem.bind(this)}]}
          style={[styles.listView, { height: this.props.recipientIds.length * 60 }]}
          keyExtractor={(item, index) => String(index)}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
          initialNumToRender={20}
          windowSize={20}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
        />
      )
    } else {
      return null;
    }
  }

  _renderSectionHeader = ({section}) => {
    return null;
  }

  _renderItem({item}) {
    let user = this.props.usersCache[item];
    let isDisabled = !this.props.isModalForReply || (user && !user.firebase_uid);

    return (
      <RN.TouchableOpacity onPress={() => this._onPressReply(item)} disabled={isDisabled}>
        <RN.View style={[styles.rowContainer, {height: 60}]}>
          <EntityInfoViewContainer entityId={item} marginLeft={10} subtractWidth={170} disableUsername={this.props.isModalForReply} disableAvatar={this.props.isModalForReply} />
        </RN.View>
      </RN.TouchableOpacity>
    )
  }

  _renderCancelButton() {
    let cancelString = this.props.setCountry ? 'Cancel' : 'Close';

    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => this.cancelButtonText.setNativeProps({style: StyleUtility.UTILITY_STYLES.textHighlighted})}
        onPressOut={() => this.cancelButtonText.setNativeProps({style: StyleUtility.UTILITY_STYLES.lightBlackText15})}
        onPress={() => this.props.setParentState({ isModalVisible: false })}
      >
        <RN.View style={styles.cancelButtonView}>
          <RN.Text allowFontScaling={false} ref={(ref) => this.cancelButtonText = ref} style={StyleUtility.UTILITY_STYLES.lightBlackText15}>
            {cancelString}
          </RN.Text>
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }

  _renderLoadingModal() {
    return (
      <LoadingModal isLoading={this.state.isLoading}/>
    )
  }

  render() {
    return(
      <RN.Modal
        visible={this.props.isModalVisible}
        onRequestClose={() => this.props.setParentState({ isModalVisible: false })}
        transparent={false}
        animationType={'none'}
        >
        <RN.View style={StyleUtility.UTILITY_STYLES.containerCenter}>
          <RN.View style={styles.container}>
            {this._renderTitle()}
            {this._renderCountryList()}
            {this._renderRecipientList()}
            {this._renderCancelButton()}
          </RN.View>
          {this._renderLoadingModal()}
        </RN.View>
      </RN.Modal>
    )
  }
}


//--------------------------------------------------------------------//


export default ListModal;
