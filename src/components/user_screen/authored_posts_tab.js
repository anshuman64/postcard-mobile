// Library Imports
import React  from 'react';
import RN     from 'react-native';
import Icon   from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import PostListContainer  from '../post_list/post_list_container.js';
import { POST_TYPES }     from '../../actions/post_actions.js';


//--------------------------------------------------------------------//

class AuthoredPostsTab extends React.PureComponent {
  static navigationOptions = ({navigation}) => ({
    header:
    <RN.View style={styles.header}>
      <RN.TouchableWithoutFeedback
        onPressIn={() => this.options.setNativeProps({style: {color: 'blue'}})}
        onPress={() => this.props.navigation.dispatch(goBack())}
        >
        <Icon
          ref={(ref) => this.options = ref}
          name='options-vertical'
          onPress={() => navigation.dispatch(toMenuScreen())}
          style={styles.optionsIcon}
          />
      </RN.TouchableWithoutFeedback>
        <RN.Image
          style={styles.headerTitle}
          source={require('../../assets/images/logo/logo.png')}
          resizeMode='contain'
          />
        <Icon
          name='note'
          onPress={() => navigation.dispatch(toNewPostScreen())}
          style={styles.noteIcon}
          />
    </RN.View>,
  })

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this.props.refreshPosts(this.props.authToken, POST_TYPES.AUTHORED)
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderHeader = () => {
    return (
      <RN.View style={styles.header}>
        <RN.TouchableWithoutFeedback
          onPressIn={setStateInAnimationFrame(this, { isBackIconPressed: true})}
          onPressOut={setStateInAnimationFrame(this, { isBackIconPressed: false})}
          onPress={() => this.props.navigation.dispatch(goBack())}
          >
          <RN.Text>Hey</RN.Text>
        </RN.TouchableWithoutFeedback>
      </RN.View>
    )
  }

  render() {
    return (
      <RN.View style={styles.container} >
        {this._renderHeader()}
        <PostListContainer posts={this.props.authoredPosts} postType={POST_TYPES.AUTHORED} />
      </RN.View>
    )
  }
}

const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 100,
    bottom: 100,
  }
})

//--------------------------------------------------------------------//

export default AuthoredPostsTab;
