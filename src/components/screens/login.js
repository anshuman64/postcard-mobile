// Library Imports
import React                                from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';

//--------------------------------------------------------------------//


class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Insiya
        </Text>
      </View>
    );
  }
}


//--------------------------------------------------------------------//
// Styles
//--------------------------------------------------------------------//


let styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    background: 'gray'
  },
  title: {
    fontSize: 20,
    color: 'white'
  }
});


//--------------------------------------------------------------------//

export default Login;
