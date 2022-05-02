import moment from "moment";

// Function to convert unix timestamps into human-readable dates
export const timeConverter = (UNIX_timestamp) => {
  let unixDate = moment.unix(UNIX_timestamp).format('DD.MMMM YYYY');
  return unixDate;
}
// export const timeConverter = (UNIX_timestamp) => {
//   let a = new Date(UNIX_timestamp * 1000);
//   let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//   let year = a.getFullYear();
//   let month = months[a.getMonth()];
//   let date = a.getDate();
//   // let hour = a.getHours();
//   // let min = a.getMinutes();
//   // let sec = a.getSeconds();
//   let time = date + ' ' + month + ' ' + year;
//   //[year] + ' ' + hour + ':' + min + ':' + sec 
//   return time;
// };

export const localTime = (isoDate) => {
  let newDate =  moment.utc(isoDate).format('DD.MM.YY, h:mm a');
  return newDate;
};

// export const secondsToHours = (seconds) => {
//   let inHours = moment.utc(seconds * 1000).format('HH:mm');
//   return inHours;
// };

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
