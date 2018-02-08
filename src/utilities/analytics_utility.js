// Library Imports
import RNAmplitute from 'react-native-amplitude-analytics';

// Local Imports
import { ENV_TYPES, AMPLITUDE_ENV_SETTING } from '../app_config.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Helper Functions
//--------------------------------------------------------------------//

// Chooses the right API key depending on environment setting
let setupAmplitude = () => {
  let apiKey;

  if (AMPLITUDE_ENV_SETTING === ENV_TYPES.PRODUCTION) {
    apiKey = '7ce84b314a6daad5ff9966ec1a2c52ab'; // key for insiya-production
  } else if (AMPLITUDE_ENV_SETTING === ENV_TYPES.TEST) {
    apiKey = '754c90a8ee32f23bd7042c47ea600e4d'; // key for insiya-test
  } else {
    apiKey = 'fa9aded0e5b7590482fffff78b2bd85c'; // key for insiya-dev
  }

  return new RNAmplitute(apiKey)
};

//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//


export const amplitude = setupAmplitude();
