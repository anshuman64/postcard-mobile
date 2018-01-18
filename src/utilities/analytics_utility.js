// Library Imports
import RNAmplitute from 'react-native-amplitude-analytics';

// Local Imports
import { ENV_TYPES, GLOBAL_ENV_SETTING } from './app_utility.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const amplitude = setupAmplitude();

//--------------------------------------------------------------------//
// Helper Functions
//--------------------------------------------------------------------//

function setupAmplitude() {
  if (GLOBAL_ENV_SETTING === ENV_TYPES.PRODUCTION) {
    return new RNAmplitute('7ce84b314a6daad5ff9966ec1a2c52ab'); // key for insiya-production
  } else if (GLOBAL_ENV_SETTING === ENV_TYPES.TEST) {
    return new RNAmplitute('754c90a8ee32f23bd7042c47ea600e4d'); // key for insiya-test
  } else {
    return new RNAmplitute('fa9aded0e5b7590482fffff78b2bd85c'); // key for insiya-dev
  }
}
