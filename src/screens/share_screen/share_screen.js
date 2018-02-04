// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import HeaderContainer        from '../../components/nav_bar_header/header_container.js';
import ShareListItemContainer from '../../components/share_list_item/share_list_item_container.js';
import { styles }             from './share_screen_styles.js';
import { UTILITY_STYLES }     from '../../utilities/style_utility.js';
import { setStateCallback }   from '../../utilities/function_utility.js';

//--------------------------------------------------------------------//

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

class ShareScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isPublic:        false,
      selectedFriends: [],
    };

    this.ds = new RN.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  // Passed to ProfileHeader for tab switching
  setParentState = (state) => {
    let func = () => {
      this.setState(state);
    }

    return func;
  }


  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressHelp = () => {
    RN.Alert.alert('', "Checking 'Public' makes your post visible to everyone in the Discover tab.", [{text: 'OK', style: 'cancel'}]);
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderRow() {
    return (
      (rowData, sectionID, rowID) => (
        <ShareListItemContainer
          id={rowData.id}
          username={rowData.username}
          avatar_url={rowData.avatar_url}
          selectedFriends={this.state.selectedFriends}
          setParentState={this.setParentState}
          />
      )
    )
  }

  _renderCheckbox() {
    if (this.state.isPublic) {
      return (
        <AnimatedIcon
          ref={(ref) => this.checkbox = ref}
          name='check'
          style={styles.checkIcon}
          animation={'flipInY'}
          duration={200}
          />
      )
    } else {
      return (
        <RN.View ref={(ref) => this.checkbox = ref} style={styles.checkbox} />
      )
    }
  }

  _renderHeader = () => {
    return (
      <RN.TouchableOpacity onPress={setStateCallback(this, { isPublic: !this.state.isPublic })}>
        <RN.View style={styles.rowView}>
          <RN.View style={styles.userView}>
            <Icon name={'question'} onPress={this._onPressHelp} style={styles.helpIcon} />
            <RN.Text style={[UTILITY_STYLES.regularBlackText16, UTILITY_STYLES.textRed]}>
              Public
            </RN.Text>
          </RN.View>
          <RN.View style={styles.checkboxView}>
            {this._renderCheckbox()}
          </RN.View>
        </RN.View>
      </RN.TouchableOpacity>
    )
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <HeaderContainer
          backIcon={true}
          backTitle={'Select Friends'}
          shareButton={true}
          postText={this.props.postText}
          placeholderText={this.props.placeholderText}
          imagePath={this.props.imagePath}
          imageType={this.props.imageType}
          selectedFriends={this.state.selectedFriends}
          />
        <RN.ListView
          dataSource={this.ds.cloneWithRows(sampleData)}
          renderRow={this._renderRow()}
          renderHeader={this._renderHeader}
          initialListSize={20}
          pageSize={80}
          enableEmptySections={true}
          showsVerticalScrollIndicator={true}
          onEndReachedThreshold={10000}
          scrollRenderAheadDistance={10000}
        />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default ShareScreen;


export const sampleData = [
  {
    id: 1,
    username: 'anshu',
    avatar_url: 'https://www.google.org/assets/static/images/logo_googledotorg-171e7482e5523603fc0eed236dd772d8.svg'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
]
