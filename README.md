# shapeful

A shameful attempt at checking the shape of an object. I'm sure it exists, but my google-fu failed me.

### Basic type assertions

```javascript
    shapeful(true ,'boolean') === true;
    shapeful(0,'number') === true;
    shapeful('a','string') === true;
    shapeful(null, 'object') === true;
    shapeful({},'object') === true;
    shapeful(function(){},'function') === true;
    shapeful(undefined, 'undefined') === true;
    shapeful([], 'array') === true;
```
### Assertions on object shape

```javascript
  var obj = {oh: 'bar', my: 0, word: false};
  var assertions = {oh: 'string', my: 'number', word: 'boolean'};
  shapeful(obj, assertions) === true;
```

### Optional attributes can be described

```javascript
  var obj = {foo: 'bar', my: 0};
  var obj2 = {foo: 'bar', my: 0, word: false};
  var obj3 = {foo: 'bar', my: 0, word: 0};
  var assertions = {foo: 'string', my: 'number', word: {__optional: 'boolean'}};
  shapeful(obj, assertions) === true;
  shapeful(obj2, assertions) === true;
  shapeful(obj3, assertions) === false;
```

And some nested objects

```javascript
  var obj = {attr: true, obj: {foo: 'bar', my: 0, word: false}};
  var assertions = {
    attr: 'boolean',
    obj: {foo: 'string', my: 'number', word: 'boolean'}
  };
  shapeful(obj, assertions);
```

Type type of array members can also be tested
```javascript

  var obj = {list: ['a', 'b', 'c']};
  var obj2 = {list: [{attr: 1}, {attr: 2}, {attr: 3}]}
  var obj3 = {list: ['a', 'b', false]};
  var assertion = {list: {__array: 'string'}};
  var assertion2 = {list: {__array: {attr: 'number'}}};
  shapeful(obj, assertion) === true;
  shapeful(obj2, assertion2 === true;
  shapeful(obj3, assertion) === false;
```
### Union of assertions

Returns true if any of the assertions in a list match the shape.
```javascript
  var obj = {obj: {}, list: []};
  var asserts1 = {obj: ['object', 'array'], list: ['object', 'array'] };
  var asserts2 = [
    {obj: 'array', list: 'object'},
    {obj: 'object', list: 'object'},
    {obj: 'array',list:'array'},
    {obj: 'object',list: 'array'}
  ];
  shapeful(obj, asserts1) === true;
  shapeful(obj, asserts2) === true;
```
