// Restore the require/define
var require = $.fn.select2.amd.require;
var define = $.fn.select2.amd.define;

// Disable jQuery's binding to $
jQuery.noConflict();

var Utils = require('select2/utils');

function MockContainer (options) {
  var self = this;
  options || (options = {});
  self._isOpen = options.isOpen;

  MockContainer.__super__.constructor.call(this);

  this.on('open', function () {
    self._isOpen = true;
  });

  this.on('close', function () {
    self._isOpen = false;
  });

  this.on('toggle', function () {
    self._isOpen = !self._isOpen;
  });
}

Utils.Extend(MockContainer, Utils.Observable);

MockContainer.prototype.isOpen = function () {
  return this._isOpen;
};

var log = [];
var testName;

QUnit.done(function (test_results) {
  var tests = [];
  for(var i = 0, len = log.length; i < len; i++) {
    var details = log[i];
    tests.push({
      name: details.name,
      result: details.result,
      expected: details.expected,
      actual: details.actual,
      source: details.source
    });
  }
  test_results.tests = tests;

  window.global_test_results = test_results;
});
QUnit.testStart(function(testDetails){
  QUnit.log(function(details){
    if (!details.result) {
      details.name = testDetails.name;
      log.push(details);
    }
  });
});

define('qunit', function () {
  return QUnit;
})