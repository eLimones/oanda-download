const oanda = require('./oanda');
const storage = require('./storage');
const process = require('process');

const api_key = process.env.OANDA_KEY;
console.log(api_key);


const resorceName = 'EUR_USD';
const headers = [
  {label: 'time', value: 'time'},
  {label: 'open', value: 'mid.o'},
  {label: 'high', value: 'mid.h'},
  {label: 'low', value: 'mid.l'},
  {label: 'close', value: 'mid.c'},
  {label: 'volume', value: 'volume'},
];

async function main(){;
  let candles;
  let upTo = null;
  for(let i = 0; i < 2000; i++){
    candles = await oanda.getCandlesByRange('EUR_USD', upTo, api_key);
    console.log(candles);
    upTo = candles.slice(-1)[0].time;
    storage.pipeToCSV(`${resorceName}.csv`, candles, headers)
  }
}

main().catch(e => {
  console.log(e);
});


/*
  .then(candles => {
    console.log(new Date(Date.now()));
    console.log(new Date(candles[0].time));
  }).catch(err => {
    console.log(err);
    console.log("Error");
  });
*/
