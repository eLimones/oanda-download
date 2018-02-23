#!/usr/bin/env node

const program = require('commander');
const assert = require('assert');
const path = require('path');
const downloader = require('./index.js');

program
  .option('-k, --key <apiKey>', 'your api key')
  .option('-i, --instrument <name>', 'instrument name. defaults to EUR_USD', 'EUR_USD')
  .option('-o, --output <path>', 'output file path. defaults to instrument_name.csv')
  .option('-m, --min <date>', 'start date/date-time to request, example \'2003-01-01\' or \'2003-01-01T00:00:00\'. defaults to \'2003-01-01\'','2003-01-01')
  .option('-M, --max <date>', 'max date/date-time to request. defaults to current date-time')

program.parse(process.argv);
assert.ok(program.key, 'key is required');

const options = {};

options.key = program.key;
options.minDate = new Date(program.min);
options.maxDate = (!!program.max) ? new Date(program.max): null;
options.instrument = program.instrument;
options.filename = (!!program.output) ? program.output : `${program.instrument}.csv`;

downloader(options).catch(err => {
 console.log(err);
});
