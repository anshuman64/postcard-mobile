// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as _          from 'lodash';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import LoadingModal          from '../loading_modal/loading_modal.js';
import UserInfoViewContainer from '../user_info_view/user_info_view_container';
import { styles }            from './checkbox_list_item_styles';
import { UTILITY_STYLES }    from '../../utilities/style_utility';

//--------------------------------------------------------------------//

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

class CheckboxListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isSelected: false,
      isLoading:  false,
    }

    this.isDeletePressed = false;
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId) {
      this.setState({ isSelected: nextProps.recipients.includes(nextProps.userId) });
    } else if (nextProps.circle) {
      this.setState({ isSelected: nextProps.circles.includes(nextProps.circle.id) });
    } else {
      this.setState({ isSelected: nextProps.isPublic });
    }
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressPublic = () => {
    this.props.setParentState({ isPublic: !this.props.isPublic });
  }

  _onPressCircleItem = () => {
    let recipientArray = this.props.recipients.slice();
    let circleArray = this.props.circles.slice();

    if (!this.state.isSelected) {
      _.forEach(this.props.circle.user_ids, (removeId) => {
        _.remove(recipientArray, (id) => {
          return id === removeId;
        });
      });

      this.props.setParentState({ circles: circleArray.concat(this.props.circle.id), recipients: recipientArray.concat(this.props.circle.user_ids) });
    } else {
      _.forEach(this.props.circle.user_ids, (removeId) => {
        _.remove(recipientArray, (id) => {
          return id === removeId;
        });
      });

      _.remove(circleArray, (id) => {
        return id === this.props.circle.id;
      });

      this.props.setParentState({ circles: circleArray, recipients: recipientArray });
    }
  }

  _onPressUserItem = () => {
    let recipientArray = this.props.recipients.slice();

    if (!this.state.isSelected) {
      this.props.setParentState({ recipients: recipientArray.concat(this.props.userId) });
    } else {
      _.remove(recipientArray, (id) => {
        return id === this.props.userId;
      });

      this.props.setParentState({ recipients: recipientArray });
    }
  }

  _onPressDelete = () => {
    if (this.isDeletePressed) {
      return;
    }

    this.isButtonPressed = true;

    this.setState({ isLoading: true },() => {
      this.props.deleteCircle(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.circle.id)
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isButtonPressed = false;
          this.setState({ isLoading: false });
        });
    });
  }

  _onPressHelp = () => {
    RN.Alert.alert('', "Checking 'Public' makes your post visible to everyone in the 'Recent' tab.", [{text: 'OK', style: 'cancel'}]);
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderCheckbox() {
    if (this.state.isSelected) {
      return (
        <AnimatedIcon
          ref={(ref) => this.checkbox = ref}
          name='check'
          style={[styles.checkIcon, !this.props.userId && UTILITY_STYLES.textRed]}
          animation={'flipInY'}
          duration={200}
          />
      )
    } else {
      return (
        <RN.View ref={(ref) => this.checkbox = ref} style={styles.checkbox} />
      )
    }
  }

  _renderItemView() {
    if (this.props.userId) {
      return (
        <UserInfoViewContainer userId={this.props.userId} marginLeft={15} disabled={true} />

      )
    } else if (this.props.circle) {
      return (
        <RN.View style={styles.userView}>
          <RN.View style={styles.frame} />
          <RN.Text style={UTILITY_STYLES.regularBlackText16}>
            {this.props.circle.name}
          </RN.Text>
          <Icon name={'close'} onPress={this._onPressDelete} style={styles.icon} />
        </RN.View>
      )
    } else {
      return (
        <RN.View style={styles.userView}>
          <RN.View style={styles.frame} />
          <RN.Text style={UTILITY_STYLES.regularBlackText16}>
            Public
          </RN.Text>
          <Icon name={'question'} onPress={this._onPressHelp} style={styles.icon} />
        </RN.View>
      )
    }
  }

  _renderLoadingModal() {
    return (
      <LoadingModal isLoading={this.state.isLoading}/>
    )
  }

  render() {
    let func;

    if (this.props.userId) {
      func = this._onPressUserItem;
    } else if (this.props.circle) {
      func = this._onPressCircleItem;
    } else {
      func = this._onPressPublic;
    }

    return (
      <RN.View>
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.checkbox.setNativeProps({style: [styles.checkboxHighlighted, !this.props.userId && styles.checkboxRed]})}
          onPressOut={() => this.checkbox.setNativeProps({style: styles.checkbox})}
          onPress={func}
          >
          <RN.View style={styles.rowView}>
            {this._renderItemView()}
            <RN.View style={styles.checkboxView}>
              {this._renderCheckbox()}
            </RN.View>
          </RN.View>
        </RN.TouchableWithoutFeedback>
        {this._renderLoadingModal()}
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default CheckboxListItem;
