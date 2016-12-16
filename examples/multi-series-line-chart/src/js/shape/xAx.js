import {draw} from 'grizzy';

const MAIN_ATTR = (height) => {
  return {
    'class': 'x axis',
    'transform': 'translate(0,' + height + ')'
  }
};

let start = true;

function axis(parent, helpers){
  let xAxis = helpers.xAxis;
  let height = helpers.SIZE.height;

  return draw('x axis', parent, {
    data: false,
    is:{
      enter: (selection)=> {
        let axis = selection
        if (start) {
            start = false;

        axis.append('g')
          .attr(MAIN_ATTR(height))
          .call(xAxis)
        }
        
        return axis;
      }
    }
  })
}

let xAx = axis

export {xAx};