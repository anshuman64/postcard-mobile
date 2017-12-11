//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


export const NAVIGATION_ACTION_TYPES = {
  TO_LOGIN_NAVIGATOR:     'TO_LOGIN_NAVIGATOR',
  TO_LOGIN_SCREEN:        'TO_LOGIN_SCREEN',
  TO_CONFIRM_CODE_SCREEN: 'TO_CONFIRM_CODE_SCREEN',

  TO_MAIN_NAVIGATOR:       'TO_MAIN_NAVIGATOR',
  TO_HOME_STACK_NAVIGATOR: 'TO_HOME_STACK_NAVIGATOR',
  TO_USER_STACK_NAVIGATOR: 'TO_USER_STACK_NAVIGATOR',

  TO_HOME_SCREEN:     'TO_HOME_SCREEN',
  TO_NEW_POST_SCREEN: 'TO_NEW_POST_SCREEN',

  TO_MY_POSTS_TAB: 'TO_MY_POSTS_TAB',
  TO_MY_LIKES_TAB: 'TO_MY_LIKES_TAB',

  TO_MENU_SCREEN: 'TO_MENU_SCREEN',
  GO_BACK:        'GO_BACK'
};


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//


// Login Navigator
export const toLoginNavigator = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_LOGIN_NAVIGATOR, data: data };
};

export const toLoginScreen = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_LOGIN_SCREEN, data: data };
};

export const toConfirmCodeScreen = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_CONFIRM_CODE_SCREEN, data: data };
};


// Main Navigator
export const toMainNavigator = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_MAIN_NAVIGATOR, data: data };
};

export const toHomeStackNavigator = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_HOME_STACK_NAVIGATOR, data: data };
};

export const toUserStackNavigator = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_USER_STACK_NAVIGATOR, data: data };
};


// Home StackNavigator
export const toHomeScreen = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_HOME_SCREEN, data: data };
};

export const toMenuScreen = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_MENU_SCREEN, data: data };
};


// User StackNavigator
export const toMyPostsTab = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_MY_POSTS_TAB, data: data };
};

export const toMyLikesTab = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_MY_LIKES_TAB, data: data };
};


// Common
export const toNewPostScreen = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_NEW_POST_SCREEN, data: data };
};

export const toBackScreen = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.GO_BACK, data: data };
};
