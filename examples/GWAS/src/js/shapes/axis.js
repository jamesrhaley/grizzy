import { drawSchedule } from '../../lib/index';

const TRANSITION_TIME = 100;
const PADDING_LEFT = 1
let start = true;

function axis(selection, SIZE, xAxis, yAxis) {

  return drawSchedule(".y.axis", selection, {
    data: false,
    is: {
      update: (selection, done) => {
        return selection.transition()
          .duration(TRANSITION_TIME)
          .select(".y.axis")
          .call(yAxis)
          .call(done);
      },
      // this required a hack of an else block
      enter: (selection, done) => {
        let axis = selection
        if (start) {
            start = false;

          axis.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr({
                "class": "label",
                "transform": "rotate(-90)",
                "y": -SIZE.margin.left + PADDING_LEFT,
                "x": -SIZE.height / 2,
                "dy": ".71em"
              })
              .style("text-anchor", "middle")
              .text("P-Value mlog");
        }
                    
        return axis
          .call(done);
      }
    }
  });
}


export { axis };
