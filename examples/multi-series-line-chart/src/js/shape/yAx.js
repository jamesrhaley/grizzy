import {draw} from 'grizzy';

const MAIN_ATTR = {
  'class': 'y axis'
};

const TEXT_ATTR = {
  'transform': 'rotate(-90)',
  'y': 6,
  'dy': '.71em'
};

const TEXT_STYLE = {'text-anchor': 'end'};

const TEXT = 'Temperature (ºF)';

let start = true;

function axis(parent, helpers){
	let yAxis = helpers.yAxis;
  return draw('x axis', parent, {
    data: false,
    is:{
      enter: (selection)=> {
        let axis = selection
        if (start) {
            start = false;

        axis.append('g')
          .attr(MAIN_ATTR)
          .call(yAxis)
          .append('text')
            .attr(TEXT_ATTR)
            .style(TEXT_STYLE)
            .text(TEXT)
        }
        
        return axis;
      }
    }
  })
}

var yAx = axis;

export {yAx};
