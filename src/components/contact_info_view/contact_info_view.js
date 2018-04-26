// Library Imports
import React               from 'react';
import RN                  from 'react-native';
import { PhoneNumberUtil } from 'google-libphonenumber';

// Local Imports
import AvatarContainer                from '../avatar/avatar_container';
import { styles }                     from './contact_info_view_styles';
import { UTILITY_STYLES, scaleImage } from '../../utilities/style_utility';
import { isStringEmpty }              from '../../utilities/function_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  phoneNumber (string): phoneNumber of contact to render
Optional Passed Props:
  marginLeft (int): amount of left margin
*/
class ContactInfoView extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.phoneUtil = PhoneNumberUtil.getInstance();
  }


  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    let contact = this.props.contactsCache[this.props.phoneNumber];
    let avatarUrl;
    let displayName = '';
    let messagePreview = '';
    let number;

    if (contact) {
      avatarUrl = contact.thumbnail;
      contactName = contact.given_name + ' ' + contact.family_name;
      displayName = isStringEmpty(contactName) ? 'anonymous' : contactName;

      try {
        number = this.phoneUtil.format(this.phoneUtil.parse(contact.phone_number));
      } catch (err) {
        number = contact.phone_number;
      }

      messagePreview = contact.type + ': ' + number;
    }

    return (
      <RN.View style={[styles.userView, {marginLeft: this.props.marginLeft}]}>
        <AvatarContainer avatarUrl={avatarUrl} avatarSize={46} iconSize={17} frameBorderWidth={1.1} />
        <RN.View style={styles.usernameView}>
          <RN.Text ref={(ref) => this.usernameText = ref} style={[UTILITY_STYLES.regularBlackText16, {maxWidth: scaleImage(120)}]} numberOfLines={1}>
            {displayName}
          </RN.Text>
          <RN.Text style={styles.messageText} numberOfLines={1}>
            {messagePreview}
          </RN.Text>
        </RN.View>
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default ContactInfoView;
