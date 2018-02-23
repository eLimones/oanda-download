const json2csv = require('json2csv').parse;
const fs = require('fs');
const {promisify} = require('util');

const access = promisify(fs.access);
const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);

async function pipeToCSV(filename, data, fields){
  const exists = await fileExists(filename);
  if(exists){
    const csvData = toCSV(data, {header: false, fields: fields});
    //console.log(csvData);
    await  appendToFile(filename, csvData);
  }else{
    const csvData = toCSV(data, {header: true, fields: fields});
    //console.log(csvData);
    await  overwriteFile(filename, csvData);
  }
}

async function fileExists(filename){
  try {
    await access(filename) ;
    return true;
  }catch(err){
    return false;
  }
}

async function appendToFile(filename, data){
  await appendFile(filename, data, {encoding: 'utf8'});
}

async function overwriteFile(filename, data){
  await writeFile(filename, data, {encoding: 'utf8'});
}

function toCSV(data, options){
    let csv = json2csv(data, options);
    if(options.header){
      return csv;
    }else{
      return '\n' + csv;
    }

}

module.exports = {
  pipeToCSV,
  fileExists,
  appendToFile,
  overwriteFile,
  toCSV,
};
