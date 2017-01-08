'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schQ = undefined;

var _schq = require('schq');

var _preprocess = require('./preprocess');

var _preprocess2 = _interopRequireDefault(_preprocess);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var _globalKeys = require('./globalKeys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// function checkout(obj) {

//   return obj.value.length;
// }
// const doLast = [{type:'finish', value: ()=>{console.log('done')}}];

var schQ = new _schq.SchQ({
  preprocess: _preprocess2.default,
  lostData: 2,
  checkout: function checkout(obj) {
    return obj.value.length;
  },
  doLast: [{ type: 'finish', value: function value() {
      console.log('done');
    } }]
});

// const renderWithEmit = render(emitter);


schQ.run()
//this is a hack to make sure the emitter subscribe is inicialized
.subscribe(_render2.default);

exports.schQ = schQ;