// Library Imports
import _                                      from 'lodash';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

// Local Imports
import { isStringEmpty } from './function_utility';

//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

// Returns user, group, or contact depending on entityId
export const getEntity = (entityId, usersCache, groupsCache, contactsCache) => {
  let entity;

  if (_.isString(entityId)) {
    entity = contactsCache[entityId];
  } else if (entityId > 0) {
    entity = usersCache[entityId];
  } else if (entityId < 0) {
    entity = groupsCache[entityId];
  }

  return entity;
}

// Returns comma separated list of users
const getTempGroupName = (users, usersCache, groupsCache, contactsCache) => {
  let string = '';

  // If there's only one person in a group, denote it
  if (users.length === 0) {
    return '(Empty Group)';
  } else if (users.length === 1) {
    return '(Group) ' + getEntityDisplayName(users[0].id, usersCache, groupsCache, contactsCache);
  } else {
    // Else, return comma separated list of usernames
    for (i = 0; i < users.length - 1; i++) {
      string += getEntityDisplayName(users[i].id, usersCache, groupsCache, contactsCache) + ', ';
    }

    string += getEntityDisplayName(users[users.length-1].id, usersCache, groupsCache, contactsCache);

    return string;
  }
}
export const getContactDisplayName = (contact) => {
  firstName = contact.given_name  || '';
  lastName  = contact.family_name || '';
  fullName  = firstName + ' ' + lastName;

  return fullName.trim();
}


// Returns username of user, contact, name of group, or a comma separated list of users
export const getEntityDisplayName = (entityId, usersCache, groupsCache, contactsCache) => {
  let user;
  let contact;
  let group;
  let displayName = '';

  if (_.isString(entityId)) {
    contact = contactsCache ? contactsCache[entityId] : null;

    if (contact) {
      displayName = getContactDisplayName(contact);
    }
  } else if (entityId > 0) {
    user = usersCache ? usersCache[entityId] : null;

    if (user) {
      contact = contactsCache[user.phone_number];

      if (user.full_name) {
        displayName = user.full_name;
      } else if (user.username) { // BACKWARDS COMPATABILITY
        displayName = user.username;
      } else if (contact) {
        displayName = getContactDisplayName(contact);
      }
    }
  } else if (entityId < 0) {
    group = groupsCache ? groupsCache[entityId] : null;

    if (group) {
      displayName = group.name || getTempGroupName(group.users, usersCache, groupsCache, contactsCache)
    }
  }

  return isStringEmpty(displayName) ? 'anonymous' : displayName;
}

let getContactPreview = (entityId, usersCache, contactsCache) => {
  let parseNumber = (phoneNumber) => {
    let phoneUtil = PhoneNumberUtil.getInstance();
    let number;

    try {
      number = phoneUtil.format(phoneUtil.parse(phoneNumber), PhoneNumberFormat.INTERNATIONAL);
    } catch (err) {
      number = phoneNumber;
    }

    return number;
  }

  let contact;
  let user;
  let contactPreview = '';

  if (_.isString(entityId)) {
    contact = contactsCache ? contactsCache[entityId] : null;
    contactPreview = contact ? contact.type + ': ' + parseNumber(contact.phone_number) : '';
  } else if (entityId > 0) {
    user = usersCache ? usersCache[entityId] : null;

    if (user) {
      contact = contactsCache ? contactsCache[user.phone_number] : null;
      contactPreview = contact && !user.full_name ? contact.type + ': ' + parseNumber(contact.phone_number) : '';
    }
  }

  return isStringEmpty(contactPreview) ? null : contactPreview;
}

export const getEntityPreview = (entityId, usersCache, contactsCache) => {
  let user;
  let contact;
  let preview = '';

  if (_.isString(entityId)) {
    contact = contactsCache ? contactsCache[entityId] : null;

    if (contact) {
      preview = getContactPreview(entityId, usersCache, contactsCache);
    }
  } else if (entityId > 0) {
    user = usersCache ? usersCache[entityId] : null;

    if (user && user.firebase_uid) {
      preview = user.username;
    } else if (user && !user.firebase_uid) {
      preview = getContactPreview(entityId, usersCache, contactsCache);
    }
  }

  return isStringEmpty(preview) ? null : preview;
}

export const getConvoAuthorId = (convoId, usersCache, groupsCache) => {
  let convo;
  let authorId;

  if (convoId > 0) {
    authorId = convoId;
  } else if (convoId < 0) {
    convo = groupsCache[convoId];
    authorId = convo && convo.peek_message ? convo.peek_message.author_id : null;
  }

  return authorId;
}

export const getMessagePreview = (message, clientId, usersCache, postsCache) => {
  let messagePreview = 'Send a message...';

  if (message) {
    let lastAuthor = usersCache[message.author_id];
    let lastAuthorName;

    if (lastAuthor && lastAuthor.full_name) {
      lastAuthorName = lastAuthor.full_name;
    } else if (lastAuthor && lastAuthor.username) {
      lastAuthorName = lastAuthor.username;
    } else {
      lastAuthorName = 'anonymous';
    }

    if (message.post_id) {
      if (message.author_id === clientId) {
        messagePreview = 'You replied to a post.';
      } else {
        messagePreview = lastAuthorName + ' replied to a post.';
      }
    } else {
      if (message.body) {
        messagePreview = message.body;
      } else {
        if (message.author_id === clientId) {
          messagePreview = 'You sent an image.';
        } else {
          messagePreview = lastAuthorName + ' sent an image.';
        }
      }
    }
  }

  return messagePreview;
}

export const isConvoSearched = (convoId, convoSearchText, usersCache, groupsCache, contactsCache) => {
  if (!convoId || !convoSearchText || !usersCache || !groupsCache || !contactsCache || isStringEmpty(convoSearchText)) {
    return true;
  }

  let searchText = convoSearchText.toLowerCase();
  let displayName = getEntityDisplayName(convoId, usersCache, groupsCache, contactsCache).toLowerCase();

  if (convoId > 0) {
    return displayName.startsWith(searchText);
  } else if (convoId < 0) {
    return displayName.includes(searchText);
  }

  return true;
}

// Given a search string, should the contact should up?
export const isContactSearched = (phoneNumber, contactSearchText, contactsCache) => {
  if (!phoneNumber || !contactSearchText || !contactsCache || isStringEmpty(contactSearchText)) {
    return true;
  }

  let contact = contactsCache[phoneNumber];
  let searchText = contactSearchText.toLowerCase();

  let lastNameStartsWith = contact.family_name && contact.family_name.toLowerCase().startsWith(searchText);
  let fullNameStartsWith = contact.given_name && contact.family_name && (contact.given_name + ' ' + contact.family_name).toLowerCase().startsWith(searchText);

  return lastNameStartsWith || fullNameStartsWith;
}
