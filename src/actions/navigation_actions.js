
//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


export const TO_LOGIN_SCREEN         = 'TO_LOGIN_SCREEN';
export const TO_CONFIRM_CODE_SCREEN  = 'TO_CONFIRM_CODE_SCREEN';
export const TO_HOME_SCREEN          = 'TO_HOME_SCREEN';
export const TO_MY_POSTS_TAB         = 'TO_MY_POSTS_TAB';
export const TO_MY_LIKES_TAB         = 'TO_MY_LIKES_TAB';
export const TO_NEW_POST_SCREEN      = 'TO_NEW_POST_SCREEN';
export const TO_MENU_SCREEN          = 'TO_MENU_SCREEN';
export const BACK_SCREEN             = 'BACK_SCREEN';


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//


export const toLoginScreen = (data) => {
  return { type: TO_LOGIN_SCREEN, data: data };
};

export const toConfirmCodeScreen = (data) => {
  return { type: TO_CONFIRM_CODE_SCREEN, data: data };
};

export const toHomeScreen = (data) => {
  return { type: TO_HOME_SCREEN, data: data };
};

export const toMyPostsTab = (data) => {
  return { type: TO_MY_POSTS_TAB, data: data };
};

export const toMyLikesTab = (data) => {
  return { type: TO_MY_LIKES_TAB, data: data };
};

export const toNewPostScreen = (data) => {
  return { type: TO_NEW_POST_SCREEN, data: data };
};

export const toMenuScreen = (data) => {
  return { type: TO_MENU_SCREEN, data: data };
};

export const toBackScreen = (data) => {
  return { type: BACK_SCREEN, data: data };
};
