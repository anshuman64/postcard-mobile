// Library Imports
import React from 'react';
import RN    from 'react-native';
import Icon  from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  userId (int): userId of user to fetch avatar_url
  avatarSize (int): how big the avatar frame should be
  frameBorderWidth (int): how thick the frame should be
  iconSize (int): how big the person icon should be
Optional Passed Props:
  avatarUrl (string): passed from AvatarScreen to render pending avatar
*/
class Avatar extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderAvatar() {
    let user = this.props.usersCache[this.props.userId];
    let avatarPath = user ? user.avatar_url : null;
    let avatarImage = this.props.imagesCache[avatarPath];
    let avatarUrl = avatarImage ? avatarImage.url : null;

    if (this.props.avatarUrl) {
      avatarUrl = this.props.avatarUrl;
    }

    if ((avatarPath && avatarUrl) || this.props.avatarUrl) {
      return (
        <RN.Image
          source={{uri: avatarUrl}}
          style={{
            height: this.props.avatarSize,
            width: this.props.avatarSize,
            borderRadius: StyleUtility.getImageBorderRadius(this.props.avatarSize)
          }}
          resizeMode={'cover'}
          onError={() => this.props.refreshCredsAndGetImage(this.props.client.firebaseUserObj, avatarPath)}
          />
      )
    } else if (avatarPath && !avatarUrl) {
      return (
        <RN.View style={{width: this.props.avatarSize}} />
      )
    } else {
      return (
        <RN.View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: this.props.avatarSize - 4,
          width: this.props.avatarSize - 4,
          borderWidth: this.props.frameBorderWidth,
          borderColor: StyleUtility.COLORS.grey800,
          borderRadius: (this.props.avatarSize - 4) / 2,
        }}>
          <Icon name='user' style={{
            fontSize: this.props.iconSize,
            textAlign: 'center',
            color: StyleUtility.COLORS.grey900,
          }}
          />
        </RN.View>
      )
    }
  }

  render() {
    return (
      <RN.View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: this.props.avatarSize,
        width: this.props.avatarSize,
      }}
      >
        {this._renderAvatar()}
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default Avatar;
