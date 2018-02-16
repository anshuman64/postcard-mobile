// Library Imports
import React from 'react';
import RN    from 'react-native';
import Icon  from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }         from './footer_styles';
import { UTILITY_STYLES } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

class Footer extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderButton(screen, iconName, isCenter) {
    return (
      <RN.TouchableOpacity onPress={() => this.props.navigateTo(screen)} style={styles.button}>
        <Icon name={iconName} style={[styles.icon, isCenter && styles.iconBig, this.props.currentScreen === screen && UTILITY_STYLES.textHighlighted]} />
      </RN.TouchableOpacity>
    )
  }

  render() {
    return (
      <RN.View style={styles.footer}>
        {this._renderButton('HomeScreen', 'home')}
        {this._renderButton('DiscoverScreen', 'magnifier')}
        {this._renderButton('NewPostScreen', 'plus', true)}
        {this._renderButton('FriendScreen', 'people')}
        {this._renderButton('ProfileScreen', 'user')}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default Footer;
