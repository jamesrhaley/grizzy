import {dimensions, blankSVG} from 'grizzy';
import {prePie} from './pie';

let width = 880,
    height = 460,
    radius = Math.min(width, height) / 2;

const BASE_DIMENSIONS = {
    width,
    height
};

const SIZE = dimensions(BASE_DIMENSIONS);

const svg = blankSVG(d3, SIZE)
  .attr("transform", "translate("+ width / 2 +","+ height / 2 +")");

let color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b",
            "#a05d56", "#d0743c", "#ff8c00"]);

let arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

let calculatPie = d3.layout.pie().sort(null)
  .value((d) => d.value);

function pieGraph(data, colorDomain) {
    prePie(svg, data, {color, arc, pie:calculatPie, colorDomain});
}

export {pieGraph};