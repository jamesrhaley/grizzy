import moduleKeys from './../moduleKeys';

const { BIND, RENDER } = moduleKeys();

const keyMatchError = 'drawShedule Objects in arrays must follow the '+
  'pattern of keys of the first Object';

function keyMatch(keyArray) {
  let master = keyArray.shift();

  for (let i = 0; i < keyArray.length; i++) {
    let inner = keyArray[i];
    
    for (let j = 0; j < inner.length; j++) {
      
      if( master.indexOf(inner[j]) < 0 ) {
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
export function byKeyOrder(isObjectsArray, stringType){
  const allKeys = isObjectsArray.map(obj => Object.keys(obj));
  
  if ( keyMatch(allKeys) ) {
    const result = allKeys.map(setOfKeys =>
      // get to inner keys
      setOfKeys.map(key =>
        // get to inner objects
        isObjectsArray.map( obj => 
          ({
            type: stringType,
            value: obj[key]
          })
        )
      )
    );

    return result[0];
  }

  else {
    throw new Error(keyMatchError);
  }
}

/**
 * matches the order of many drawShedule objects
 * @private
 * @param {Array} drawScheduleObjectArray - array of that
 */
export function manyDrawObjects(drawSchObjectArray) {
  // console.log('hellowwwww',drawSchObjectArray)
  const bindArray = drawSchObjectArray.map(drawSchObj => drawSchObj.bind);
  const renderArray = drawSchObjectArray.map(drawSchObj => drawSchObj.is);

  return byKeyOrder(bindArray, BIND)
    .concat(byKeyOrder(renderArray, RENDER));
}