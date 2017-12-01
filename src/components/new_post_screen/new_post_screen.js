// Library Imports
import React                                from 'react';
import { Button, StyleSheet, Text, View }   from 'react-native';
import { connect }                          from 'react-redux';

// Local Imports
import { styles, scaleFactor }              from './new_post_screen_styles.js';
import { toBackScreen }                     from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

class NewPostScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isBackIconPressed: false,
    };
  }

  render() {
    return (
      <View style={[styles.container]}>
        {/* Header */}

        {/* Text Input */}
        <View>
          <Text>NewPost Screen</Text>
          <Button title={'Go Back'} onPress={() => this.props.navigation.dispatch(toBackScreen())} />
        </View>
      </View>
    )
  }
}

//--------------------------------------------------------------------//

export default NewPostScreen;
