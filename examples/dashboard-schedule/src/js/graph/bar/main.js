import {dimensions, blankSVG} from 'grizzy';
import {bar} from './bar';
import { setOpacity } from '../helpers';

const DIMENSIONS = {
    width : 80,
    height : 460,
    margin: {top: 20, right: 20, bottom: 30, left: 40}
};

const SIZE = dimensions(DIMENSIONS);

const barSvg = blankSVG(d3, SIZE);

let init = false;

let setBarOpacity = setOpacity(barSvg, '.bar');

function barGraph(data, stateById) {

  let y = d3.scale.linear()
      .domain([0, d3.max(stateById.values(), (d) => d.total)])
      .rangeRound([SIZE.height, 0])
      .nice();

  let yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .tickFormat(d3.format('.2s'));

    if (!init) {
      barSvg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

      init = true;
    }

    return bar(barSvg, [data], {SIZE, y});
}

export {barGraph, setBarOpacity};