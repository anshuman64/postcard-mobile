
//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


export const TO_LOGIN_SCREEN = 'TO_LOGIN_SCREEN';
export const TO_CONFIRM_CODE_SCREEN  = 'TO_CONFIRM_CODE_SCREEN';
export const TO_POSTS_SCREEN   = 'TO_POSTS_SCREEN';
export const TO_ALL_POSTS_TAB   = 'TO_ALL_POSTS_TAB';
export const TO_MY_POSTS_TAB   = 'TO_MY_POSTS_TAB';
export const TO_MENU_TAB   = 'TO_MENU_TAB';
export const TO_NEW_POST_SCREEN   = 'TO_NEW_POST_SCREEN';
export const BACK_SCREEN   = 'BACK_SCREEN';


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//


export const toLoginScreen = (data) => {
  return { type: TO_LOGIN_SCREEN, data: data };
};

export const toConfirmCodeScreen = (data) => {
  return { type: TO_CONFIRM_CODE_SCREEN, data: data };
};

export const toPostsScreen = (data) => {
  return { type: TO_POSTS_SCREEN, data: data };
};

export const toAllPostsTab = (data) => {
  return { type: TO_ALL_POSTS_TAB, data: data };
};

export const toMyPostsTab = (data) => {
  return { type: TO_MY_POSTS_TAB, data: data };
};

export const toMenuTab = (data) => {
  return { type: TO_MENU_TAB, data: data };
};

export const toNewPostScreen = (data) => {
  return { type: TO_NEW_POST_SCREEN, data: data };
};

export const toBackScreen = (data) => {
  return { type: BACK_SCREEN, data: data };
};
