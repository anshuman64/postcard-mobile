// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import { styles }         from './tab_bar_styles';
import { UTILITY_STYLES } from '../../utilities/style_utility';


//--------------------------------------------------------------------//

/*
Required Passed Props:
  -
Optional Passed Props:
  userId (int): user id if on ProfileTabs or UserScreen
*/
class TabBar extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderTab(text, screen, props) {
    return (
      <RN.TouchableOpacity onPress={() => this.props.navigateTo(screen, props)} style={styles.button}>
        <RN.Text allowFontScaling={false} style={[UTILITY_STYLES.lightBlackText16, { marginBottom: 5 }, this.props.currentScreen === screen && UTILITY_STYLES.textHighlighted]}>
          {text}
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }

  render() {
    let currentScreen = this.props.screen;

    return (
      <RN.View style={styles.tabs}>
        {this._renderTab('Posts', 'AuthoredScreen', { userId: this.props.userId })}
        {this._renderTab('Liked', 'LikedScreen', { userId: this.props.userId })}
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default TabBar;
