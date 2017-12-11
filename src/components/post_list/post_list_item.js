// Library Imports
import React  from 'react';
import RN     from 'react-native';
import Icon   from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }      from './post_list_item_styles.js';
import { renderDate }  from '../../utilities/date_time_utility.js';


//--------------------------------------------------------------------//


class PostListItem extends React.PureComponent {
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
            <Icon name='heart' style={ styles.heartIcon } / >
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
