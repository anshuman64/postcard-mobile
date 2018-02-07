// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as _          from 'lodash';
import { CachedImage } from 'react-native-img-cache';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import UserInfoViewContainer from '../user_info_view/user_info_view_container.js';
import { styles }            from './share_list_item_styles.js';
import { UTILITY_STYLES }    from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

class ShareListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isSelected:  false,
    }
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressItem = () => {
    // If this item is the Public item
    if (!this.props.userId) {
      this.setState({ isSelected: !this.state.isSelected });
      this.props.setParentState({ isPublic: !this.props.isPublic });
      return;
    }

    if (!this.state.isSelected) {
      this.setState({ isSelected: true });
      this.props.setParentState({ recipients: this.props.recipients.concat(this.props.userId) });
    } else {
      this.setState({ isSelected: false });
      this.props.setParentState({ recipients: this.props.recipients.splice(this.props.userId, 1) });
    }
  }

  _onPressHelp = () => {
    RN.Alert.alert('', "Checking 'Public' makes your post visible to everyone in the 'Recent' tab.", [{text: 'OK', style: 'cancel'}]);
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderCheckbox() {
    if (this.state.isSelected) {
      return (
        <AnimatedIcon
          ref={(ref) => this.checkbox = ref}
          name='check'
          style={[styles.checkIcon, !this.props.userId && UTILITY_STYLES.textRed]}
          animation={'flipInY'}
          duration={200}
          />
      )
    } else {
      return (
        <RN.View ref={(ref) => this.checkbox = ref} style={styles.checkbox} />
      )
    }
  }

  _renderUserView() {
    if (!this.props.userId) {
      return (
        <RN.View style={styles.userView}>
          <RN.View style={styles.frame} />
          <RN.Text ref={(ref) => this.usernameText = ref} style={UTILITY_STYLES.regularBlackText16}>
            Public
          </RN.Text>
          <Icon name={'question'} onPress={this._onPressHelp} style={styles.helpIcon} />
        </RN.View>
      )
    } else {
      return (
        <UserInfoViewContainer userId={this.props.userId} marginLeft={15} />
      )
    }
  }

  render() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => {
          this.usernameText.setNativeProps({style: [UTILITY_STYLES.textHighlighted, !this.props.userId && UTILITY_STYLES.textRed]})
          this.checkbox.setNativeProps({style: [styles.checkboxHighlighted, !this.props.userId && styles.checkboxRed]})
        }}
        onPressOut={() => {
          this.usernameText.setNativeProps({style: [UTILITY_STYLES.regularBlackText15, !this.props.userId && UTILITY_STYLES.regularBlackText16]})
          this.checkbox.setNativeProps({style: styles.checkbox})
        }}
        onPress={this._onPressItem}
        >
        <RN.View style={styles.rowView}>
          {this._renderUserView()}
          <RN.View style={styles.checkboxView}>
            {this._renderCheckbox()}
          </RN.View>
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }
}


//--------------------------------------------------------------------//

export default ShareListItem;
