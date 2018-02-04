// Library Imports
import React     from 'react';
import RN        from 'react-native';
import Icon      from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }         from './footer_styles.js';
import { UTILITY_STYLES } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


class Footer extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.footer}>
        <RN.TouchableOpacity
          onPress={() => this.props.navigateTo('HomeScreen')}
          style={styles.button}
          >
          <Icon name='home' style={[styles.icon, this.props.currentScreen === 'HomeScreen' && UTILITY_STYLES.textHighlighted]} />
        </RN.TouchableOpacity>
        <RN.TouchableOpacity
          onPress={() => this.props.navigateTo('DiscoverScreen')}
          style={styles.button}
          >
          <Icon name='magnifier' style={[styles.icon, this.props.currentScreen === 'DiscoverScreen' && UTILITY_STYLES.textHighlighted]} />
        </RN.TouchableOpacity>
        <RN.TouchableOpacity
          onPress={() => this.props.navigateTo('NewPostScreen')}
          style={styles.button}
          >
          <Icon name='plus' style={styles.iconBig} />
        </RN.TouchableOpacity>
        <RN.TouchableOpacity
          onPress={() => this.props.navigateTo('FriendScreen')}
          style={styles.button}
          >
          <Icon name='people' style={[styles.icon, this.props.currentScreen === 'FriendScreen' && UTILITY_STYLES.textHighlighted]} />
        </RN.TouchableOpacity>
        <RN.TouchableOpacity
          onPress={() => this.props.navigateTo('ProfileScreen')}
          style={styles.button}
          >
          <Icon name='user' style={[styles.icon, this.props.currentScreen === 'ProfileScreen' && UTILITY_STYLES.textHighlighted]} />
        </RN.TouchableOpacity>
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default Footer;
