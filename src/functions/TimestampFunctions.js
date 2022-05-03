import moment from "moment";

// Function to convert unix timestamps into human-readable dates
export const timeConverter = (UNIX_timestamp) => {
  let unixDate = moment.unix(UNIX_timestamp).format('DD.MMMM YYYY');
  return unixDate;
}

// Function to format iso strings to display date & time
export const localTime = (isoDate) => {
  let newDate =  moment.utc(isoDate).format('DD.MM.YY, h:mm a');
  return newDate;
};

// Function to convert seconds into hours, works even if more than 24 hours
export const secondsToHours = (secs) => {
  let sec_num = parseInt(secs, 10);
  let hours   = Math.floor(sec_num / 3600);
  let minutes = Math.floor(sec_num / 60) % 60;
  // let seconds = sec_num % 60;

  return [hours,minutes]
  .map(v => v < 10 ? "0" + v : v)
  .filter((v,i) => v !== "00" || i > 0)
  .join(":");
}
