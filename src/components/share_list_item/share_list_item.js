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

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//


  _renderCheckbox() {
    if (this.state.isSelected) {
      return (
        <AnimatedIcon
          ref={(ref) => this.checkbox = ref}
          name='check'
          style={styles.checkIcon}
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
    if (this.props.avatar_url && this.props.imagesCache[this.props.avatar_url]) {
      return (
        <CachedImage
          source={{uri: this.props.imagesCache[this.props.avatar_url].url}}
          style={styles.avatarImage}
          resizeMode={'cover'}
          onError={() => this.props.refreshCredsAndGetImage(this.props.firebaseUserObj, this.props.avatar_url)}
          />
      )
    } else if (this.props.avatar_url && !this.props.imagesCache[this.props.avatar_url]) {
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
    return (
      <RN.View style={styles.userView}>
        {this._renderAvatar()}
        <RN.Text ref={(ref) => this.usernameText = ref} style={UTILITY_STYLES.regularBlackText15}>
          {this.props.username}
        </RN.Text>
      </RN.View>
    )
  }

  render() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => {
          this.usernameText.setNativeProps({style: UTILITY_STYLES.textHighlighted})
          this.checkbox.setNativeProps({style: styles.checkboxHighlighted})
        }}
        onPressOut={() => {
          this.usernameText.setNativeProps({style: UTILITY_STYLES.regularBlackText15})
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
