import {draw} from 'grizzy';

let start = true;

function yAx(parent, helpers){
  let {yAxis} = helpers;

  return draw('x axis', parent, {
    data: false,
    is: {
      enter: (selection)=> {
        let axis = selection;

        if (start) {
            start = false;

        axis.append('g')
          .attr({
            'class': 'y axis'
          })
          .call(yAxis)
          .append('text')
            .attr({
              'transform': 'rotate(-90)',
              'y': 6,
              'dy': '.71em'
            })
            .style('text-anchor', 'end')
            .text('Frequency');
        }
        
        return axis;
      }
    }
  });
}

export {yAx};