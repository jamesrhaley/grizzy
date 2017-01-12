'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.byKeyOrder = byKeyOrder;
exports.manyDrawObjects = manyDrawObjects;

var _moduleKeys2 = require('./../moduleKeys');

var _moduleKeys3 = _interopRequireDefault(_moduleKeys2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _moduleKeys = (0, _moduleKeys3.default)(),
    BIND = _moduleKeys.BIND,
    RENDER = _moduleKeys.RENDER;

var keyMatchError = 'drawShedule Objects in arrays must follow the ' + 'pattern of keys of the first Object';

function keyMatch(keyArray) {
  var master = keyArray.shift();

  for (var i = 0; i < keyArray.length; i++) {
    var inner = keyArray[i];

    for (var j = 0; j < inner.length; j++) {

      if (master.indexOf(inner[j]) < 0) {
        return false;
      }
    }
  }
  return true;
}

/**
 * matches the order is objects in a drawShedule object
 * @private
 * @param {Array} isObjects - an undetermined amount of is objects.
 */
function byKeyOrder(isObjectsArray, stringType) {
  var allKeys = isObjectsArray.map(function (obj) {
    return Object.keys(obj);
  });

  if (keyMatch(allKeys)) {
    var result = allKeys.map(function (setOfKeys) {
      return (
        // get to inner keys
        setOfKeys.map(function (key) {
          return (
            // get to inner objects
            isObjectsArray.map(function (obj) {
              return {
                type: stringType,
                value: [obj[key]]
              };
            })
          );
        })
      );
    });

    var merged = result[0].map(function (arr) {
      return arr.reduce(function (pre, curr) {
        if (Object.keys(pre).length === 0) {
          return curr;
        } else {
          var value = pre.value.concat(curr.value);
          return Object.assign({}, pre, { value: value });
        }
      }, {});
    });

    return merged;
  } else {
    throw new Error(keyMatchError);
  }
}

/**
 * matches the order of many drawShedule objects
 * @private
 * @param {Array} drawScheduleObjectArray - array of that
 */
function manyDrawObjects(drawSchObjectArray) {
  var bindArray = drawSchObjectArray.map(function (drawSchObj) {
    return drawSchObj.bind;
  });

  var renderArray = drawSchObjectArray.map(function (drawSchObj) {
    return drawSchObj.is;
  });

  var orderedBindArray = byKeyOrder(bindArray, BIND);

  var orderedRenderArray = byKeyOrder(renderArray, RENDER);

  return orderedBindArray.concat(orderedRenderArray);
}