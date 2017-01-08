import { 
  TEXT_STYLE,
  ANNOTATION_SPACING,
  ANNOTATION_TEXT_ATTR
} from './style'
import { drawSchedule } from '../../lib/index';



const MARGIN_TOP = '.8em'
function tspan(selection) {
  return selection.append('tspan')
    .attr(ANNOTATION_TEXT_ATTR)
    .style(TEXT_STYLE)
    .text((d) => d.line);
}

function annotation(parentObject, SIZE, annotateText) {
  return drawSchedule('.annotation', parentObject, {
    data: [annotateText,(d) => d.line],
    is: {
      enter: (selection, done) => {
        // this returns a `text` for every index in a array of 
        // text, and fills a `tspan` with that text
        return selection 
          .enter().append('text')
            .attr({
              'class': 'annotation',
              'transform': (d, i) => { 
                return 'translate('
                  + SIZE.width
                  + ',' 
                  + (i * ANNOTATION_SPACING + SIZE.height) 
                  + ')';
              }
            })
            .style({'opacity':0})
            .nest(tspan)
            .transition().duration(350)
            .style({'opacity':1})
            .call(done);
      }
    }
  })
}

export { annotation };
