/**
 * shapeful(obj, {"key": "type"});
 * shapeful({"foo": "bar"}, {"foo": "string"});
 * shapeful(["foo", "bar"], "array");
 * shapeful({"foo": "bar"}, {"foo": "string", "baz": {"optional": "string"}});
 */
var optional = '__optional';
var array = '__array';
module.exports = function(obj, assert) {
  if (typeof obj === 'undefined') return assert === 'undefined';
  if (typeof assert === 'undefined') return false;
  if (typeof assert === 'string' && assert !== 'array') return typeof obj === assert && !Array.isArray(obj);
  if (assert === 'array') return Array.isArray(obj);
  if (Array.isArray(assert)) return assert.reduce(function(p, v){
    return p || module.exports(obj, v);
  }, false);
  return Object.keys(assert).reduce(function(p, k){
    var a = assert[k];
    // If the assertion is a special optional assertion, if the
    // attribute exists, we check it's type
    if (typeof a === 'object' && a.hasOwnProperty(optional)) {
      if (!obj.hasOwnProperty(k)) return true;
      a = a[optional];
    }

    // If the object assertion is a special array assertion, we
    // apply the assert to all members of the input.
    if (typeof a === 'object' && a.hasOwnProperty(array)) {
      return p && Array.isArray(obj[k]) && obj[k].reduce(function(c, v){
        return c && module.exports(v, a[array]);
      }, true);
    }
    return p && obj.hasOwnProperty(k) && module.exports(obj[k], a)
  }, true);
};
