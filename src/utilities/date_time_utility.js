//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//


export const MONTH_NAMES = ["January", "February", "March", "April", "May",
  "June", "July", "August", "September", "October", "November", "December"
];

export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function renderDate(date) {
  let todayDate = new Date(); // current date-time
  let postDate = new Date(date); // post's date-time
  let diff = todayDate - postDate; // time difference in milliseconds
  let minsDiff = diff / (1000 * 60); // time difference in hours
  let hoursDiff = diff / (1000 * 3600); // time difference in hours

  let hour = postDate.getHours();
  let m = 'AM';
  // If postDate is at 00:xx, change to 12:xx
  if (hour === 0) {
    hour = 12;
  // If postDate is after noon, change to 12:xx PM
  } else if (hour >= 12) {
    m = 'PM';
    hour = hour % 12;
  }

  // If postDate was < 60 mins ago, return format 'xx hours ago'
  if (minsDiff < 1) {
    return 'Just now';
  // If postDate was < 20 hours ago, return format 'xx hours ago'
} else if (minsDiff < 60) {
    return Math.floor(minsDiff) + ' mins ago';
  // If postDate was within 48 hours ago and the day was 1 day ago, return format 'Yesterday at xx:xx AM'
  } else if (hoursDiff < 20) {
    return Math.floor(hoursDiff) + ' hours ago';
  // If postDate was within 48 hours ago and the day was 1 day ago, return format 'Yesterday at xx:xx AM'
  } else if (diff < 172800000 && todayDate.getDate() - postDate.getDate() === 1) {
    return 'Yesterday at ' + hour + ':' + postDate.getMinutes() + m;
  // If postDate was within the last week, return format '[dayName] at xx:xx AM'
  } else if (diff < 604800000) {
    return DAY_NAMES[postDate.getDay()]+ ' at ' + hour + ':' + postDate.getMinutes() + m;
  // Else, return format '[monthName] [date] at xx:xx AM'
  } else {
    return MONTH_NAMES[postDate.getMonth()] + ' ' + postDate.getDate() + ' at ' + hour + ':' + postDate.getMinutes() + m;
  }
}
