import React from 'react';
import { Rx } from 'rx';

const Slider = require('rc-slider');

const style = {width: 400, margin: 50};
const marks = {
  '-32': <strong>0x</strong>,
  '-16': '.50x',
  '-8': '.75x',
  0: '1',
  8: '8x',
  16: '16x',
  32: {
    label: <strong>32x</strong>,
  },
};


export const SliderSpeedStream = new Rx.Subject()

const negativeMap = {4:.87, 8:.75, 12:.62, 16:.5, 20:.32, 24:.25, 28:.12, 32:0}

// gets a value from the negativeMap for faster transitions
function getNegativeValue(val) {
  let key = val*-1;
  return negativeMap[key];
}

function pushState(value) {
  value = value === 0 ? 1 : value < 0 ? getNegativeValue(value) : value;
  let state = {type: 'speed', value}
  SliderSpeedStream.onNext(state);
}

const SpeedSlider = React.createClass({
  render: function(){
  return(
      <div style={style}>
        <p>Annimation speed</p>
        <Slider 
          min={-32} 
          max={32} 
          marks={marks} 
          step={4} 
          included={false} 
          defaultValue={0} 
          tipFormatter={null}
          onChange={pushState} />
      </div>
  )
}});

export {SpeedSlider};