// © 2016 James Haley for licencing contact at james.r.haley@gmail.com
import { Rx } from 'rx';
import React from 'react';
import ReactDOM from 'react-dom';

import { callTip } from './Components/theTip';
import { callLabel } from './Components/sideLabel'
import InfoDialog from './Components/Dialog'
import AutoTag from './Components/GWASTag/AutoTag';
import { 
  SpeedSlider, SliderSpeedStream 
} from './Components/SpeedSlider/index';
import { scatter } from './mainD3';

import {filterStream} from './mainStream';

// add a function to String proto type.. not really a good idea
// because it leaks to the global space, but it works for now
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
//sideffects---------------------------------------------------------

ReactDOM.render(
	<div>
		<InfoDialog />
  	<h1 className="title">GWAS Catalog Search Visualization</h1>
  	<div className='discript'>
  		<p>Search among the disease or mapped traits of the GWAS 
        catalogs. When charted you can hover and click on the 
        results for more information. Click more info for full 
        explanation.
  		</p>
  	</div>
		<AutoTag />
	</div>, document.getElementById('app'));

//initialize the hidden lable and tool tip
callTip();
callLabel();

const speed$ = SliderSpeedStream.map(evt =>evt.value)
  .startWith(1) ;

// combine the filtered data stream and the animation speed stream
// for rendering of the visual. 
const allEventStream = Rx.Observable.combineLatest(
  filterStream, speed$
);

allEventStream.subscribe(evt=> {
  let data = evt[0];
  let speed = evt[1]

  return scatter(data, speed)
});

ReactDOM.render(
  <div>
    <SpeedSlider />   
  </div>, document.getElementById('postChart'));





