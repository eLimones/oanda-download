const moment = require('moment');

function daysOfYear(year){
  const days = [];
  var currentDate = moment.utc(`${year}-01-01`);
  var endDate = moment.utc(`${year+1}-01-01`);
  while(currentDate < endDate){
    days.push(currentDate.format());
    currentDate = moment(currentDate).clone().add(1,'day');
  }
  return days;
}

module.exports = {
  daysOfYear,
};
