// Library Imports
import React       from 'react';
import RN          from 'react-native';
import Firebase    from 'react-native-firebase';
import AWS         from 'aws-sdk/dist/aws-sdk-react-native';
import { Actions } from 'react-native-router-flux';
import Icon        from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }            from './group_menu_screen_styles';
import { UTILITY_STYLES }    from '../../utilities/style_utility';
import { defaultErrorAlert } from '../../utilities/error_utility';

//--------------------------------------------------------------------//

class GroupMenuScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressChangeName = () => {

  }

  _onPressAddMembers = () => {

  }

  _onPressLeaveGroup = () => {

  }

  _onPressDeleteGroup = () => {

  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderButton(iconName, text, iconRef, textRef, callback) {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => {
          iconRef.setNativeProps({style: UTILITY_STYLES.textHighlighted})
          textRef.setNativeProps({style: UTILITY_STYLES.textHighlighted})
        }}
        onPressOut={() => {
          iconRef.setNativeProps({style: styles.menuItemIcon})
          textRef.setNativeProps({style: styles.menuItemText})
        }}
        onPress={callback}
        >
        <RN.View style={styles.menuItemView}>
          <Icon
            ref={(ref) => iconRef = ref}
            name={iconName}
            style={styles.menuItemIcon}
            />
          <RN.Text ref={(ref) => textRef = ref} style={styles.menuItemText}>
            {text}
          </RN.Text>
        </RN.View>
     </RN.TouchableWithoutFeedback>
    )
  }

  _renderItem = ({item}) => {
    return null
  }

  _renderHeader() {
    return (
      <RN.View>
        {this._renderButton('pencil', 'Change Group Name', this.pencilIcon, this.pencilText, this._onPressChangeName)}
        {this._renderButton('user-follow', 'Add Members', this.followIcon, this.followText, this._onPressAddMembers)}
        {this._renderButton('logout', 'Leave Group', this.logoutIcon, this.logoutText, this._onPressLeaveGroup)}
        {this._renderButton('close', 'Delete Group', this.closeIcon, this.closeText, this._onPressDeleteGroup)}
     </RN.View>
    )
  }

  _renderSectionHeader = ({section}) => {
    return (
      <RN.View style={UTILITY_STYLES.sectionHeader}>
        <RN.Text style={UTILITY_STYLES.sectionHeaderText}>
          {section.title}
        </RN.Text>
      </RN.View>
    )
  }

  _renderList() {
    return (
      <RN.SectionList
        sections={[{data: this.props.groupsCache[this.props.convoId].users, renderItem: this._renderItem.bind(this), title: 'Members'}]}
        keyExtractor={(item) => item}
        renderSectionHeader={this._renderSectionHeader.bind(this)}
        ListHeaderComponent={this._renderHeader()}
        initialListSize={20}
        pageSize={60}
        showsVerticalScrollIndicator={true}
      />
    )
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        {this._renderList()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default GroupMenuScreen;
