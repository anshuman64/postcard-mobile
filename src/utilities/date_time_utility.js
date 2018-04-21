//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

export const MONTH_NAMES = ["January", "February", "March", "April", "May",
  "June", "July", "August", "September", "October", "November", "December"
];

export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const SHORT_MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const SHORT_DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Prettifies date-time format on posts
export const renderPostDate = (date) => {
  let todayDate    = new Date();               // current date-time
  let creationDate = new Date(date);           // creation date-time
  let diff         = todayDate - creationDate; // time difference in milliseconds
  let minsDiff     = diff / (1000 * 60);       // time difference in minutes
  let hoursDiff    = diff / (1000 * 3600);     // time difference in hours

  let hour = creationDate.getHours();
  let mins = (creationDate.getMinutes() < 10 ? '0' : '') + creationDate.getMinutes();
  let m    = 'AM';

  if (hour === 0) {         // If creationDate is at 00:xx, change to 12:xx
    hour = 12;
  } else if (hour === 12) {  // If creationDate is after noon, change to 12:xx PM
    m    = 'PM';
  } else if (hour >= 12) {  // If creationDate is after noon, change to 12:xx PM
    m    = 'PM';
    hour = hour % 12;
  }

  if (minsDiff < 1) {
    // If creationDate was < 1 min ago, return 'Just now'
    return 'Just now';
  } else if (minsDiff < 2) {
    return '1 min ago';
  } else if (minsDiff < 60) {
    // If creationDate was < 60 mins ago, return format 'xx mins ago'
    return Math.floor(minsDiff) + ' mins ago';
  } else if (hoursDiff < 2) {
    return '1 hour ago';
  } else if (hoursDiff < 20) {
    // If creationDate was < 20 hours ago, return format 'xx hours ago'
    return Math.floor(hoursDiff) + ' hours ago';
  } else if (diff < 172800000 && todayDate.getDate() - creationDate.getDate() === 1) {
    // If creationDate was within 48 hours ago and the day was 1 day ago, return format 'Yesterday at xx:xx AM'
    return 'Yesterday at ' + hour + ':' + mins + m;
  } else if (diff < 604800000) {
    // If creationDate was within the last week, return format '[dayName] at xx:xx AM'
    return DAY_NAMES[creationDate.getDay()]+ ' at ' + hour + ':' + mins + m;
  } else if (todayDate.getFullYear() - creationDate.getFullYear() < 1) {
    // If creationDate was some time this year, return format '[monthName] [date]'
    return MONTH_NAMES[creationDate.getMonth()] + ' ' + creationDate.getDate();
  } else {
    // Else, return format [MON] [DAY], [YEAR]
    return MONTH_NAMES[creationDate.getMonth()] + ' ' + creationDate.getDate() + ', ' + creationDate.getFullYear();
  }
};

// Prettifies date-time format on messages
export const renderMessageDate = (date) => {
  let todayDate    = new Date();               // current date-time
  let creationDate = new Date(date);           // creation date-time
  let diff         = todayDate - creationDate; // time difference in milliseconds
  let minsDiff     = diff / (1000 * 60);       // time difference in minutes
  let hoursDiff    = diff / (1000 * 3600);     // time difference in hours

  let hour = creationDate.getHours();
  let mins = (creationDate.getMinutes() < 10 ? '0' : '') + creationDate.getMinutes();
  let m    = ' AM';

  if (hour === 0) {         // If creationDate is at 00:xx, change to 12:xx
    hour = 12;
  } else if (hour === 12) {  // If creationDate is after noon, change to 12:xx PM
    m    = ' PM';
  } else if (hour > 12) {  // If creationDate is after noon, change to 1:xx PM
    m    = ' PM';
    hour = hour % 12;
  }

  if (todayDate.getDate() - creationDate.getDate() < 1) {
    // If creationDate was some time today, return the time
    return hour + ':' + mins + m;
  } else if (todayDate.getDate() - creationDate.getDate() < 7) {
    // If creationDate was some time this week, return the day and time
    return SHORT_DAY_NAMES[creationDate.getDay()] + ' ' + hour + ':' + mins + m;
  } else if (todayDate.getFullYear() - creationDate.getFullYear() < 1) {
    // If creationDate was some time this year, return month, date, and time
    return SHORT_MONTH_NAMES[creationDate.getMonth()] + ' ' + creationDate.getDate() + ' at ' + hour + ':' + mins + m;
  } else {
    // Else, return month day, year and time
    return SHORT_MONTH_NAMES[creationDate.getMonth()] + ' ' + creationDate.getDate() + ', ' + creationDate.getFullYear() + ' at ' + hour + ':' + mins + m;
  }
};


// Prettifies date-time format on ConvserationListItem
export const renderConversationDate = (date) => {
  let todayDate    = new Date();               // current date-time
  let creationDate = new Date(date);           // creation date-time
  let diff         = todayDate - creationDate; // time difference in milliseconds
  let minsDiff     = diff / (1000 * 60);       // time difference in minutes
  let hoursDiff    = diff / (1000 * 3600);     // time difference in hours

  let hour = creationDate.getHours();
  let mins = (creationDate.getMinutes() < 10 ? '0' : '') + creationDate.getMinutes();
  let m    = ' AM';

  if (hour === 0) {         // If creationDate is at 00:xx, change to 12:xx
    hour = 12;
  } else if (hour === 12) {  // If creationDate is after noon, change to 12:xx PM
    m    = ' PM';
  } else if (hour > 12) {  // If creationDate is after noon, change to 1:xx PM
    m    = ' PM';
    hour = hour % 12;
  }

  if (todayDate.getDate() - creationDate.getDate() < 1) {
    // If creationDate was some time today, return the time
    return hour + ':' + mins + m;
  } else if (todayDate.getDate() - creationDate.getDate() < 7) {
    // If creationDate was some time this week, return the day
    return SHORT_DAY_NAMES[creationDate.getDay()];
  } else if (todayDate.getFullYear() - creationDate.getFullYear() < 1) {
    // If creationDate was some time this year, return month and date
    return SHORT_MONTH_NAMES[creationDate.getMonth()] + ' ' + creationDate.getDate();
  } else {
    // Else, return month, date, year
    return SHORT_MONTH_NAMES[creationDate.getMonth()] + ' ' + creationDate.getDate() + ', ' + creationDate.getFullYear();
  }
};
