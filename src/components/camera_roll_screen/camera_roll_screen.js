// Library Imports
import React   from 'react';
import RN      from 'react-native';
import _       from 'lodash';
import Ionicon from 'react-native-vector-icons/Ionicons'

// Local Imports
import { DEVICE_DIM }         from '../../utilities/style_utility.js';
import { styles }             from './camera_roll_screen_styles.js';
import { defaultErrorAlert }  from '../../utilities/error_utility.js';

//--------------------------------------------------------------------//

const IMAGE_HEIGHT = DEVICE_DIM.width / 3;
const PAGE_SIZE = Math.ceil(DEVICE_DIM.height / IMAGE_HEIGHT) * 3;

class CameraRollScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    this.getPhotos(999999999);
  }

  getPhotos = (first, after) => {
    RN.CameraRoll.getPhotos({first: first, after: after})
      .then((data) => {
        this.setState({ images: this.state.images.concat(data.edges) });

        if (data.page_info.has_next_page) {
          this.getPhotos(999999999, data.page_info.end_cursor);
        }
      })
  }


  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//



  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderCameraRoll() {
    return (
      <RN.FlatList
        data={ this.state.images }
        renderItem={ this._renderItem.bind(this) }
        keyExtractor={(item, index) => index}
        style={ styles.cameraRoll }
        contentContainerStyle={styles.contentContainerStyle}
        numColumns={3}
        initialNumToRender={PAGE_SIZE}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({length: IMAGE_HEIGHT, offset: IMAGE_HEIGHT * index, index})}
        />
    )
  }
// content://media/external/images/media/450
  _renderItem = ({item}) => {
    return (
      <RN.View style={styles.imageContainer}>
        <RN.View style={styles.iconBackground}>
          <Ionicon name='md-image' style={styles.imageIcon} />
        </RN.View>
        <RN.Image
          ref={(ref) => this.image = ref}
          source={{uri: item.node.image.uri}}
          resizeMode={'cover'}
          style={styles.image}
          />
      </RN.View>
    )
  }

  render() {
    return (
      <RN.View style={ styles.container }>
        {this._renderCameraRoll()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default CameraRollScreen;
