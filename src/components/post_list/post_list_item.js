// Library Imports
import React      from 'react';
import RN         from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import Icon       from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }      from './post_list_item_styles.js';
import { renderDate }  from '../../utilities/date_time_utility.js';
import fontelloConfig  from '../../assets/fonts/config.json';


const IconFilled = createIconSetFromFontello(fontelloConfig);

//--------------------------------------------------------------------//


class PostListItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLiked: false,
    };
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _onPressLike() {
    if (!this.state.isLiked) {
      this.props.createLike(this.props.authToken, { post_id: this.props.item.id })
        .then(() => {
          this.setState({ isLiked: true })
      })
    } else {
      this.props.deleteLike(this.props.authToken, this.props.item.id)
        .then(() => {
          this.setState({ isLiked: false })
      })
    }
  }

  _renderLikesCount(count) {
    // If likes < 1000, render the number as-is
    if (count < 1000) {
      return count;
    // If likes are > 1000, return format 'xxx.xK'
    } else if (count < 1000000000){
      return (Math.floor(count / 100) / 10).toFixed(1) + 'K';
    // If likes are > 1 milion, return format 'xxx.xM'
    } else {
      return (Math.floor(count / 100000) / 10).toFixed(1) + 'M';
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return(
      <RN.View style={ styles.container }>
        <RN.View style={ styles.body }>
          <RN.Text style={ styles.dateText }>
            {renderDate(this.props.item.created_at)}
          </RN.Text>
          <RN.Text style={ styles.bodyText }>
            {this.props.item.body}
          </RN.Text>
          <RN.View style={ styles.detailsView }>
            <RN.TouchableWithoutFeedback
              onPressIn={() => this._onPressLike()}
              >
              {this.state.isLiked ?
                <IconFilled name='heart-filled' style={ styles.heartIcon } /> :
                <Icon name='heart' style={ styles.heartIcon } />
              }
            </RN.TouchableWithoutFeedback>
            <RN.Text style={ styles.likeCountText }>
              {this._renderLikesCount(this.props.item.num_likes)}
            </RN.Text>
          </RN.View>
        </RN.View>
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default PostListItem;
