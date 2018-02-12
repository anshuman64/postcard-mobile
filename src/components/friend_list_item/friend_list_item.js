// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';

// Local Imports
import { styles }            from './friend_list_item_styles.js';
import { UTILITY_STYLES }    from '../../utilities/style_utility.js';
import { renderMessageDate } from '../../utilities/date_time_utility.js';

//--------------------------------------------------------------------//

class FriendListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isSelected:  false,
    }

    this.isFriendDisabled = false;
  }


  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderDate() {
    return (
      <RN.Text style={styles.dateText}>
        {renderMessageDate(this.props.item.createdAt)}
      </RN.Text>
    )
  }

  _renderAvatar() {
    let avatarPath = this.props.usersCache[this.props.userId] ? this.props.usersCache[this.props.userId].avatar_url : null;
    let avatarUrl = this.props.imagesCache[avatarPath] ? this.props.imagesCache[avatarPath].url : null;

    if (avatarPath && avatarUrl) {
      return (
        <RN.Image
          source={{uri: avatarUrl}}
          style={styles.avatarImage}
          resizeMode={'cover'}
          onError={() => this.props.refreshCredsAndGetImage(this.props.client.firebaseUserObj, avatarPath)}
          />
      )
    } else if (avatarPath && !avatarUrl) {
      return (
        <RN.View style={{width: 40}} />
      )
    } else {
      return (
        <RN.View style={styles.frameBorder}>
          <Icon name='user' style={styles.userIcon} />
        </RN.View>
      )
    }
  }

  _renderUsernameView() {
    return (
      <RN.View style={styles.usernameView}>
        <RN.Text style={UTILITY_STYLES.lightBlackText15}>
          {'username'}
        </RN.Text>
        <RN.Text style={styles.messageText}>
          {'message'}
        </RN.Text>
      </RN.View>
    )
  }

  render() {
    return (
      <RN.View style={styles.rowView}>
        <RN.View style={styles.userView}>
          <RN.View style={styles.frame}>
            {this._renderAvatar()}
          </RN.View>
          {this._renderUsernameView()}
        </RN.View>
        {this._renderDate()}
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default FriendListItem;
