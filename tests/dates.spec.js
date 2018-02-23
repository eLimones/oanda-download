const { expect } = require('chai');

const dateHelper = require('../date-helper');

describe('dateHelper', function() {
  describe('generate year dates', function() {
    it('normal year', function() {
      let days = dateHelper.daysOfYear(2017);
      expect(days.length).to.equal(365);
    });

    it('leap year', function() {
      let days = dateHelper.daysOfYear(2016);
      expect(days.length).to.equal(366);
    });
  });
});
