// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import HeaderContainer    from '../../components/nav_bar_header/header_container.js';
import RequestListItem    from '../../components/request_list_item/request_list_item.js';
import { styles }         from './share_screen_styles.js';
import { UTILITY_STYLES } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


class RequestScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
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
  // Render Methods
  //--------------------------------------------------------------------//

  _renderRow() {
    return (
      (rowData, sectionID, rowID) => (
        <ShareListItem
          id={rowData.id}
          username={rowData.username}
          avatar_url={rowData.avatar_url}
          selectedFriends={this.state.selectedFriends}
          setParentState={this.setParentState}
          />
      )
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
          style={styles.ListView}
          renderRow={this._renderRow()}
          initialListSize={20}
          pageSize={80}
          contentContainerStyle={styles.contentContainerStyle}
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

export default RequestScreen;


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
