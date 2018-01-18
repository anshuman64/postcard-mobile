//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const ENV_TYPES = {
  DEV:        'DEV',
  TEST:       'TEST',
  PRODUCTION: 'PRODUCTION'
}

/* WARNING -- affects the following services:
 * - API url
 * - Amplitude Analytics project
 * - AWS S3 bucket
 */
export const GLOBAL_ENV_SETTING = ENV_TYPES.DEV
