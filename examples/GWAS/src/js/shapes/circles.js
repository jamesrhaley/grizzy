import Rx from 'rx';
import { drawSchedule } from '../../lib/index';

import { 
  BASE_OPACITY,
  EXIT_OPACITY,
  ENTER_OPACITY,
  SHIFT_POSITION,
  CIRCLE_DELAY_TIME,
  FADE_COLOR } from './style'


function makeCircles(parentObject, data, speed) {
  const delaySpeed = CIRCLE_DELAY_TIME * speed;
  const delay = function(d, i) { return i * delaySpeed; };
  
  return drawSchedule(".dot", parentObject, {
    data: [data, (d) => d.ID],
    is:{
      exit: (selection, done) => {
        return selection.exit()
          .transition().delay(delay)
            .style({
              'fill': FADE_COLOR,
              'opacity': EXIT_OPACITY
            })
            .attr({
              "cy": (d) => d.y + SHIFT_POSITION
            })  
          .remove()
          .call(done);
      },
      update : (selection, done) =>{
        return selection.transition().delay(delay)
          .attr({
            'r': (d) => d.RADIUS,
            'cx': (d) => d.x + SHIFT_POSITION,
            'cy': (d) => d.y
          })
          .style({
            'fill': (d) => d.color,
            'opacity': BASE_OPACITY
          })
          // .sort((a, b) => a.OR_or_BETA - b.OR_or_BETA)
          .call(done);
      },
      enter : (selection, done) => {
        return selection.enter().append("circle")
              .style({
                'fill': FADE_COLOR,
                'opacity': ENTER_OPACITY
              })
              .attr({
                'class': 'dot',
                'r': (d) =>  d.RADIUS,
                'cx': (d) => d.x + SHIFT_POSITION,
                'cy': (d) => d.y + SHIFT_POSITION
              })   
          .transition().delay(delay)
              .style({
                'fill': (d) => d.color,
                'opacity': BASE_OPACITY 
              })
              .attr({
                'cy': (d) => d.y
              })
          // .sort((a, b) => a.OR_or_BETA - b.OR_or_BETA)
          .call(done);
      },
      ordered : (selection, done) =>{
        return selection
          .sort((a, b) => b.OR_or_BETA - a.OR_or_BETA)
          .call(done);
      },
    }
  });
}

export { makeCircles };
