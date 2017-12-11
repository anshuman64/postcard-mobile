// Library Imports
import React            from 'react';
import { View, Text }   from 'react-native';
import Icon             from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }  from './post_list_styles.js';
import { monthNames, dayNames, renderDate } from '../../resources/date_names.js';


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

  renderViewMore(onPress){
      return(
        <Text onPress={onPress}>See More</Text>
      )
    }

    renderViewLess(onPress){
      return(
        <Text onPress={onPress}>See Less</Text>
      )
    }

  render() {
    return(
      <View style={ styles.container }>
        <View style={ styles.body }>
          <Text style={ styles.dateText }>
            {renderDate(this.props.item.created_at)}
          </Text>
          <Text style={ styles.bodyText }>
            {this.props.item.body}
          </Text>
          <View style={ styles.detailsView }>
            <Icon name='heart' style={ styles.heartIcon } / >
            <Text style={ styles.likeCountText }>
              {this._renderLikesCount(this.props.item.num_likes)}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

//--------------------------------------------------------------------//

export default PostListItem;
