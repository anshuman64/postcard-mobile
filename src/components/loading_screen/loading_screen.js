// Library Imports
import React                        from 'react';
import { View, ActivityIndicator }  from 'react-native';
import firebase                     from 'react-native-firebase';

// Local Imports
import { toMainNavigator, toLoginScreen }  from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//


class LoadingScreen extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.props.getUserOnAuthStateChange((firebaseUserObj) => {
      if (firebaseUserObj) {
        this.props.receivePhoneNumber({phoneNumber: firebaseUserObj._user.phoneNumber})
        this.props.receiveFirebaseUserObj({firebaseUserObj: firebaseUserObj});

        this.props.getAuthToken(firebaseUserObj).then(() => {
          this.props.createUser(this.props.phoneNumber, this.props.authToken).then(() => {
            this.props.navigation.dispatch(toMainNavigator());
          })
        })
      } else {
        this.props.navigation.dispatch(toLoginScreen());
      }
    })
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    return (
      <View>
        <ActivityIndicator size='large' color='#bdbdbd' />
      </View>
    )
  }
}

//--------------------------------------------------------------------//

export default LoadingScreen;
