// Library Imports
import React     from 'react';
import RN        from 'react-native';
import Icon      from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles } from './footer_styles.js';

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
          <Icon name='home' style={[styles.icon, this.props.currentScreen === '_HomeScreen' && styles.textHighlighted]} />
        </RN.TouchableOpacity>
        <RN.TouchableOpacity
          onPress={() => this.props.navigateTo('ProfileScreen')}
          style={styles.button}
          >
          <Icon name='user' style={[styles.icon, this.props.currentScreen === '_ProfileScreen' && styles.textHighlighted]} />
        </RN.TouchableOpacity>
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default Footer;
