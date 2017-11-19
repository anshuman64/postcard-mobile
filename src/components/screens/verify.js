// Library Imports
import React                                from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';

//--------------------------------------------------------------------//


class Verify extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Verification page
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
    backgroundColor: 'gray'
  },
  title: {
    fontSize: 20,
    color: 'white'
  }
});


//--------------------------------------------------------------------//

export default Verify;
