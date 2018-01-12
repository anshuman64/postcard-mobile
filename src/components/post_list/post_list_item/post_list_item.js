// Library Imports
import React                         from 'react';
import RN                            from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import * as Animatable               from 'react-native-animatable';
import Icon                          from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons                     from 'react-native-vector-icons/EvilIcons';

// Local Imports
import { styles, scaleHeart }   from './post_list_item_styles.js';
import { renderDate }           from '../../../utilities/date_time_utility.js';
import fontelloConfig           from '../../../assets/fonts/config.json';
import { defaultErrorAlert }    from '../../../utilities/error_utility.js';
import { getImage, deleteFile } from '../../../utilities/file_utility.js';


//--------------------------------------------------------------------//


const IconFilled = createIconSetFromFontello(fontelloConfig);
const AnimatedIconFilled = Animatable.createAnimatableComponent(IconFilled);

class PostListItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      avatarUrl: null,
      imageUrl: null,
    }

    this.isLikeDisabled   = false;
    this.isDeleteDisabled = false;
  }

  componentDidMount() {
    if (this.props.item.author_avatar_url) {
      this._setAvatarUrl(this.props.item.author_avatar_url);
    }

    if (this.props.item.image_url) {
      getImage(this.props.firebaseUserObj, this.props.refreshAuthToken, this.props.item.image_url)
        .then((data) => {
          this.setState({ imageUrl: data });
        })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.id === this.props.item.author_id && nextProps.user.avatar_url != this.props.user.avatar_url) {
      this._setAvatarUrl(nextProps.user.avatar_url);
    }
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _setAvatarUrl(avatarUrl) {
    getImage(this.props.firebaseUserObj, this.props.refreshAuthToken, avatarUrl)
      .then((data) => {
        this.setState({ avatarUrl: data });
      })
  }

  _onPressLike() {
    if (this.isLikeDisabled) {
      return;
    }

    this.isLikeDisabled = true;

    if (this.props.item.is_liked_by_user) {
      this.props.deleteLike(this.props.authToken, this.props.firebaseUserObj, this.props.user.id, this.props.item.id)
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isLikeDisabled = false;
        });
    } else {
      this.props.createLike(this.props.authToken, this.props.firebaseUserObj, this.props.user.id, { post_id: this.props.item.id })
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isLikeDisabled = false;
        });
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
    if (this.isDeleteDisabled) {
      return;
    }

    this.isDeleteDisabled = true;

    if (this.props.item.image_url) {
      this._deleteImageFile(this.props.item.image_url);
    } else {
      this._deletePost();
    }
  }

  //TODO: render spinner
  _deleteImageFile(key) {
    deleteFile(this.props.firebaseUserObj, this.props.refreshAuthToken, key)
      .then((data) => {
        this._deletePost();
      })
      .catch((error) => {
        this.isDeleteDisabled = false;
        defaultErrorAlert(error);
      })
  }

  _deletePost() {
    this.props.deletePost(this.props.authToken, this.props.firebaseUserObj, this.props.user.id, this.props.item.id)
      .then((deletedPost) => {
        this.isDeleteDisabled = false;
        this.container.fadeOut(1000)
          .then(() => {
            this.props.removePost({ post: deletedPost, userId: this.props.user.id });
          })
          .catch(() => this.props.removePost({ post: deletedPost, userId: this.props.user.id  }));
      }, (error) => {
        this.isDeleteDisabled = false;
        defaultErrorAlert(error);
      });
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
      <RN.View style={styles.headerView}>
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.usernameText.setNativeProps({style: styles.textHighlighted})}
          onPressOut={() => this.usernameText.setNativeProps({style: styles.usernameText})}
          onPress={() => this.props.navigateToProfile({ userId: this.props.item.author_id, username: this.props.item.author_username, avatarUrl: this.props.item.author_avatar_url })}
          style={styles.userView}
          >
          <RN.View style={styles.userView}>
            <RN.Image source={{uri: this.state.avatarUrl}} style={styles.avatarImage} resizeMode={'contain'} />
            <RN.Text ref={(ref) => this.usernameText = ref} style={styles.usernameText}>
              {this.props.item.author_username}
            </RN.Text>
          </RN.View>
        </RN.TouchableWithoutFeedback>
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

  // uri: 'https://s3.amazonaws.com/insiya-users/hello.jpg',
  // method: 'GET',
  // headers: {
  //   'Authorization': 'AWS4-HMAC-SHA256 Credential=AKIAIRQS2UB5N25VO62A/20180111/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=3f4bea1dc9b8173dca9ecea5eb5de580c754372eba746604b737328b0dc7c458'
  // }}}

  _renderPostImage() {
    if (true) {
      return (
        <RN.Image style={styles.bodyImage} resizeMode={'cover'} source={{
          uri: 'https://s3.amazonaws.com/insiya-users/hello.jpg',
          method: 'GET',
          headers: {
            'X-Amz-Content-Sha256': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            'X-Amz-Date': '20180112T032040Z',
            'Authorization': 'AWS4-HMAC-SHA256 Credential=AKIAIRQS2UB5N25VO62A/20180112/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=004df2290460899d4b31675a75d1cd5586a454a37e1906daa48a31b6dc60edc4'
          }}}
        />
      )
    }
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
          {this._renderPostImage()}
          {this._renderPostFooter()}
        </RN.View>
      </Animatable.View>
    )
  }
}



//--------------------------------------------------------------------//

export default PostListItem;
