(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Rx"));
	else if(typeof define === 'function' && define.amd)
		define(["Rx"], factory);
	else if(typeof exports === 'object')
		exports["grizzy"] = factory(require("Rx"));
	else
		root["grizzy"] = factory(root["Rx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var draw = __webpack_require__(1);
	var dimensions = __webpack_require__(2);
	var blankSVG = __webpack_require__(3);
	var drawSchedule = __webpack_require__(4).drawSchedule;
	var load = __webpack_require__(4).load;
	
	module.exports = {
		blankSVG: blankSVG,
		draw: draw,
		drawSchedule: drawSchedule,
		dimensions: dimensions,
		load: load
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * draw -> manages the heavy lifing of d3 by creating  a reusable
	 * pattern to create graphics.  Note: if setting.data is `false`
	 * parent object will bind only
	 *
	 * @param{String} (what) -> what will be picked in the selection 
	 * @param{Object::Array} (parent) -> the svg that will be render new
	 *   images
	 * @parm{Object} (settings) -> All of the functionality of the view of
	 *   the d3.  must include properties data, and is.
	 * example: 
	 *     draw("rect.range", container, {
	 *       data: rangez,
	 *       is : {
	 *         enter : (selection) => {
	 *           return selection.enter().append("rect")
	 *             .attr({
	 *               "class": (d, i) => "range s" + i,
	 *               "width": w0,
	 *               "height": height,
	 *               "x": reverse ? lastScale : 0
	 *             })
	 *           .transition()
	 *             .duration(duration)
	 *             .attr({
	 *               "width": w1,
	 *               "x": reverse ? currentScale : 0
	 *             });
	 *         },
	 *         postUpdate : (selection) => {
	 *           return selection.transition()
	 *             .duration(duration)
	 *             .attr({
	 *               "x": reverse ? currentScale : 0,
	 *               "width": w1,
	 *               "height": height
	 *             });
	 *         },
	 *         exit : (selection) => {
	 *           return selection.exit().remove();
	 *         }
	 *       }
	 *     });
	 */
	
	function draw(what, parent, settings) {
	  var data = settings.data,
	      create = data === false ? parent : parent.selectAll(what),
	      keys = Object.keys(settings.is),
	      len = keys.length,
	      applyArgs = void 0;
	
	  if (!(data instanceof Array && data[1] instanceof Function)) {
	    applyArgs = [data];
	  } else {
	    applyArgs = data;
	  }
	
	  if (data) {
	    create = create.data.apply(create, applyArgs);
	  }
	
	  for (var i = 0; i < len; i++) {
	    create.call(settings.is[keys[i]]);
	  }
	  return create;
	}
	
	module.exports = draw;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	* dimensions -> follows the general d3 sizing rules with margins
	* the goal is have a cleaner way of coding the absolute width and 
	* the dimensions the graph will fall in.
	*
	* @param{Object} (sizing) -> object of width, heigh, 
	* margin{top,right,bottom,left}. if margin is left off then all
	* margins are set to zero.
	* example:
	* var SIZE = dimensions({
	*     width : window.innerWidth - 600,
	*     height : window.innerHeight*.9,
	*     margin:{top: 10, right: 30, bottom: 10, left: 20}
	* });
	*/
	function baseDimensions(width, height) {
	  var margintop = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	  var marginright = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	  var marginBottom = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
	  var marginLeft = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];
	
	  var sizeObject = {
	    margin: {
	      top: margintop,
	      right: marginright,
	      bottom: marginBottom,
	      left: marginLeft
	    },
	    width: width - marginLeft - marginright,
	    height: height - margintop - marginBottom
	  };
	
	  return sizeObject;
	}
	
	function dimensions(sizing) {
	  var props = ['width', 'height', 'margin'];
	  var dim = {};
	
	  props.forEach(function (value, index) {
	    for (var prop in sizing) {
	
	      if (sizing.hasOwnProperty(value)) {
	        dim[index] = sizing[value];
	      } else {
	        dim[index] = undefined;
	      }
	    }
	  });
	
	  if (dim[2] === undefined) {
	    dim[2] = {
	      top: 0,
	      right: 0,
	      bottom: 0,
	      left: 0
	    };
	  }
	
	  return baseDimensions(dim[0], dim[1], dim[2].top, dim[2].right, dim[2].bottom, dim[2].left);
	}
	
	module.exports = dimensions;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	* blankSVG -> Creates a new, blank SVG to work on. follows d3 
	* conventions of calculating the sizy of the canvas
	*
	* @param{Number} (width) -> value of width
	* @param{Number} (height) -> value of height
	* @param{Object} (margin) -> object of top, bottom, left, right of Numbers
	* @param{String} (select) -> the id or class of the DOM selection
	* 
	* example:
	* const margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5},
	*     width = 960 - margin.right,
	*     height = 500 - margin.top - margin.bottom;
	* 
	* svg = new blankSVG(width, height, margin, '#chart')
	*/
	
	function blankSVG(d3local, size, select) {
	  select = select !== undefined ? select : 'body';
	
	  return d3local.select(select).append("svg").attr({
	    "width": size.width + size.margin.left + size.margin.right,
	    "height": size.height + size.margin.top + size.margin.bottom
	  }).append("g").attr({
	    "transform": "translate(" + size.margin.left + "," + size.margin.top + ")"
	  });
	}
	
	module.exports = blankSVG;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Rx = __webpack_require__(5);
	
	var _require = __webpack_require__(6);
	
	var queueSubject = _require.queueSubject;
	
	var _require2 = __webpack_require__(10);
	
	var LOAD = _require2.LOAD;
	var BIND = _require2.BIND;
	var PRE_BIND = _require2.PRE_BIND;
	
	/**
	 * drawSchedule -> manages the heavy lifing of d3 by creating  a 
	 * reusable pattern to create graphics.  Note: if setting.data is 
	 * `false` parent object will bind only.  Should be returned in a 
	 * function.
	 *
	 * @param{String} (what) -> what will be picked in the selection 
	 * @param{Object::Array} (parent) -> the svg that will be render new
	 *   images
	 * @parm{Object} (settings) -> All of the functionality of the view of
	 *   the d3.  must include properties data, and is.
	 *
	 * example: 
	 * (parentObject, data) => {
	 *     return drawSchedule("rect.range", parentObject, {
	 *       data: data,
	 *       is : {
	 *         enter : (selection) => {
	 *           return selection.enter().append("rect")
	 *             .attr({
	 *               "class": (d, i) => "range s" + i,
	 *               "width": w0,
	 *               "height": height,
	 *               "x": reverse ? lastScale : 0
	 *             })
	 *           .transition()
	 *             .duration(duration)
	 *             .attr({
	 *               "width": w1,
	 *               "x": reverse ? currentScale : 0
	 *             });
	 *         },
	 *         update : (selection) => {
	 *           return selection.transition()
	 *             .duration(duration)
	 *             .attr({
	 *               "x": reverse ? currentScale : 0,
	 *               "width": w1,
	 *               "height": height
	 *             });
	 *         },
	 *         exit : (selection) => {
	 *           return selection.exit().remove();
	 *         }
	 *       }
	 *     });
	 *  }
	 */
	
	function drawSchedule(what, parent, settings) {
	  var data = settings.data,
	      create = data === false ? parent : parent.selectAll(what),
	      keys = Object.keys(settings.is),
	      len = keys.length,
	      is = settings.is,
	      applyArgs = undefined,
	      dataBinder = void 0;
	
	  if (!(data instanceof Array && data[1] instanceof Function)) {
	    applyArgs = [data];
	  } else {
	    applyArgs = data;
	  }
	
	  if (data) {
	    dataBinder = function dataBinder() {
	      return create.data.apply(create, applyArgs);
	    };
	  } else {
	    dataBinder = function dataBinder() {
	      return create;
	    };
	  }
	
	  return {
	    type: PRE_BIND,
	    // if problems up comment this out
	    // parent: create,
	    dataBinder: dataBinder,
	    is: is,
	    keys: keys,
	    len: len
	  };
	}
	
	/**
	 * load-> create a series of transition to occur in your visualization. 
	 * Each one will happen after the pervious one completes.
	 *  
	 * @param{Object} (transitions) -> any number of object created by
	 *   a drawSchedule function
	 */
	function load() {
	  for (var _len = arguments.length, transitions = Array(_len), _key = 0; _key < _len; _key++) {
	    transitions[_key] = arguments[_key];
	  }
	
	  queueSubject.onNext({
	    type: LOAD,
	    time: Date.now(),
	    transitions: transitions
	  });
	
	  return transitions;
	}
	
	module.exports = { drawSchedule: drawSchedule, load: load };

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var Rx = __webpack_require__(5);
	
	var _require = __webpack_require__(7);
	
	var Queue = _require.Queue;
	var isEmpty = _require.isEmpty;
	
	var _require2 = __webpack_require__(8);
	
	var queueSubject = _require2.queueSubject;
	var scheduleSubject = _require2.scheduleSubject;
	
	var _require3 = __webpack_require__(9);
	
	var transitionState = _require3.transitionState;
	var dataModel = _require3.dataModel;
	
	var _require4 = __webpack_require__(11);
	
	var views = _require4.views;
	
	var _require5 = __webpack_require__(10);
	
	var LOAD = _require5.LOAD;
	var PRE_BIND = _require5.PRE_BIND;
	var FINISH = _require5.FINISH;
	
	
	var masterTime = 0;
	
	// filters out process that should be canceled if a user
	// has updated the data of the application
	var ignoreOld = function ignoreOld(x) {
	  return x.time === masterTime;
	};
	
	var backFromRenderStream = scheduleSubject.filter(ignoreOld);
	
	var stagedState = {
	  staged: {},
	  queue: new Queue(),
	  time: 0
	};
	
	function queueModel(acc, curr) {
	  if (curr.type === LOAD) {
	    var _ret = function () {
	      var Q = new Queue();
	
	      masterTime = curr.time;
	
	      curr.transitions.forEach(function (transition) {
	        Q.enqueue(transition);
	      });
	
	      return {
	        v: {
	          staged: Q.dequeue(),
	          queue: Q,
	          time: curr.time
	        }
	      };
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  } else if (curr.type === FINISH) {
	    var _Q = acc.queue;
	
	    if (_Q.length > 0) {
	      return {
	        staged: _Q.dequeue(),
	        queue: _Q,
	        time: acc.time
	      };
	    } else {
	      return stagedState;
	    }
	  }
	}
	
	// this will also have a step to call for another 
	// dequeued item when all transitions are done
	// for clarity startWith is used with a templete of
	// what the model is.  Skip prevents that empty model
	// from being streamed to the next stage.
	var queueStream = queueSubject.startWith(stagedState).scan(queueModel).skip(1).filter(function (obj) {
	  return !isEmpty(obj.staged);
	});
	
	// shape object if it is a plain object
	var singleStream = queueStream.filter(function (staged) {
	  return !Array.isArray(staged);
	}).map(function (preTransition) {
	  var pre = preTransition.staged;
	  var transitions = pre.is;
	  var keys = Object.keys(transitions);
	  var is = {};
	
	  keys.forEach(function (key) {
	    is[key] = [transitions[key]];
	  });
	
	  var post = Object.assign({}, pre, {
	    time: preTransition.time,
	    dataBinder: [pre.dataBinder],
	    is: is
	  });
	
	  return post;
	});
	
	var mergeSubject = Rx.Observable.merge(singleStream, backFromRenderStream);
	
	mergeSubject.startWith(transitionState).scan(dataModel).skip(1)
	// if transitions are still out, filter stops
	// state from returning
	.filter(function (state) {
	  return !state.flag;
	}).subscribe(function (transitionStage) {
	  views(transitionStage);
	});
	
	module.exports = { queueSubject: queueSubject };

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	* pick -> shorthand for document.querySelector(selector)
	*/
	var pick = function pick(selector) {
	  return document.querySelector(selector);
	};
	
	/**
	* indexed -> takes a list of indices and gets them from a 
	*   collection
	* @param{Array::Numbers} (indices) -> index list
	* @param{Array::Arrays/Objects} (collection) -> collection to get 
	*   values
	* @param{Function} (getProperty) -> callback to get value from
	*   collection
	* @return{Array/Array::Objects/Array::Array}
	*/
	function indexed(indices, collection, getProperty) {
	  var request = new Array(indices.length);
	
	  if (arguments.length === 2) {
	    indices.forEach(function (collectionIndex, i) {
	      request[i] = collection[collectionIndex];
	    });
	  } else {
	    indices.forEach(function (collectionIndex, i) {
	      request[i] = getProperty(collection[collectionIndex]);
	    });
	  }
	
	  return request;
	};
	
	/**
	* Queue -> very very basic queue
	*/
	
	var Queue = function () {
	  function Queue() {
	    _classCallCheck(this, Queue);
	
	    this.__queue__ = new Array();
	    this.length = this.__queue__.length;
	  }
	
	  _createClass(Queue, [{
	    key: "setLength",
	    value: function setLength() {
	      this.length = this.__queue__.length;
	    }
	  }, {
	    key: "dequeue",
	    value: function dequeue() {
	      var value = this.__queue__.shift();
	      this.setLength();
	      return value;
	    }
	  }, {
	    key: "enqueue",
	    value: function enqueue(x) {
	      this.__queue__.push(x);
	      this.setLength();
	    }
	  }]);
	
	  return Queue;
	}();
	
	// check if string is in the selected array
	
	
	function inArray(str, arr) {
	  for (var i = 0; i < arr.length; i++) {
	    var word = arr[i];
	    if (str.toLowerCase() === word.toLowerCase()) {
	      return true;
	    }
	  }
	}
	
	function isEmpty(obj) {
	  return Object.keys(obj).length === 0 || obj.length === 0;
	}
	
	module.exports = { indexed: indexed, Queue: Queue, inArray: inArray, isEmpty: isEmpty, pick: pick };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Rx = __webpack_require__(5);
	
	module.exports = {
		queueSubject: new Rx.ReplaySubject(1),
		scheduleSubject: new Rx.ReplaySubject(1)
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _require = __webpack_require__(7);
	
	var Queue = _require.Queue;
	
	var _require2 = __webpack_require__(10);
	
	var RENDER = _require2.RENDER;
	var PRE_BIND = _require2.PRE_BIND;
	var BIND = _require2.BIND;
	
	// state is held in this object
	// While javascript is dynamic, most implementations prefer
	// being explicit
	
	module.exports.transitionState = {
	  packed: [],
	  dataBinder: [],
	  parent: [],
	  keys: [],
	  is: {},
	  len: 0,
	  flag: false,
	  time: undefined,
	  callIndex: -1,
	  type: 'base',
	  stage: '',
	  out: undefined
	};
	
	// helper function to report how many transition
	// are out to be renders
	function checkOut(obj) {
	  return obj !== undefined ? obj.length : 0;
	}
	
	function packDataBind(state, update) {
	  var dataBinder = update.dataBinder;
	  var create = update.create;
	  var keys = update.keys;
	  var is = update.is;
	  var len = update.len;
	  var time = update.time;
	
	
	  var next = {
	    packed: [],
	    dataBinder: dataBinder,
	    parent: create,
	    keys: keys,
	    is: is,
	    len: len,
	    flag: false,
	    callIndex: -1,
	    time: time,
	    type: BIND,
	    stage: 'post-bind',
	    out: 0
	  };
	
	  return next;
	}
	
	function packTransition(state, boundDOM) {
	  var i = void 0,
	      transition = void 0;
	
	  // check if there are transition still out for process
	  if (boundDOM.hasOwnProperty('returnCount')) {
	    var countObjectsOut = state.out - boundDOM.returnCount;
	
	    if (countObjectsOut > 0) {
	
	      state = Object.assign({}, state, {
	        out: countObjectsOut,
	        flag: true
	      });
	
	      return state;
	    }
	  }
	
	  //
	  // when there are no outstanding transitions
	  // get current transitions
	  //
	  i = state.callIndex += 1;
	  transition = state.is[state.keys[i]];
	
	  if (state.callIndex === 0) {
	
	    return Object.assign({}, state, {
	      packed: [{
	        parent: boundDOM.parent,
	        transition: transition,
	        time: state.time
	      }],
	      parent: boundDOM.parent,
	      out: checkOut(transition),
	      stage: 'start',
	      flag: false,
	      type: RENDER
	    });
	  } else if (state.callIndex < state.len) {
	
	    return Object.assign({}, state, {
	      packed: [{
	        parent: state.parent,
	        transition: transition,
	        time: state.time
	      }],
	      stage: 'continue',
	      out: checkOut(transition),
	      flag: false,
	      type: RENDER
	    });
	  } else {
	    return Object.assign({}, state, {
	      packed: [],
	      stage: 'empty',
	      out: checkOut(transition),
	      flag: false,
	      type: RENDER
	    });
	  }
	}
	
	module.exports.dataModel = function (state, update) {
	  //stage where data gets passed down
	  var type = update !== undefined ? update.type : 'done';
	  // console.log('state',state,'\n','update',update)
	  switch (type) {
	    case PRE_BIND:
	      return packDataBind(state, update);
	      break;
	
	    case RENDER:
	      return packTransition(state, update);
	      break;
	
	    case 'done':
	      // nothing is happening right now. test later to make
	      // sure it stays the same.
	      break;
	
	    default:
	      break;
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	// global variables for the schedule module
	module.exports = {
		LOAD: 'load',
	
		PRE_BIND: 'pre-bind',
		BIND: 'bind',
	
		PRE_RENDER: 'pre-render',
		RENDER: 'render',
	
		FINISH: 'finish',
	
		CALL_NEXT: 'call-next'
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _require = __webpack_require__(8);
	
	var queueSubject = _require.queueSubject;
	var scheduleSubject = _require.scheduleSubject;
	
	var _require2 = __webpack_require__(10);
	
	var BIND = _require2.BIND;
	var RENDER = _require2.RENDER;
	var FINISH = _require2.FINISH;
	var PRE_RENDER = _require2.PRE_RENDER;
	var CALL_NEXT = _require2.CALL_NEXT;
	
	// views are in this case where the side effects are.  This is where
	// d3 either is binding data to the DOM or rendering updates
	
	// binds data to the dom if any and returns the parent object
	// to apply transitions on.
	
	function dataView(state) {
	  var binders = state.dataBinder;
	  var len = binders.length;
	  var parent = [];
	
	  for (var i = 0; i < len; i++) {
	    var bound = binders.shift();
	    parent.push(bound());
	  }
	
	  scheduleSubject.onNext({
	    type: RENDER,
	    stage: PRE_RENDER,
	    parent: parent,
	    time: state.time
	  });
	}
	
	/**
	* callNext -> passed to a d3 transision through 
	* d3.(select).call pushes a value to scheduleSubject
	* specific to d3
	* onNext
	*/
	function callNext(time) {
	  return function (transition) {
	    var n = 0;
	    var next = function next() {
	      scheduleSubject.onNext({
	        type: RENDER,
	        stage: CALL_NEXT,
	        returnCount: 1,
	        time: time
	      });
	    };
	
	    if (transition.namespace === undefined || transition.empty()) {
	      return next();
	    }
	
	    transition.each(function () {
	      return ++n;
	    }).each("end", function () {
	      if (! --n) {
	        next();
	      }
	    });
	  };
	}
	
	// render function renders a view or if pushes onNext to
	// queueSubject if there is none to render
	function renderView(state) {
	  if (state.callIndex < state.len && state.parent !== undefined) {
	    var stack = state.packed;
	    stack.forEach(function (stage) {
	      var parent = stage.parent;
	      var transitions = stage.transition;
	      var len = transitions.length;
	
	      // the transition contains the onNext to move
	      // the transition forward uses scheduleSubject like 
	      // dataView
	      for (var i = 0; i < len; i++) {
	        var callNextWithTime = callNext(stage.time);
	        var trans = transitions.shift();
	        parent[i].call(trans, callNextWithTime);
	      }
	    });
	  } else {
	    queueSubject.onNext({ type: FINISH, time: state.time });
	  }
	}
	
	// this step distinguishes it is a data binding step out to process
	// or a rendering step
	function views(state) {
	  var type = state !== undefined ? state.type : 'done';
	
	  if (type === BIND && state.dataBinder.length > 0) {
	    dataView(state);
	  } else if (type === RENDER) {
	    renderView(state);
	  } else {
	    return false;
	  }
	}
	
	module.exports = { views: views };

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.umd.js.map