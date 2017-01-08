import grizzy from 'grizzy';
import { 
  TEXT_STYLE,
  LEGEND_TEXT_ATTR,
  LEGEND_SPACING,
  LEGEND_RECT_ATTR,
  LEGEND_DELAY_TIME
} from './style'

import { drawSchedule } from '../../lib/index';

const delay = function(d, i) { return i * LEGEND_DELAY_TIME; };

function rect(selection, colorSelection) {
  return selection.append('rect')
    .attr(LEGEND_RECT_ATTR)
    .style('fill', colorSelection);
}

function text(selection) {
  return selection.append('text')
    .attr(LEGEND_TEXT_ATTR)
    .style(TEXT_STYLE)
    .text((d) => d.replace(/_/g,' ')
      .capitalizeFirstLetter());
}

function legend(parentObject, SIZE, data, colorSelection, newData) {
  return drawSchedule(".legend", parentObject, {
    data: [data, (d) => d],
    is: {
      pause: (selection, done) => {
        return selection.transition().duration(150)
          .call(done);
      },
      exit: (selection, done) => {   
        return selection.exit()
          .transition().delay(delay).duration(200)
            .style({opacity:1})
            .attr({
              'transform': (d, i) => { 
                return 'translate('
                  + (SIZE.width + 250)
                  + ',' 
                  + (i * LEGEND_SPACING) 
                  + ')';
              }
            })
          .remove()
          .call(done);
      },

      update: (selection, done) => {
        return selection 
            .transition().delay(delay).duration(200)
            .style({opacity:1})
            .attr({
              'transform': (d, i) => {
                return 'translate('
                  + SIZE.width
                  + ',' 
                  + (i * LEGEND_SPACING) 
                  + ')';
              }
            })
            .call(done);
      },

      enter: (selection, done) => {
        // this returns a `g` for every data point that has a 
        //`rect` and `text` element 
        return selection 
          .enter().append('g')
            .attr({
              'class': 'legend',
              'transform': (d, i) => { 
                return 'translate('
                  + (SIZE.width + 250)
                  + ',' 
                  + (i * LEGEND_SPACING) 
                  + ')';
              }
            })
            .nest(rect, colorSelection)
            .nest(text)
            .transition().delay(delay).duration(200)
            .attr({
              'transform': (d, i) => { 
                return 'translate('
                  + SIZE.width
                  + ',' 
                  + (i * LEGEND_SPACING) 
                  + ')';
              }
            })
            .call(done);
      }
    }
  });
}

function legendPre(parentObject) {
  return drawSchedule(".legend", parentObject, {
    data: false,
    is: {
      dim: (selection, done) => {
        return selection
          .selectAll(".legend")
          .transition().duration(150)
          .style({opacity:.5})
          .call(done);
      }

    }
  });
}

export { legend, legendPre };
