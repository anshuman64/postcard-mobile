// Library Imports
import React     from 'react';
import RN        from 'react-native';
import Icon      from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles } from './footer_styles.js';

//--------------------------------------------------------------------//


class TabBar extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.footer}>
        <RN.TouchableOpacity onPress={() => this.props.navigateTo('AuthoredPostsTab')}>
          <RN.Text style={[styles.text, this.props.currentScreen === '_AuthoredPostsTab' && styles.textHighlighted]} >
            Posts
          </RN.Text>
        </RN.TouchableOpacity>
        <RN.TouchableOpacity onPress={() => this.props.navigateTo('LikedPostsTab')}>
          <RN.Text style={[styles.text, this.props.currentScreen === '_LikedPostsTab' && styles.textHighlighted]} >
            Liked
          </RN.Text>
        </RN.TouchableOpacity>
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default TabBar;
