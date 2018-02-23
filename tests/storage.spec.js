const { expect } = require('chai');
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');

const unlinkPromisify = promisify(fs.unlink);
const readFile = promisify(fs.readFile);

async function deleteFile(filename) {
  try{
    await unlinkPromisify(filename);
  }catch(e){
  }
}

const storage = require('../storage');

describe('storage', function() {
  describe('toCSV', function() {
    it('creates file if it does not exist', function() {
      const data = [
        {
          field1: 'data1',
          field2: 1,
        },
        {
          field1: 'data2',
          field2: 2,
        },
      ];

      const fields = [
        {label: 'title1', value: 'field1'},
        {label: 'title2', value: 'field2'},
      ];
      const csv1 = storage.toCSV(data, {fields: fields, header: true});
      expect(csv1).to.equal(`"title1","title2"\n"data1",1\n"data2",2`);

      const csv2 = storage.toCSV(data, {fields: fields, header: false});
      expect(csv2).to.equal(`\n"data1",1\n"data2",2`);
    });
  });

  describe('fileExists', function() {
    it('retuns true when file exists', async function() {
      exists = await storage.fileExists(__filename);
      expect(exists).to.be.true;
    });

    it('returns false when file does not exist', async function() {
      let exists = await storage.fileExists('this-file-does-not-exist');
      expect(exists).to.be.false;
    });
  });

  describe('write new file', function() {
    before(async function() {
      await deleteFile('samplefile');
      const exists = await storage.fileExists('samplefile');
      expect(exists).to.be.false;
    });

    it('something', async function() {
      await storage.overwriteFile('samplefile', 'this is a super string\n');

      const exists = await storage.fileExists('samplefile');
      expect(exists).to.be.true;
    });

    after(async function() {
      await deleteFile('samplefile');
    });
  });;

  describe('appends to file', function() {
    before(async function() {
      await deleteFile('samplefile');
      await storage.overwriteFile('samplefile', 'this is a string\n');
    });

    it('data is appended to file', async function() {
      await storage.appendToFile('samplefile', 'this is other string\n');
      const data = await readFile('samplefile', {encoding: 'utf8'});
      expect(data).to.equal('this is a string\nthis is other string\n');
    });

    after(async function() {
      await deleteFile('samplefile');
    });
  });;

});
