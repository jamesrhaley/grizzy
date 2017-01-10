import {draw} from 'grizzy';

let start = true;

function xAx(parent, helpers){
  let {xAxis,SIZE} = helpers;

  return draw('x axis', parent, {
    data: false,
    is:{
      enter: (selection)=> {
        let axis = selection;

        if (start) {
            start = false;

        axis.append('g')
          .attr({
            'class': 'x axis',
            'transform': 'translate(0,' + SIZE.height + ')'
          })
          .call(xAxis);
        }

        return axis;
      }
    }
  });
}

export {xAx};