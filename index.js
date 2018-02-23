const oanda = require('./oanda');
const storage = require('./storage');

const headers = [
  {label: 'time', value: 'time'},
  {label: 'open', value: 'mid.o'},
  {label: 'high', value: 'mid.h'},
  {label: 'low', value: 'mid.l'},
  {label: 'close', value: 'mid.c'},
  {label: 'volume', value: 'volume'},
];

async function main({instrument, maxDate, minDate, filename, key}) {;
  let candles;
  let currentDate = maxDate;
  let currentDateString = (!!maxDate) ? maxDate.toISOString() : null;
  do{
    candles = await oanda.getCandlesByRange(instrument, currentDateString, key);
    console.log(candles);
    currentDateString = candles.slice(-1)[0].time;
    currentDate = new Date(currentDateString);
    storage.pipeToCSV(filename, candles, headers)
  } while (minDate < currentDate);
}

module.exports = main;
