// Library Imports
import React                     from 'react';
import RN                        from 'react-native';
import { addNavigationHelpers }  from 'react-navigation';
import Icon                      from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon                   from 'react-native-vector-icons/Ionicons';

// Local Imports
import { AppNavigator } from './app_navigator.js';
import { goBack }       from '../actions/navigation_actions.js';


class AppWithNavigationState extends React.Component {
  componentDidMount() {
    RN.BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    RN.BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  // TODO: Fix this
  onBackPress = () => {
    // Exit app if on LoginScreen or on HomeScreen
    // if ((this.props.nav.routes[0].routes.length === 1) || (this.props.nav.routes.length === 2 && this.props.nav.routes[1].routes[0].routes.length === 1)) {
    //   return false;
    // }

    this.props.dispatch(goBack());
    return true;
  };

  render() {
    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state:    this.props.nav
    });

    return <AppNavigator navigation={ navigation } />;
  }
}


//--------------------------------------------------------------------//

export default AppWithNavigationState;
