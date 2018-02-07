// Library Imports
import React from 'react';
import RN    from 'react-native';
import Icon  from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }         from './footer_styles.js';
import { UTILITY_STYLES } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

class Footer extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderButton(screen, iconName) {
    return (
      <RN.TouchableOpacity onPress={() => this.props.navigateTo(screen)} style={styles.button}>
        <Icon name={iconName} style={[styles.icon, this.props.currentScreen === screen && UTILITY_STYLES.textHighlighted]} />
      </RN.TouchableOpacity>
    )
  }

  render() {
    return (
      <RN.View style={styles.footer}>
        {this._renderButton('HomeScreen', 'home')}
        {this._renderButton('DiscoverScreen', 'magnifier')}
        {this._renderButton('NewPostScreen', 'plus')}
        {this._renderButton('FriendScreen', 'people')}
        {this._renderButton('ProfileScreen', 'user')}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default Footer;
