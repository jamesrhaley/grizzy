/*
 (c) 2015, James Haley
 vizzy, a JavaScript library for managing data and state for a viualizations
 https://github.com/jamesrhaley
*/

;(function () { 'use strict';
  

   if (!Object.is) {
    Object.is = function(x, y) {
      // SameValue algorithm
      if (x === y) { // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
      }
    };
  }

  // /////////////////////// From Lowdash
  // // Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
  // /**
  //  * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
  //  * of an array-like value.
  //  */
  // var MAX_SAFE_INTEGER = 9007199254740991;
  // /** `Object#toString` result references. */
  // var argsTag = '[object Arguments]',
  //   arrayTag = '[object Array]',
  //   boolTag = '[object Boolean]',
  //   dateTag = '[object Date]',
  //   errorTag = '[object Error]',
  //   funcTag = '[object Function]',
  //   mapTag = '[object Map]',
  //   numberTag = '[object Number]',
  //   objectTag = '[object Object]',
  //   regexpTag = '[object RegExp]',
  //   setTag = '[object Set]',
  //   stringTag = '[object String]',
  //   weakMapTag = '[object WeakMap]';
  // /**
  //  * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
  //  * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
  //  *
  //  * @static
  //  * @memberOf _
  //  * @category Lang
  //  * @param {*} value The value to check.
  //  * @returns {boolean} Returns `true` if `value` is an object, else `false`.
  //  * @example
  //  *
  //  * _.isObject({});
  //  * // => true
  //  *
  //  * _.isObject([1, 2, 3]);
  //  * // => true
  //  *
  //  * _.isObject(1);
  //  * // => false
  //  */
  // function isObject(value) {
  //   // Avoid a V8 JIT bug in Chrome 19-20.
  //   // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  //   var type = typeof value;
  //   return !!value && (type == 'object' || type == 'function');
  // }
  // ////need to figure this one out
  // /**
  //  * The base implementation of `_.property` without support for deep paths.
  //  *
  //  * @private
  //  * @param {string} key The key of the property to get.
  //  * @returns {Function} Returns the new function.
  //  */
  // function baseProperty(key) {
  //   return function(object) {
  //     return object == null ? undefined : object[key];
  //   };
  // }
  // *
  //  * Gets the "length" property value of `object`.
  //  *
  //  * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
  //  * that affects Safari on at least iOS 8.1-8.3 ARM64.
  //  *
  //  * @private
  //  * @param {Object} object The object to query.
  //  * @returns {*} Returns the "length" value.
   
  // var getLength = baseProperty('length');
  // /**
  //  * Checks if `value` is a valid array-like length.
  //  *
  //  * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
  //  *
  //  * @private
  //  * @param {*} value The value to check.
  //  * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
  //  */
  // function isLength(value) {
  //     return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  // }
  // /**
  // * Checks if `value` is object-like.
  // *
  // * @private
  // * @param {*} value The value to check.
  // * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
  // */
  // function isObjectLike(value) {
  //     return !!value && typeof value == 'object';
  // }
  // /**
  //  * Checks if `value` is array-like.
  //  *
  //  * @private
  //  * @param {*} value The value to check.
  //  * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
  //  */
  // function isArrayLike(value) {
  //     return value != null && isLength(getLength(value));
  // }
  // /**
  //  * Checks if `value` is classified as a `Number` primitive or object.
  //  *
  //  * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
  //  * as numbers, use the `_.isFinite` method.
  //  *
  //  * @static
  //  * @memberOf _
  //  * @category Lang
  //  * @param {*} value The value to check.
  //  * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
  //  * @example
  //  *
  //  * _.isNumber(8.4);
  //  * // => true
  //  *
  //  * _.isNumber(NaN);
  //  * // => true
  //  *
  //  * _.isNumber('8.4');
  //  * // => false
  //  */
  // function isNumber(value) {
  //     return typeof value == 'number';// || (isObjectLike(value) && Object.prototype.call(value) == numberTag);
  // }
  // /////////////////// end lowdash 

  function mainApplication(){

    var vizzy = vizzy || {};

    vizzy.version = '0';


    function IdVector(vectorLength, counter){
      var vector = new Array(vectorLength);
          
      for (var index = 0; index < vectorLength; index++){
        vector[index] = counter++;
      }
      return vector; 
    }

    IdVector.prototype.type = function(){
      return INT_TYPE;
    }

    function StateVector(vectorLength){
      var vector = new Array(vectorLength);

      for (var index = 0; index < vectorLength; index++){
        vector[index] = false;
      }
      this.type_bool = vector
    }

    StateVector.prototype.type = function(){
      return BOOL_TYPE;
    }


    function NumberVector(data){
      var len = data.length;
      this[0]= new Array(len);
    }
    NumberVector.prototype ={
      vectorType: Number()
    }

    function BoolVector(data){
      var len = data.length;
      this[0]= new Array(len);
    }
    BoolVector.prototype ={
      vectorType: Boolean()
    }
    /**
    * DataTable: The main function of vizzy is to manage data
    *
    * @public
    * @param {Object} (data: Array of Objects) Data to visualize and make subsets
    *
    * return {Object} (this) 
    */
    function DataTable(data){

        if (!(this instanceof DataTable)) return new DataTable(data);

        var len = data.length;

        this.mainSet = data;
        this.subsets = {};
        this.setKeyProperty = "";
        this.counter = 0
        this.frame = { 0 : new IdVector(len, this.counter),
                       1: new StateVector(len),
                      }
    }

    // DataTable methods on the prototype
    DataTable.prototype = {
      /**
      * byKey: sets this.setKeyProperty to the keyName
      *
      * @public
      * @param {String} (keyName) The data you want a subset of
      * @param {string} (factor) the part of the data you want
      * @param {Function} (mathcerCallback) a function used to further subset the data
      * @param {Number} (matchedAgainst) a number value to evaluate the factor by mathcerCallback
      * return {Object} (this) current instance of SubSet
      */
      byKey: function (keyName, predicate){
        this.setKeyProperty = keyName;
        return this
      },
      /**
      * byValue: get a smaller subset of the data
      *
      * @public
      * @param {Object} (data) The data you want a subset of
      * @param {string} (factor) the part of the data you want
      * @param {Function} (mathcerCallback) a function used to further subset the data
      * @param {Number} (matchedAgainst) a number value to evaluate the factor by mathcerCallback
      * return {Object} the subset data
      */    
      byValue: function(value, predicate){
        var data = this.mainSet,
          key = this.setKeyProperty;
        return this.allOfByString(data, key, value);
      },
      /**
      * allOfByString: get a smaller subset of the data
      *
      * @public
      * @param {Object} (data) The data you want a subset of
      * @param {String} (factor) the part of the data you want
      * @param {Function} (mathcerCallback) a function used to further subset the data
      * @param {Number} (matchedAgainst) a number value to evaluate the factor by mathcerCallback
      * return {Object} the subset data
      */
      allOfByString : function (data, key, valueOfKey, predicate){
        var all = [],
            len = data.length,
            valueString = valueOfKey.toString().toUpperCase();

        for( var i = 0; i < len; i++){
          var keyName = data[i][key].toString().toUpperCase();
          if (keyName === valueString){
            all.push(data[i])
          }
        }
        return this.subset = all;
      },
      greaterThan : function (value, matchedAgainst){
        if (value > matchedAgainst) return value;
      },

      greaterOrEqual : function (value, matchedAgainst){
        if (value >= matchedAgainst) return value;
      },

      lessThan : function (value, matchedAgainst){
        return value < matchedAgainst;
      },

      lessOrEqual : function (value, matchedAgainst){
        return value <= matchedAgainst;
      },
      /**
      * currentSet: get a smaller subset of the data
      *
      * @public
      * @param {Object} (data) The data you want a subset of
      * @param {String} (factor) the part of the data you want
      * @param {Function} (mathcerCallback) a function used to further subset the data
      * @param {Number} (matchedAgainst) a number value to evaluate the factor by mathcerCallback
      * return {Object} the subset data
      */
      currentSet: function (predicate){
        return this.subset;
      },
      /**
      * subset: get a smaller subset of the data
      *
      * @public
      * return {Object} the subset data
      */
      caller: function(arg){
        console.log('something happened again')
        console.log(arg)
        var len = arg.length
        return len
      },
      /**
      * subset: get a smaller subset of the data
      *
      * @public
      * return {Object} the subset data
      */
      tryCallBack: function(predicate, predicateObject){
        if (typeof predicate === "function") {
          console.log('something happened')
          return predicate.call(this, predicateObject)
        }
      }
    }
//////////////////////////////////////////////////////
    function BinaryTree(){
      this.Nodes = new Array();
      this.level = 0;
      this.node = 0;
     
      this.setNode = function(value,level,node){
        if (level === undefined) {
          this.Nodes[this.btSMF(this.level, this.node)] = value;
        }else {
          this.Nodes[this.btSMF(level,node)] = value;
        }
      }
     
      this.getNode = function(level, node){
        if (level === undefined) {
          return this.Nodes[this.btSMF(this.level,this.node)];
        }else {
          return this.Nodes[this.btSMF(level,node)];
        }
      }
     
      this.root = function(value){
        this.level = 0;
        this.node = 0;
        if (value !== undefined) {
          this.Nodes[this.btSMF(this.level,this.node)] = value;
        }
        return this.Nodes[this.btSMF(this.level,this.node)];
      }
     
      this.leftChild = function(value){
        this.level++;
        this.node = this.node * 2;
        if (value !== undefined) {
          this.Nodes[this.btSMF(this.level,this.node)] = value;
        }
        return this.Nodes[this.btSMF(this.level,this.node)];
      }
     
      this.rightChild = function(value){
        this.level++;
        this.node = this.node * 2 + 1;
        if (value !== undefined) {
          this.Nodes[this.btSMF(this.level, this.node)] = value;
        }
        return this.Nodes[this.btSMF(this.level, this.node)];
      }
     
      this.parent = function(value){
        this.level--;
        this.node = this.node >> 1;
        if (value !== undefined) {
          this.Nodes[this.btSMF(this.level, this.node)] = value;
        }
        return this.Nodes[this.btSMF(this.level,this.node)];
      }
     
      this.btSMF = function(level, node){
        return node + (1 << level) - 1;
      }
    }

    /**
    * Class DataCapsule: creates a new instance of DataCapsule.  The goal
    * of this object is to create new subsets of data fast and with little
    * overhead.  Keys are converted to numbers for speed in iteration and 
    * all object lengths are kept track of to avoid using `in` and 
    * `hasOwnProperty`.
    * 
    * This Class does not mutate the dataset.  It saves index point in order
    * of how the user wishes to retrive them.  
    *
    * example: if a user wished to know all of the locations of 5 in a dataset
    * the new data set would save the locations.
    * [{0:5, 1:'tree'},{0:5, 1:'apple'},{0:4, 1:'seed'}] => [0,1]
    *
    * 
    *
    * TODO while there are many things todo, the main part to talk about
    * the most important are as follows
    *    - a reduce method that creates a new instance of this Class
    *    - a directory like tree to keep track of where subsets are in 
    *      memory and how the user got to them
    *
    * @public Class
    * @param {Object} (data) an array of objects
    * 
    * @prop {Number} columns => saved length of columns for iteration
    * @prop {Number} rows => saved length of rows for iteration
    * @prop {Object} fieldsByName => {'string':number}
    * @prop {Object} fieldsByIndex => {number:'string'}
    * @prop {Array of Objects} data => data stored by index
    *
    * @method byField => subsets by a field of the data
    * @method andInclude => alows user to set a reduced number of fields
    * @method byAllValues => The value of the field to get
    * @method toJSON => returns JSON of target subset
    * @method retrive => TODO return a data set with current format
    * @method head => TODO return a preview of the JSON
    */
    function DataCapsule(data){

      if (!(this instanceof DataCapsule)) return new DataCapsule(data);

      var dataLen = data.length,
          keys = Object.keys(data[0]),
          keyLen = keys.length;
      this.columns = keyLen;
      this.rows = dataLen;

      this.fieldsByName = {};
      this.fieldsByIndex = {};

      this.data = new Array(dataLen);

      // subset should be a class
      this.subset = [];
      this.currentData = 0;
      this.setKeyValue = NaN;
      this.setFields = [];

      for (var keyIndex = 0; keyIndex < keyLen; keyIndex++){
        this.fieldsByName[ keys[ keyIndex ]]= keyIndex;
        this.fieldsByIndex[ keyIndex ] = keys[ keyIndex ]
      }
      for (var rowIndex = 0; rowIndex < dataLen; rowIndex++){
        this.data[ rowIndex ] = {};
        for (var keyIndex2 = 0; keyIndex2 < keyLen; keyIndex2++){
          this.data[ rowIndex ][ keyIndex2 ] = data[ rowIndex ][ keys[ keyIndex2 ]]
        }
      }
    }

    DataCapsule.prototype = {

      /**
      * byField: sets this.setKeyValue to the keyName. must be chained
      *
      * @public
      * @param {String} (keyName) The data you want a subset of
      * @param {Function} (predicate) a function used to further subset the data
      * @param {Number} (matchedAgainst) a number value to evaluate the factor by mathcerCallback
      * return {Object} (this) current instance of SubSet
      */
      byField: function (keyName, predicate){
        if (this.currentData === 0){}

        this.setFields[0] = keyName;
        this.setKeyValue = this._keyToIndex(keyName);
        
        return this
      },
      // this will be a function of other keys to include
      andInclude : function (arrayOfKeys) {
        if (this.currentData === 0){}

        var joinedArray = this.setFields.concat(arrayOfKeys);

        //console.log(joinedArray);

        this.setFields = joinedArray;
        
        return this
      },
      /**
      * byAllValues: get a smaller subset of the data
      *
      * @public
      * @param {string} (value) the part of the data you want
      * @param {Function} (predicate) a function used to further subset the data
      * return {Object} the subset data
      */ 
      byAllValues: function(value, predicate){
        var key = this.setKeyValue;
        this.setKeyValue = NaN;
        if (arguments.length > 1){
          return this._indexByNumberAndPred.bind(predicate)
        }
        this._indexByNumber(key, value);
        return this
      },

      toJSON : function(){

        if (this.currentData === 0){
          return this.data;
        } else {
          var current = this.currentData - 1,
              sub = this.subset[current],
              subset = sub['idtags'],
              sublen = subset.length,
              fullset = this.data,
              newJSON = new Array(sublen),
              keyset = sub['fields'][0] !== undefined ? sub['fields'][0] : this.fieldsByIndex,
              keylen = sub['fields'][0] !== undefined ? sub['fields'][1] : this.columns;

          // console.log(keyset)
          for (var subsetIndex = 0; subsetIndex < sublen; subsetIndex++){
            newJSON[subsetIndex] = {};
            for (var columnIndex = 0; columnIndex < keylen; columnIndex++){
              //console.log(fullset[ subset[ subsetIndex ]][ columnIndex ])
              newJSON[ subsetIndex ][ keyset[ columnIndex ]] = fullset[ subset[ subsetIndex ]][ columnIndex ]
            }
          }
          return newJSON;
        }
      },
      /**
      * _indexByNumber: get a smaller subset of the data
      *
      * @public
      * @param {Object} (data) The data you want a subset of
      * @param {String} (factor) the part of the data you want
      * @param {Function} (mathcerCallback) a function used to further subset the data
      * @param {Number} (matchedAgainst) a number value to evaluate the factor by mathcerCallback
      * return {Object} the subset data
      */
      _indexByNumber : function (key, valueString){
        if (this.currentData === 0){}

        var vector = [],
            current = this.currentData,
            data = current === 0 ? this.data : this.subset[current]['idtags'],
            len = data.length;

        for( var i = 0; i < len; i++){
          var keyValue = data[i][key];

          if (keyValue === valueString){
            vector.push(i)
          }
        }
        this._setSubSet(vector);
      },
      _indexByNumberAndPred: function (key, valueString){
        var vector = [],
            current = this.currentData,
            data = current === 0 ? this.data : this.subset[current]['idtags'],
            len = data.length;

        for( var i = 0; i < len; i++){
          var keyValue = data[i][key];

          if (keyValue === valueString && this.predicate){
            vector.push(i)
          }
        }
        this._setSubSet(vector);
      },

      _setSubSet: function(idVector){
        var currentDataTag = this.currentData + 1,
            subset ={//this would be better as an array
              idtags: idVector,
              fields: [],
              id: currentDataTag
            };

        if (this.setFields.length > 1){
          var fieldsByIndex = {},
              field = this.setFields,
              fieldLen = field.length,
              NameMap = this.fieldsByName;

          for (var index = 0; index < fieldLen; index++){
            fieldsByIndex[ NameMap[ field[ index ]]] = field[ index ]
          }
          subset.fields[0] = fieldsByIndex;
          subset.fields[1] = fieldLen;
        }

        this.setFields = [];
        this.currentData = currentDataTag;

        this.subset[currentDataTag - 1] = subset;
      },
      // forget why I made this.  I think I was trying to have the ablily
      // to split the functin in half if I have a call back
      _keyToIndex: function(keyName){
        return this.fieldsByName[keyName]
      }
    }




    function ToObject(val) {
      if (val == null) {
              throw new TypeError('Object.assign cannot be called with null or undefined');
      }

      return Object(val);
    }

    /**
    * assign is a extend method that will be in ES5.
    *
    * @public
    * @param {Object} target The object of collum names and types
    * @param {Object} source The object of collum names and types
    * 'str', 'bool: defalt false','number: defalt NaN','object'
    * 
    */
    var assign = Object.assign || function (target, source) {
      var pendingException,
          from,
          keys,
          to = ToObject(target);

      for (var s = 1; s < arguments.length; s++) {
        from = arguments[s];
        keys = Object.keys(Object(from));

      for (var i = 0; i < keys.length; i++) {
          try {
            to[keys[i]] = from[keys[i]];
          } catch (err) {
            if (pendingException === undefined) {
              pendingException = err;
            }
          }
        }
      }

      if (pendingException) {
        throw pendingException;
      }

      return to;
    };
    // native method !isNaN
    function isNotNaN(number){
      return !isNaN(number);
    }
    function naNToZero(number){
      return isNaN(number) ? 0 : number;
    }

    /**
    * isZero :true false if zero
    * @private
    * @param {Number} (check) number if zero
    * return boolean
    */
    function isZero(check){
      return check === 0;
    }

    /**
    * rangeStop :true false if zero
    * @private
    * @param 
    * return boolean
    */
    function rangeStop(stop){
      var lst = new Array(stop);
      for (var i = 0; i < stop;i++){
        lst[i] = i;
      }
      return lst;
    }

    /**
    * rangeStartStop :true false if zero
    * @private
    * @param 
    * return boolean
    */
    function rangeStartStop(start, stop){
      var range = stop - start > 0 ? stop - start : 0,
          lst = new Array(range),
          count = 0;
      for(var i = start; i < stop; i++){
        lst[count] = i;
        count++;
      }
      return lst;
    }

    /**
    * rangeStep :
    * @private
    * @param
    * return 
    */
    function rangeStep(start, stop, step){
      var lst = [],
          s = start,
          isLess = start < stop,
          positive = step > 0;

      if (isLess && positive && !isZero(step)){
        for (var i = start; i < stop; i+=step){
          lst.push(i);
        } 
      } else if (!isLess && !positive && !isZero(step)){
        for (var i = start; i > stop; i+=step){
          lst.push(i);
        } 
      }      
      return lst  
    }

    /**
    * range: generates a list of a range.  Works like python's range
    * https://docs.python.org/2/library/functions.html
    *
    * @static
    * @param {Number} (arg1) 
    * @param {Number} (arg2) 
    * @param {Number} (arg3) 
    * return {Array} => list of numbers
    */
    function range(arg1, arg2, arg3){
      if (arguments.length === 1){
        return rangeStop(arg1)
      } else if (arguments.length === 2){
        return rangeStartStop(arg1, arg2)
      } else {
        // not yet working
        return rangeStep(arg1, arg2, arg3);
      }
    }

    function sum(array, callBack){
      var total = 0, 
        len = array.length, value, i = -1;
      if (arguments.length === 1) {
        while (++i < len){
          value = array[i]
          if (isNotNaN(value)) total += value;
        }
      } else {
        while (++i < len){
          value = callBack.call(array, array[i], i)
          if (isNotNaN(value)) total += value;
        }
      }
      return total;
    };
    function mean(){}

    function meadian(){}

    function mode(){}

    function sumVectors(vec1, vec2, NaNToZero){
      var vecLength = vec1.length <= vec2.length ? vec1.length : vec2.length,
          result = new Array(vecLength);
      if (NaNToZero === false){
        for (var i = 0; i < vecLength; i++){
          result[i] = vec1[i] + vec2[i];
        }
      }
      for (var i = 0; i < vecLength; i++){
        result[i] = vec1[i] + vec2[i];
      }
      return result
    }



    // check if coercion does not result in NaN before returning int
    function makeInt(number){
      return isNotNaN(number) ? parseInt(number) : 0;
    }

    function makeFloat(number, places){
      if (isNotNaN(number)){
        if (arguments.length === 1){
          return parseFloat(number);
        } else {
          var value = parseFloat(number).toFixed(places);
          return makeFloat(value);
        }
      } else {
        return 0;
      }
    }

    function hasInfinity(data, property){
      var bool = false,
          len = data.length;
      if (Array.isArray( data )){
        for (var i = 0; i< len; i++){
          if (data[i][property] == Infinity){
            return bool = true;
          }
        }
      } else if (data instanceof Object && !(data instanceof Array)) {
        for (var key in data){
          if (data[property] == Infinity){
            return bool = true;               
          }
        }
      }
      return bool
    }

    function hasOnlyNumbers(data, property){
        var bool = true,
            len = data.length,
            value;
      if (Array.isArray( data )){
        for (var i = 0; i< len; i++){
          value = data[i][property]
          if ( !(isNotNaN( value ) && isNumber( parseInt(value) )) ){
            return bool = false;
          }
        }
      } else if (data instanceof Object && !(data instanceof Array)) {
        value = data[property]
        if (value){
          if ( !(isNotNaN( value ) && isNumber( parseInt(value) )) ){
            return bool = false;               
          }
        }
      }
      return bool
    }

    function hasOnlyNumbersReport(data, property){
      var report = {count:0,locations:[]},
          len = data.length,
          value;
      if (Array.isArray( data )){
        for (var i = 0; i< len; i++){
          value = data[i][property]
          if ( !(isNotNaN( value ) && isNumber( parseInt(value) )) ){
            report.count +=1
            report.locations.push(data[i]);
          }
        }
      } else if (data instanceof Object && !(data instanceof Array)) {
        value = data[property]
        if (value){
          if ( !(isNotNaN( value ) && isNumber( parseInt(value) )) ){
            report.count +=1
            report.locations.push(data)               
          }
        }
      }
      return report
    }

    /**
    * removeDupicateNodes: takes multiple objects, removes duplicates, and reports
    * any discrepancy: if data does not match up.  Thist function works on a nested object
    * that is one layer deep
    *
    * @maybe static or public?
    * @param {Object} (data: Objected like that created in sum_reduceMany) The data, a 
    *   nested object, to perform removeDupicateNodes.
    *
    * return {Object of Objects} 
    *   (reduced => {unique: {key:value},
    *                discrepancy:{count:'Number', 
    *                record:'array' of 'arrays'} }})
    *   unique =>'object' of all of the unique nodes
    *   discrepancy.count =>'number' of an nodes that were !==
    *   discrepancy.record =>'array' of 'arrays' that record the name and unmatching values 
    *       of nodes with discrepancies
    */

    function removeDupicateNodes(data){
      var reduced = {
            unique : {},
            discrepancy : {
              count : 0,
              record: [] 
            }
          };

      for (var dataKey in data){
        //get nested object
        var innerData = data[dataKey];
        for (var innerKeys in innerData){
          if (!(innerKeys in reduced.unique)){
            reduced.unique[ innerKeys ] = innerData[ innerKeys ]
          } else {
            var first = reduced.unique[ innerKeys ],
                second = innerData[ innerKeys ],
                highest = first >= second ? first : second;

            if (first !== second){
              // capture data that has inconsistent information
              var fault = [innerKeys,first,second];
              reduced.discrepancy.count += 1;
              reduced.discrepancy.record.push(fault);
            }
            reduced.unique[ innerKeys ] = highest;
          }
        }
      }

      return reduced;
    }

    /**
    * equalCount: reports the number of typeOne and typeTwo that are not equal
    *
    * @public
    * @param {Object} (data: an array of Object) The data you want to subset
    * @param {String} (typeOne) fist key of Object to test
    * @param {String} (typeOne) second key of Object to test
    * return {Number} number not equal
    */
    function equalCount(data, typeOne, typeTwo){
        var num = 0,
            len = data.len;
      for( var i = 0; i < data.length; i++){
        if (data[i][typeOne] === data[i][typeTwo]){
          num += 1;
        }
      }
      return num;
    }

    /**
    * notEqualCount: reports the number of typeOne and typeTwo that are not equal
    *
    * @public
    * @param {Object} (data: an array of Object) The data you want to subset
    * @param {String} (typeOne) fist key of Object to test
    * @param {String} (typeOne) second key of Object to test
    * return {Number} number not equal
    */
    function notEqualCount(data, typeOne, typeTwo){
      var num = 0,
          len = data.len;
      for( var i = 0; i < data.length; i++){
        if (data[i][typeOne] !== data[i][typeTwo]){
          num += 1;
        }
      }
      return num;
    }

    /**
    * equalProperty: reports the number of propOne and propTwo that are not equal
    *
    * @public
    * @param {Object} (data: an array of Object) The data you want to subset
    * @param {String} (propOne) fist key of Object to test
    * @param {String} (propTwo) second key of Object to test
    * return {Number} (all) not equal
    */
    function equalProperty(data, propOne, propTwo){
      var all = [],
          len = data.length;
      for( var i = 0; i < len; i++){
        if (data[i][propOne] === data[i][propTwo]){
            all.push(data[i])
        }
      }
      return all;
    }

    /**
    * notEqualProperty: reports the number of propOne and propTwo that are not equal
    *
    * @public
    * @param {Object} (data: an array of Object) The data you want to subset
    * @param {String} (propOne) fist key of Object to test
    * @param {String} (propTwo) second key of Object to test
    * return {Number} (all) not equal
    */
    function notEqualProperty(data, propOne, propTwo){
      var all = [],
          len = data.len;
      for( var i = 0; i < data.length; i++){
        if (data[i][propOne] !== data[i][propTwo]){
          all.push(data[i])
        }
      }
      return all;
    }

    /**
    * getColumn: takes an Array of Objects and returns all of the values of
    *   one key
    *
    * @public
    * @param {Object} (data: an array of Object) The data you want to subset
    * @param {String} (property) key of the column to get
    * return {Array} (vector) one column form an Array of Objects
    */
    function getColumn(data, property){
      var len = data.length,
          vector = new Array(len);

      for( var i = 0; i < len; i++){
        vector.push([data[i][property],i])
      }
      return vector
    }

    /**
    * edgeSet: takes Array of Objects 
    *
    * @public
    * @param {Object} (data: an array of Object) The data you want to subset
    * @param {String} (source) key of data that is source of edge
    * @param {String} (target) key of data that is target of edge
    * @param {String} (weight) key of data that is the weight of edge
    * return {Array} (vector) one column form a JSON like object
    */
    function edgeSet(data, source, target, weight){
      var len = data.length,
          set = new Array(len);

      for( var i = 0; i < len; i++){
        var s = data[i][source],
            t = data[i][target],
            f = data[i][weight],
            edge = {"source":s, "target":t, "value": f};
        set.push(edge);
      }
      return set   
    }

    /**
    * sum_reduce: Takes a list of edges, takes one end of the edge and sums all duplicates
    * in data in this method are edges with the keys as source, target and value.  So if
    * you have 10 of the same souces going into 10 different targets
    *
    * @public
    * @param {Object} (data: an edge) The data to have the reduce perfomed on
    * @param {String} (sideOfEdge: key of the source or target side) the set of keys 
    *   where any duplicate will be removed
    * @param {String} (weight: the value of the edge) the set of keys to be sumed if 
    *   it is a duplicate of sideOfEdge
    *
    * return {Object} (reduced => {key:value}) An object of only unique keys and their values 
    */
    function sum_reduce(data, sideOfEdge, weight){
      var reduced = {},
          len = data.length;
      
      for (var i = 0; i< len; i++){
        // get new key for return reduced object
        var key = data[i][ sideOfEdge ],
            value = parseInt(data[i][ weight ])
        // check if key has already be added to reduced
        if (!(key in reduced)){
          reduced[ key ] = value;
        } else {
          reduced[ key ] += value;
        }
      }
      return reduced;
    }
    /**
    * sum_reduceMany: preforms sum_reduce on multipule edge
    *
    * @public
    * @param {Object} (data: an edge) The data to have the reduce perfomed on
    * @param {Array} (edgeEnds: ) the set of keys where any duplicate will be removed
    * @param {String} (weight) the set of keys to be sumed if it is a duplicate of sideOfEdge
    *
    * return {Object of Objects} (reduced_many => {edgeEnd:{key:value}})
    */
    function sum_reduceMany(data, edgeEnds, weight ){
      var args = edgeEnds,
          len = args.length,
          reduced_many = {};

      for (var i = 0; i < len; i++){
        reduced_many[args[i]] = sum_reduce(data, args[i], weight);
      }

      return reduced_many; 
    }
    //vectors
    vizzy.BoolVector = BoolVector;

    vizzy.DataTable = DataTable;
    vizzy.DataCapsule = DataCapsule;

    // helpers
    vizzy.assign = assign;
    vizzy.range = range;

    //math
    vizzy.sum = sum;
    vizzy.sumVectors = sumVectors;

    // evaluating
    vizzy.isNotNaN = isNotNaN;
    vizzy.makeInt = makeInt;
    vizzy.makeFloat = makeFloat;
    vizzy.hasInfinity = hasInfinity;
    vizzy.hasOnlyNumbers = hasOnlyNumbers;
    vizzy.hasOnlyNumbersReport = hasOnlyNumbersReport;
    vizzy.equalCount = equalCount;
    vizzy.notEqualCount = notEqualCount;
    vizzy.equalProperty = equalProperty;
    vizzy.notEqualProperty = notEqualProperty;

    // setting data
    vizzy.equalProperty = equalProperty;
    vizzy.notEqualProperty = notEqualProperty;
    vizzy.removeDupicateNodes = removeDupicateNodes;
    vizzy.getColumn = getColumn;
    vizzy.edgeSet = edgeSet;
    vizzy.sum_reduce = sum_reduce;
    vizzy.sum_reduceMany = sum_reduceMany;

    return vizzy
  }

  var vz = mainApplication()

  // export as AMD/CommonJS module or global variable
  if (typeof define === 'function' && define.amd) define('vz', function() { return vz; });
  else if (typeof module !== 'undefined') module.exports = vz;
  else if (typeof self !== 'undefined') self.vz = vz;
  else window.vz = vz;

})();
