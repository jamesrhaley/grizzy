import { drawSchedule } from 'grizzy';

function pause(time){
  var blankSelection = d3.select('body')
  return drawSchedule('body', blankSelection, {
    data: false,
    is:{
      dim: (selection, done) => {
        return selection.transition().duration(time)
          .call(done);
      }
    }
  });
}

function setOpacity(parent, selection) {
  return (opacity, time) =>
    drawSchedule(selection, parent, {
      data: false,
      is:{
        dim: (selection, done) => {
          return selection.transition().duration(time)
            .style({
              'opacity': opacity
            })
            .call(done);
        }
      }
    })
}

export {setOpacity, pause};