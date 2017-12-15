// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { COLORS }                          from '../../utilities/style_utility.js';
import { toHomeScreen, toLoginScreen }     from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//


class LoadingScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    let successCallback = () => {
      this.props.navigation.dispatch(toHomeScreen());
    };

    let errorCallback = () => {
      this.props.navigation.dispatch(toLoginScreen());
    };

    this.unsubscribe = this.props.attemptToLoginUser(successCallback, errorCallback);
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View>
        <RN.ActivityIndicator size='large' color={COLORS.grey400} />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default LoadingScreen;
