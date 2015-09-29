var test = require('tape');
var shapeful = require('../');

test('undefined assertions returns false', function(t){
  t.plan(2);
  t.notOk(shapeful());
  t.notOk(shapeful('something'));
});

test('can assert type of undefined', function(t){
  t.plan(1);
  t.ok(shapeful(undefined, 'undefined'));
});

test('correctly detects they types of primitive values', function(t) {
  var test = [
    [true ,'boolean'],
    [0,'number'],
    ['a','string'],
    [null, 'object'],
    [{},'object'],
    [function(){},'function'],
    [undefined, 'undefined'],
    [[], 'array']
  ];
  t.plan(test.length);
  test.forEach(function(v){
    t.ok(shapeful(v[0], v[1]), v[0] + ' has detected type ' + v[1]);
  });
});

test('correctly detect shape of simple object', function(t){
  var obj = {foo: 'bar', my: 0, word: false};
  var assertions = {foo: 'string', my: 'number', word: 'boolean'};
  t.plan(1);
  t.ok(shapeful(obj, assertions));
});

test('correctly detect the shape of nested objects', function(t){
  var obj = {attr: true, obj: {foo: 'bar', my: 0, word: false}};
  var assertions = {attr: 'boolean', obj: {foo: 'string', my: 'number', word: 'boolean'}};
  t.plan(1);
  t.ok(shapeful(obj, assertions));
});

test('accepts a list of shapes', function(t){
  var obj = {obj: {}, list: []};
  var asserts1 = {obj: ['object', 'array'], list: ['object', 'array'] };
  var asserts2 = {obj: ['object', 'object'], list: ['object', 'object'] };
  var asserts3 = {obj: ['array', 'array'], list: ['array', 'array'] };
  var asserts4 = [
    {obj: 'array', list: 'object'},
    {obj: 'object', list: 'object'},
    {obj: 'array',list:'array'},
    {obj: 'object',list: 'array'}
  ];
  t.plan(4);
  t.ok(shapeful(obj, asserts1), 'attributes can be arrays');
  t.ok(shapeful(obj, asserts4), 'assertions can be arrays');
  t.notOk(shapeful(obj, asserts2), 'attributes do not contain match');
  t.notOk(shapeful(obj, asserts3), 'attributes do not contain a match');
});
