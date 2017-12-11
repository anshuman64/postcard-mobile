
//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

// Login Navigator
export const TO_LOGIN_NAVIGATOR       = 'TO_LOGIN_NAVIGATOR';
export const TO_LOGIN_SCREEN          = 'TO_LOGIN_SCREEN';
export const TO_CONFIRM_CODE_SCREEN   = 'TO_CONFIRM_CODE_SCREEN';

// Main Navigator
export const TO_MAIN_NAVIGATOR        = 'TO_MAIN_NAVIGATOR';
export const TO_HOME_STACK_NAVIGATOR  = 'TO_HOME_STACK_NAVIGATOR';
export const TO_USER_STACK_NAVIGATOR  = 'TO_USER_STACK_NAVIGATOR';

// Home StackNavigator
export const TO_HOME_SCREEN           = 'TO_HOME_SCREEN';
export const TO_NEW_POST_SCREEN       = 'TO_NEW_POST_SCREEN';

// User StackNavigator
export const TO_MY_POSTS_TAB          = 'TO_MY_POSTS_TAB';
export const TO_MY_LIKES_TAB          = 'TO_MY_LIKES_TAB';

// Common
export const TO_MENU_SCREEN           = 'TO_MENU_SCREEN';
export const GO_BACK                  = 'GO_BACK';


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// Login Navigator
export const toLoginNavigator = (data) => {
  return { type: TO_LOGIN_NAVIGATOR, data: data };
};

export const toLoginScreen = (data) => {
  return { type: TO_LOGIN_SCREEN, data: data };
};

export const toConfirmCodeScreen = (data) => {
  return { type: TO_CONFIRM_CODE_SCREEN, data: data };
};


// Main Navigator
export const toMainNavigator = (data) => {
  return { type: TO_MAIN_NAVIGATOR, data: data };
};

export const toHomeStackNavigator = (data) => {
  return { type: TO_HOME_STACK_NAVIGATOR, data: data };
};

export const toUserStackNavigator = (data) => {
  return { type: TO_USER_STACK_NAVIGATOR, data: data };
};


// Home StackNavigator
export const toHomeScreen = (data) => {
  return { type: TO_HOME_SCREEN, data: data };
};

export const toMenuScreen = (data) => {
  return { type: TO_MENU_SCREEN, data: data };
};


// User StackNavigator
export const toMyPostsTab = (data) => {
  return { type: TO_MY_POSTS_TAB, data: data };
};

export const toMyLikesTab = (data) => {
  return { type: TO_MY_LIKES_TAB, data: data };
};


// Common
export const toNewPostScreen = (data) => {
  return { type: TO_NEW_POST_SCREEN, data: data };
};

export const goBack = (data) => {
  return { type: GO_BACK, data: data };
};
