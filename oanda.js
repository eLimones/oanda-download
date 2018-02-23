const request = require('superagent');

function getCandlesByRange(resource, to_date, api_key, from_date){
  const params = {price: 'M', granularity: 'M1', count: 5000};
  if(!!to_date){
    params.to = to_date;
  }
  if(!!from_date){
    params.to = to_date;
  }
  return request.get(`https://api-fxpractice.oanda.com/v3/instruments/${resource}/candles`)
    .query(params)
    .set({'Authorization': `Bearer ${api_key}`})
    .then((res) => {
      return Promise.resolve(res.body.candles.reverse())
    });
}

module.exports = {
  getCandlesByRange,
};
