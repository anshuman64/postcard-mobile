// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import ShareListItem      from '../../components/share_list_item/share_list_item.js';
import { UTILITY_STYLES } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

const sampleData = [
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
]


class ShareScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <ShareListItem username={'anshu'} avatar_url={'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'}/>
        <ShareListItem username={'anshu'} avatar_url={'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'}/>
        <ShareListItem username={'anshu'} avatar_url={'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'}/>
        <ShareListItem username={'anshu'} avatar_url={'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'}/>
  </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default ShareScreen;
