var $ = require('jquery');
var Options = require('select2/options');

module('Options - deprecated - data-ajax-url');

test('converted ajax-url to ajax--url automatically', function (assert) {
  var $test = $('<select data-ajax-url="test://url"></select>');
  var options = new Options({}, $test);

  assert.ok(
    options.get('ajax'),
    'The `ajax` key was automatically created'
  );
  assert.equal(
    options.get('ajax').url,
    'test://url',
    'The `url` property for the `ajax` option was filled in correctly'
  );
});

test('converted select2-tags to data/tags automatically', function (assert) {
  var $test = $('<select data-select2-tags="original data"></select>');
  var options = new Options({}, $test);

  assert.ok(
    options.get('tags'),
    'The `tags` key is automatically set to true'
  );
  assert.equal(
    options.get('data'),
    'original data',
    'The `data` key is created with the original data'
  );
});
