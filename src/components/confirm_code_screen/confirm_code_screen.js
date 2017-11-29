// Library Imports
import React                                from 'react';
import { Button, StyleSheet, Text, View }   from 'react-native';
import { connect }                          from 'react-redux';

// Local Imports
import { styles, scaleFactor }  from './confirm_code_screen_styles.js';
import { toPostsScreen }        from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


class ConfirmCodeScreen extends React.Component {
  render() {
    const {navigation} = this.props;

    return (
      <View>
        <Text>CodeAuth Screen</Text>
        <Button title={'To Posts Screen'} onPress={() => navigation.dispatch(toPostsScreen())} />
      </View>
    )
  }
}


//--------------------------------------------------------------------//


export default ConfirmCodeScreen;
