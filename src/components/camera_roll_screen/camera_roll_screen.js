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

const PAGE_SIZE = Math.ceil(DEVICE_DIM.height / DEVICE_DIM.width / 3) * 3;

class CameraRollScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.ds = new RN.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

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
        this.setState({ images: this.state.images.concat(data.edges) }, () => {
          if (data.page_info.has_next_page) {
            this.getPhotos(999999999, data.page_info.end_cursor);
          }
        });
      })
      .catch((error) => {
        Alert.alert(
          '',
          'Could not load images. Please try again later.',
          [
            {text: 'OK', onPress: () => null, style: 'cancel'},
          ],
        )
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
      <RN.ListView
        dataSource={this.ds.cloneWithRows(this.state.images)}
        style={ styles.cameraRoll }
        renderRow={this._renderRow()}
        initialListSize={PAGE_SIZE * 2}
        pageSize={PAGE_SIZE * 10}
        contentContainerStyle={styles.contentContainerStyle}
      />
    )
  }

  _renderRow = () => {
    return (
      (rowData, sectionID, rowID) => (
        <RN.View style={styles.imageContainer}>
          <RN.View style={styles.iconBackground}>
            <Ionicon name='md-image' style={styles.imageIcon} />
          </RN.View>
          <RN.Image
            ref={(ref) => this.image = ref}
            source={{uri: rowData.node.image.uri}}
            resizeMode={'cover'}
            style={styles.image}
            />
        </RN.View>
      )
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
