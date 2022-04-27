import moment from "moment";

// Function to convert unix timestamps into human-readable dates
export const timeConverter = (UNIX_timestamp) => {
  let a = new Date(UNIX_timestamp * 1000);
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  // let hour = a.getHours();
  // let min = a.getMinutes();
  // let sec = a.getSeconds();
  let time = date + ' ' + month + ' ' + year;
  //[year] + ' ' + hour + ':' + min + ':' + sec 
  return time;
};

export const localTime = (isoDate) => {
  let newDate =  moment.utc(isoDate).format('DD MM YY, h:mm a');
  return newDate;
};
