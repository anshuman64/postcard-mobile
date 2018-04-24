// Library Imports
import React           from 'react';
import RN              from 'react-native';
import _               from 'lodash';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import LoadingModal          from '../loading_modal/loading_modal.js';
import UserInfoViewContainer from '../user_info_view/user_info_view_container';
import { styles }            from './checkbox_list_item_styles';
import { UTILITY_STYLES }    from '../../utilities/style_utility';
import { defaultErrorAlert } from '../../utilities/error_utility';

//--------------------------------------------------------------------//

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

/*
Required Passed Props:
  setParentState (func): to set parent state with updated recipients
  recipients (array): array of user and group id's that are selected
Optional Passed Props:
  circle (object): object of the circle being selected
  convoId (int): id of either the user or group being selected
*/
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

    this.isDeleteDisabled = false;
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentWillReceiveProps(nextProps) {
    if (nextProps.convoId) {
      this.setState({ isSelected: nextProps.recipients.includes(nextProps.convoId) });
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
    let group_ids = [];

    let removeFromRecipientArray = (removeId) => {
      _.remove(recipientArray, (id) => {
        return id === removeId;
      });
    }

    _.forEach(this.props.circle.user_ids, (removeId) => {
      removeFromRecipientArray(removeId);
    });

    _.forEach(this.props.circle.group_ids, (removeId) => {
      negativeId = -1 * removeId;
      group_ids.push(negativeId);
      removeFromRecipientArray(negativeId);
    });

    if (!this.state.isSelected) {
      this.props.setParentState({ circles: circleArray.concat(this.props.circle.id), recipients: recipientArray.concat(this.props.circle.user_ids, group_ids) });
    } else {
      _.remove(circleArray, (id) => {
        return id === this.props.circle.id;
      });

      this.props.setParentState({ circles: circleArray, recipients: recipientArray });
    }
  }

  _onPressConvoItem = () => {
    let recipientArray = this.props.recipients.slice();

    if (!this.state.isSelected) {
      this.props.setParentState({ recipients: recipientArray.concat(this.props.convoId) });
    } else {
      _.remove(recipientArray, (id) => {
        return id === this.props.convoId;
      });

      this.props.setParentState({ recipients: recipientArray });
    }
  }

  // Alert that pops up when a user is about to delete a circle
  _onPressDeleteCircle = () => {
    if (this.isDeleteDisabled) {
      return;
    }

    this.isDeleteDisabled = true;

    RN.Alert.alert('', 'Are you sure you want to delete this circle?',
      [{text: 'Cancel', onPress: () => this.isDeleteDisabled = false, style: 'cancel'},
       {text: 'Delete', onPress: this._onConfirmDeleteCircle}],
       {onDismiss: () => this.isDeleteDisabled = false}
    )
  }

  _onConfirmDeleteCircle = () => {
    this.setState({ isLoading: true },() => {
      this.props.deleteCircle(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.circle.id)
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isDeleteDisabled = false;
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
          style={[styles.checkIcon, !this.props.convoId && UTILITY_STYLES.textRed]}
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
    if (this.props.convoId) {
      return (
        <UserInfoViewContainer convoId={this.props.convoId} marginLeft={15} disabled={true} />

      )
    } else if (this.props.circle) {
      return (
        <RN.View style={styles.userView}>
          <RN.View style={styles.frame}>
            <Icon name={'close'} onPress={this._onPressDeleteCircle} style={styles.closeIcon} />
          </RN.View>
          <RN.Text style={UTILITY_STYLES.regularBlackText16}>
            {this.props.circle.name}
          </RN.Text>
        </RN.View>
      )
    } else {
      return (
        <RN.View style={styles.userView}>
          <RN.View style={styles.frame}>
            <Icon name={'question'} onPress={this._onPressHelp} style={styles.questionIcon} />
          </RN.View>
          <RN.Text style={UTILITY_STYLES.regularBlackText16}>
            Public
          </RN.Text>
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

    if (this.props.convoId) {
      func = this._onPressConvoItem;
    } else if (this.props.circle) {
      func = this._onPressCircleItem;
    } else {
      func = this._onPressPublic;
    }

    return (
      <RN.View>
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.checkbox.setNativeProps({style: [styles.checkboxHighlighted, !this.props.convoId && styles.checkboxRed]})}
          onPressOut={() => this.checkbox.setNativeProps({style: styles.checkbox})}
          onPress={func}
          >
          <RN.View style={UTILITY_STYLES.rowView}>
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
