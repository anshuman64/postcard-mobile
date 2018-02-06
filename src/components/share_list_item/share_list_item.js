// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as _          from 'lodash';
import { CachedImage } from 'react-native-img-cache';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }           from './share_list_item_styles.js';
import { UTILITY_STYLES }   from '../../utilities/style_utility.js';

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

    let newSelection;

    if (!this.state.isSelected) {
      newSelection = this.props.selectedFriends.push(this.props.id);

      this.setState({ isSelected: true });
      this.props.setParentState({ selectedFriends: newSelection });
    } else {
      let newSelection = _.remove(this.props.selectedFriends, (rowData) => {
        return rowData === this.props.id;
      });

      this.setState({ isSelected: false });
      this.props.setParentState({ selectedFriends: newSelection });
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

  _renderAvatar() {
    let avatarUrl = this.props.usersCache[this.props.userId].avatar_url;

    if (avatarUrl && this.props.imagesCache[avatarUrl]) {
      return (
        <CachedImage
          source={{uri: this.props.imagesCache[avatarUrl].url}}
          style={styles.avatarImage}
          resizeMode={'cover'}
          onError={() => this.props.refreshCredsAndGetImage(this.props.client.firebaseUserObj, avatarUrl)}
          />
      )
    } else if (avatarUrl && !this.props.imagesCache[avatarUrl]) {
      return (
        <RN.View style={{width: 40}} />
      )
    } else {
      return (
        <Icon name='user' style={styles.userIcon} />
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
        <RN.View style={styles.userView}>
          <RN.View style={styles.frame}>
            {this._renderAvatar()}
          </RN.View>
          <RN.Text ref={(ref) => this.usernameText = ref} style={UTILITY_STYLES.regularBlackText15}>
            {this.props.usersCache[this.props.userId].username}
          </RN.Text>
        </RN.View>
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
