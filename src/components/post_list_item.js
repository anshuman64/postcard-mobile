// Library Imports
import React                                from 'react';
import { Button, StyleSheet, Text, View, FlatList }   from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

// Local Imports
import { styles, scaleFactor }  from './post_list_item_styles.js';


//--------------------------------------------------------------------//

class PostListItem extends React.PureComponent {
  _renderLikesCount(count) {
    if (count < 1000) {
      return count;
    } else if (count < 1000000000){
      return (Math.floor(count / 100) / 10).toFixed(1) + 'K';
    } else {
      return count;
    }
  }

  _renderDate(date) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    let todayDate = new Date();
    let postDate = new Date(date);
    let diff = todayDate - postDate;
    let hoursDiff = diff / (1000 * 3600);

    let hour = postDate.getHours();
    let m = 'AM';
    if (hour === 0) {
      hour = 12;
    } else if (hour >= 12) {
      m = 'PM';
      hour = hour % 12;
    }

    if (hoursDiff < 20) {
      return Math.floor(hoursDiff) + ' hrs';
    } else if (diff < 172800000 && todayDate.getDate() - postDate.getDate() === 1) {
      return 'Yesterday at ' + hour + ':' + postDate.getMinutes() + m;
    } else if (diff < 604800000) {
      return dayNames[postDate.getDay()]+ ' at ' + hour + ':' + postDate.getMinutes() + m;
    } else {
      return monthNames[postDate.getMonth()] + ' ' + postDate.getDate() + ' at ' + hour + ':' + postDate.getMinutes() + m;
    }
  }

  render() {
    return(
      <View style={[styles.container]}>
        <View style={[styles.body]}>
          <Text style={[styles.text]}>
            {this.props.item.body}
          </Text>
          <View style={[styles.detailsView]}>
            <Icon name='heart' style={[styles.icon]} />
            <Text style={[styles.likeCountText]}>
              {this._renderLikesCount(this.props.item.num_likes)}
            </Text>
            <Text style={[styles.dateText]}>
              {this._renderDate(this.props.item.created_at)}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

//--------------------------------------------------------------------//

export default PostListItem;
