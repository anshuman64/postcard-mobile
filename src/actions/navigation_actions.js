
//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


export const TO_LOGIN_SCREEN = 'TO_LOGIN_SCREEN';
export const TO_CODEAUTH_SCREEN  = 'TO_CODEAUTH_SCREEN';
export const TO_POSTS_SCREEN   = 'TO_POSTS_SCREEN';
export const TO_NEWPOST_SCREEN   = 'TO_NEWPOST_SCREEN';
export const BACK_SCREEN   = 'BACK_SCREEN';


//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//


export const toLoginScreen = (data) => {
  return { type: TO_LOGIN_SCREEN, data: data };
};

export const toCodeAuthScreen = (data) => {
  return { type: TO_CODEAUTH_SCREEN, data: data };
};

export const toPostsScreen = (data) => {
  return { type: TO_POSTS_SCREEN, data: data };
};

export const toNewPostScreen = (data) => {
  return { type: TO_NEWPOST_SCREEN, data: data };
};

export const toBackScreen = (data) => {
  return { type: BACK_SCREEN, data: data };
};

//--------------------------------------------------------------------//
// Asynchronous Actions
//--------------------------------------------------------------------//
