//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

export const ENV_TYPES = {
  DEV:        'DEV',
  TEST:       'TEST',
  PRODUCTION: 'PRODUCTION'
}

// WARNING -- affects Elastic Beanstalk API URL
export const SERVER_ENV_SETTING    = ENV_TYPES.DEV

// WARNING -- affects the AWS S3 bucket
export const AWS_ENV_SETTING       = ENV_TYPES.DEV

// WARNING -- affects the Pusher project
export const PUSHER_ENV_SETTING    = ENV_TYPES.DEV

// WARNING -- affects the Amplitude Analytics project
export const AMPLITUDE_ENV_SETTING = ENV_TYPES.DEV
