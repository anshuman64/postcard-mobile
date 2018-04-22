// Library Imports
import React  from 'react';
import RN     from 'react-native';
import * as _ from 'lodash';

// Local Imports
import { styles }                                      from './list_modal_styles';
import UserInfoViewContainer                           from '../user_info_view/user_info_view_container';
import { UTILITY_STYLES, COLORS, getUsableDimensions } from '../../utilities/style_utility';
import { COUNTRY_CODES }                               from '../../utilities/country_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  isModalVisible (bool): determines if modal should be visible
  setParentState (func): used on CancelButton to close modal
Optional Passed Props:
  recipientIds (array): array of convoIds of recipient users and groups
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
      dataSource:         ds.cloneWithRows(COUNTRY_CODES),
      isModalMounted:     false,
    };
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
    let height = 0.85 * getUsableDimensions().height;
    let countryPosition = this.props.countryIndex * 45 - 2; // countryIndex * height of each bar minus aesthetic two pixels
    let maxPosition = COUNTRY_CODES.length * 45 - (height - 50 - 45); // length of full list minus length of one page of scrollView
    this.scrollView.scrollTo({x: 0, y: Math.min(countryPosition, maxPosition), animated: true})
  }

  // Navigates to messages of selected group or user
  _onNavigateToMessages(convoId) {
    this.props.navigateTo('MessagesScreen', { convoId: convoId });
    this.props.setParentState({ isModalVisible: false });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderTitle() {
    let titleString = this.props.setCountry ? 'Select Country' : 'Recipients';

    return (
      <RN.View style={styles.titleView}>
        <RN.Text style={UTILITY_STYLES.regularBlackText16}>
          {titleString}
        </RN.Text>
      </RN.View>
    )
  }

  _renderScrollView() {
    if(this.state.isModalMounted) {
      return (
        <RN.ScrollView
          ref={(ref) => this.scrollView = ref}
          style={[styles.listView, this.props.recipientIds ? { height: this.props.recipientIds.length * 60 } : null]}
          onContentSizeChange={this.setCountry ? this._onListViewContentSizeChange : null}
          >
          {this._renderCountryListItem()}
          {this._renderRecipientListItem()}
        </RN.ScrollView>
      )
    } else {
      return (
        <RN.ActivityIndicator size='small' color={COLORS.grey400}  />
      )
    }
  }

  _renderCountryListItem() {
    if (this.props.setCountry) {
      let rows = [];

      for (i = 0; i < COUNTRY_CODES.length; i++) {
        rows.push(
          <RN.TouchableWithoutFeedback
            onPressIn={() => {
              this.countryText.setNativeProps({style: UTILITY_STYLES.textHighlighted})
              this.dialingCodeText.setNativeProps({style: UTILITY_STYLES.textHighlighted})
            }}
            onPressOut={() => {
              this.countryText.setNativeProps({style: UTILITY_STYLES.lightBlackText15})
              this.dialingCodeText.setNativeProps({style: UTILITY_STYLES.lightBlackText15})
            }}
            onPress={this.props.setCountry(i)}
            key={i}
            >
            <RN.View style={styles.rowContainer}>
              <RN.Text
                ref={(ref) => this.countryText = ref}
                style={UTILITY_STYLES.lightBlackText15}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {COUNTRY_CODES[i].country_name}
              </RN.Text>
              <RN.Text ref={(ref) => this.dialingCodeText = ref} style={UTILITY_STYLES.lightBlackText15}>
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

  _renderRecipientListItem() {
    if (!this.props.setCountry) {
      let rows = [];

      for (i = 0; i < this.props.recipientIds.length; i++) {
        rows.push(
          <RN.TouchableOpacity key={i} onPress={() => this._onNavigateToMessages(this.props.recipientIds[i])}>
            <RN.View style={[styles.rowContainer, {height: 60}]}>
                <UserInfoViewContainer convoId={this.props.recipientIds[i]} marginLeft={10} />
            </RN.View>
          </RN.TouchableOpacity>
        )
      }

      return rows;
    } else {
      return null;
    }
  }

  _renderCancelButton() {
    let cancelString = this.props.setCountry ? 'Cancel' : 'Close';

    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => this.cancelButtonText.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
        onPressOut={() => this.cancelButtonText.setNativeProps({style: UTILITY_STYLES.lightBlackText15})}
        onPress={() => this.props.setParentState({ isModalVisible: false })}
      >
        <RN.View style={styles.cancelButtonView}>
          <RN.Text ref={(ref) => this.cancelButtonText = ref} style={UTILITY_STYLES.lightBlackText15}>
            {cancelString}
          </RN.Text>
        </RN.View>
      </RN.TouchableWithoutFeedback>
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
        <RN.View style={UTILITY_STYLES.containerCenter}>
          <RN.View style={styles.container}>
            {this._renderTitle()}
            {this._renderScrollView()}
            {this._renderCancelButton()}
          </RN.View>
        </RN.View>
      </RN.Modal>
    )
  }
}


//--------------------------------------------------------------------//


export default ListModal;
