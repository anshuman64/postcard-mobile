//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

export const ENV_TYPES = {
  DEV:        'DEV',
  TEST:       'TEST',
  PRODUCTION: 'PRODUCTION'
}

/* WARNING -- affects the following services:
 * - API url
 * - AWS S3 bucket
 */
export const SERVER_ENV_SETTING    = ENV_TYPES.DEV

// WARNING -- affects the Amplitude Analytics project
export const AMPLITUDE_ENV_SETTING = ENV_TYPES.DEV

// WARNING -- affects the Amplitude Analytics project
export const PUSHER_ENV_SETTING    = ENV_TYPES.DEV
