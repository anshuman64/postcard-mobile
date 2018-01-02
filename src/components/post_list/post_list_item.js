// Library Imports
import React                         from 'react';
import RN                            from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import * as Animatable               from 'react-native-animatable';
import Icon                          from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons                     from 'react-native-vector-icons/EvilIcons';

// Local Imports
import { styles, scaleHeart } from './post_list_item_styles.js';
import { renderDate }         from '../../utilities/date_time_utility.js';
import fontelloConfig         from '../../assets/fonts/config.json';
import { defaultErrorAlert }  from '../../utilities/error_utility.js';


//--------------------------------------------------------------------//


const IconFilled = createIconSetFromFontello(fontelloConfig);
const AnimatedIconFilled = Animatable.createAnimatableComponent(IconFilled);

class PostListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _onPressLike() {
    if (this.props.item.is_liked_by_user) {
      this.props.deleteLike(this.props.authToken, this.props.firebaseUserObj, this.props.item.id)
        .catch((error) => defaultErrorAlert(error))
    } else {
      this.props.createLike(this.props.authToken, this.props.firebaseUserObj, { post_id: this.props.item.id })
        .catch((error) => defaultErrorAlert(error))
    }
  }

  _onPressDelete = () => {
    RN.Alert.alert(
      '',
      'Are you sure you want to delete this post?',
      [
        {text: 'Cancel', onPress: () => null, style: 'cancel'},
        {text: 'Delete', onPress: this._onConfirmDelete},
      ],
    )
  }

  _onConfirmDelete = () => {
    this.props.deletePost(this.props.authToken, this.props.firebaseUserObj, this.props.item.id)
      .then((deletedPost) => {
        this.container.fadeOut(1000)
          .then(() => {
            this.props.removePost(deletedPost);
          })
          .catch(() => this.props.removePost(deletedPost));
      }, (error) => defaultErrorAlert(error));
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

  _renderPostHeader() {
    return (
      <RN.View style={[styles.headerView, (this.props.user.id != this.props.item.author_id) && styles.headerViewSmall]}>
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.closeIcon.setNativeProps({style: styles.textHighlighted})}
          onPressOut={() => this.closeIcon.setNativeProps({style: styles.closeIcon})}
          onPress={this._onPressDelete}
          disabled={this.props.user.id != this.props.item.author_id}
          >
          <EvilIcons ref={(ref) => this.closeIcon = ref} name='close' style={[styles.closeIcon, (this.props.user.id != this.props.item.author_id) && styles.transparent]}/>
        </RN.TouchableWithoutFeedback>
      </RN.View>
    )
  }

  _renderPostBody() {
    return (
      <RN.Text style={[styles.bodyText, this.props.item.body.length > 85 && styles.smallBodyText]}>
        {this.props.item.body}
      </RN.Text>
    )
  }

  _renderPostFooter() {
    return (
      <RN.View style={ styles.footerView }>
        <RN.View style={styles.likesView}>
          <RN.TouchableWithoutFeedback onPressIn={() => this._onPressLike()}>
            {this.props.item.is_liked_by_user ?
              <AnimatedIconFilled
                name='heart-filled'
                animation={scaleHeart}
                duration={750}
                style={ styles.filledHeartIcon }
                /> :
              <Icon name='heart' style={ styles.heartIcon } />
            }
          </RN.TouchableWithoutFeedback>
          <RN.Text style={ styles.likeCountText }>
            {this._renderLikesCount(this.props.item.num_likes)}
          </RN.Text>
        </RN.View>
        <RN.Text style={ styles.dateText }>
          {renderDate(this.props.item.created_at)}
        </RN.Text>
      </RN.View>
    )
  }

  render() {
    return(
      <Animatable.View ref={(ref) => this.container = ref} style={ styles.container }>
        <RN.View style={ styles.post }>
          {this._renderPostHeader()}
          {this._renderPostBody()}
          {this._renderPostFooter()}
        </RN.View>
      </Animatable.View>
    )
  }
}

//--------------------------------------------------------------------//

export default PostListItem;
