// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { toMainNavigator, toLoginScreen }  from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//


class LoadingScreen extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.props.attemptToLoginUser()
      // .then(() => {
      //   this.props.navigation.dispatch(toMainNavigator());
      // }).catch(this.props.navigation.dispatch(toLoginScreen()))
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    return (
      <RN.View>
        <RN.ActivityIndicator size='large' color='#bdbdbd' />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default LoadingScreen;
