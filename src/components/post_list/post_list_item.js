// Library Imports
import React            from 'react';
import { View, Text }   from 'react-native';
import Icon             from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles, scaleFactor }  from './post_list_styles.js';
import { monthNames, dayNames } from '../../resources/date_names.js';


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

  _renderDate(date) {
    let todayDate = new Date(); // current date-time
    let postDate = new Date(date); // post's date-time
    let diff = todayDate - postDate; // time difference in milliseconds
    let hoursDiff = diff / (1000 * 3600); // time difference in hours

    let hour = postDate.getHours();
    let m = 'AM';
    // If postDate is at 00:xx, change to 12:xx
    if (hour === 0) {
      hour = 12;
    // If postDate is after noon, change to 12:xx PM
    } else if (hour >= 12) {
      m = 'PM';
      hour = hour % 12;
    }

    // If postDate was < 20 hours ago, return format 'xx hours ago'
    if (hoursDiff < 20) {
      return Math.floor(hoursDiff) + ' hours ago';
    // If postDate was within 48 hours ago and the day was 1 day ago, return format 'Yesterday at xx:xx AM'
    } else if (diff < 172800000 && todayDate.getDate() - postDate.getDate() === 1) {
      return 'Yesterday at ' + hour + ':' + postDate.getMinutes() + m;
    // If postDate was within the last week, return format '[dayName] at xx:xx AM'
    } else if (diff < 604800000) {
      return dayNames[postDate.getDay()]+ ' at ' + hour + ':' + postDate.getMinutes() + m;
    // Else, return format '[monthName] [date] at xx:xx AM'
    } else {
      return monthNames[postDate.getMonth()] + ' ' + postDate.getDate() + ' at ' + hour + ':' + postDate.getMinutes() + m;
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
      <View style={[styles.itemContainer]}>
        <View style={[styles.body]}>
          <Text style={[styles.dateText]}>
            {this._renderDate(this.props.item.created_at)}
          </Text>
          <Text style={[styles.bodyText]}>
            {this.props.item.body}
          </Text>
          <View style={[styles.detailsView]}>
            <Icon name='heart' style={[styles.heartIcon]} / >
            <Text style={[styles.likeCountText]}>
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
