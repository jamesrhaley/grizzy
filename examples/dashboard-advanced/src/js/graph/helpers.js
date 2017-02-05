import { drawSchedule } from 'grizzy';

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

export {setOpacity};