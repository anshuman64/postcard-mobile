//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


export const NAVIGATION_ACTION_TYPES = {
  TO_LOADING_SCREEN:      'TO_LOADING_SCREEN',
  TO_LOGIN_SCREEN:        'TO_LOGIN_SCREEN',
  TO_CONFIRM_CODE_SCREEN: 'TO_CONFIRM_CODE_SCREEN',
  TO_HOME_SCREEN:         'TO_HOME_SCREEN',
  TO_AUTHORED_POSTS_TAB:  'TO_AUTHORED_POSTS_TAB',
  TO_LIKED_POSTS_TAB:     'TO_LIKED_POSTS_TAB',
  TO_NEW_POST_SCREEN:     'TO_NEW_POST_SCREEN',
  TO_MENU_SCREEN:         'TO_MENU_SCREEN',
  GO_BACK:                'GO_BACK'
};


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//


export const toLoadingScreen = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_LOADING_SCREEN, data: data };
};

export const toLoginScreen = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_LOGIN_SCREEN, data: data };
};

export const toConfirmCodeScreen = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_CONFIRM_CODE_SCREEN, data: data };
};

export const toHomeScreen = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_HOME_SCREEN, data: data };
};

export const toAuthoredPostsTab = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_AUTHORED_POSTS_TAB, data: data };
};

export const toLikedPostsTab = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_LIKED_POSTS_TAB, data: data };
};

export const toNewPostScreen = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_NEW_POST_SCREEN, data: data };
};

export const toMenuScreen = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.TO_MENU_SCREEN, data: data };
};

export const goBack = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.GO_BACK, data: data };
};
