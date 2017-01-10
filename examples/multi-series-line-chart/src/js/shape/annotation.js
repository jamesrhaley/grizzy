import {drawSchedule} from 'grizzy';

function annotation(parent, data, helpers) {
  let {x,y} = helpers;
  let translate = (dx,dy) => {
    return ["translate(", x(dx), ",", y(dy), ")"].join('')
  }

  return drawSchedule('.annotations', parent, {
    data: [data, (d) => d.name+'a'],
    is:{
      enter: (selection,done) => {
        return selection.enter().append('g').append("text")
          .attr({
            "transform": (d) => translate(d.x, d.y),
            "class": "annotations",
            "x": 3,
            "dy": ".35em"
          })
          .style({
            'font-size':'0px',
            'opacity':0
          })
          .text((d) => d.name)
          .transition()
            .ease('cubic-in-out')
            .duration(400)
            .style({
              'font-size':'11px',
              'opacity':1
            })
          .transition()
            .ease('cubic-in-out')
            .duration(200)
            .style('font-size','10px')
          .call(done);
      },
      exit: (selection,done) => selection
        .exit().remove().call(done)
    }
  })
}

export default annotation;