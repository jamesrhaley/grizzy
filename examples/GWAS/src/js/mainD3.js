import { d3local} from './helpers/sharedResource';
import { dimensions, blankSVG, load } from '../lib/index';
import { model } from './models/model';
import { makeCircles } from './shapes/circles';
import { legend, legendPre } from './shapes/legend';
import { axis } from './shapes/axis';
import { annotation } from './shapes/annotation';
import { 
	BASE_DIMENSIONS,
	COLOR
} from './shapes/style';


//https://www.ebi.ac.uk/gwas/docs/downloads

// const dimensions = gz.dimensions;
// const blankSVG = gz.blankSVG;

const SIZE = dimensions(BASE_DIMENSIONS);

const svg = blankSVG(d3local, SIZE, '#chart');

const radius = d3local.scale.linear().domain([0,10]);

const x = d3local.scale.ordinal()
    .rangeRoundBands([0, SIZE.width], .1);

const y = d3local.scale.linear()
    .range([SIZE.height, 0]);

const xAxis = d3local.svg.axis()
    .scale(x)
    .orient("bottom");

const yAxis = d3local.svg.axis()
    .scale(y)
    .orient("left");

const annotateText = [
  {line:'*Circle radius represents:'},
  {line:'Odds ratio or Beta Coef'},
  {line:'**Click circles for more info'}
];

// create the domain for x
function domainMap(data, variable){
  let map = {}
  data.forEach(d => {
    let key = d[variable];
    if (!map.hasOwnProperty(key)) {
      map[key] = 0
    }

    map[key] += 1
  })

  let keys = Object.keys(map);
  let keyValuePairs = new Array(keys.length);

  keys.forEach((key,i) => {
    keyValuePairs[i] = [map[key], key]
  })

  keyValuePairs.sort((a,b) => b[0]-a[0]);

  let domain = new Array(keyValuePairs.length)

  keyValuePairs.forEach((item,i) => {
    domain[i] = item[1]
  })
  return domain;
}

function scatter(data, speed) {
  let xDomain = domainMap(data, 'CONTEXT');
  let yDomain = d3local.extent(data, (d) => d.PVALUE_MLOG);

  x.domain(xDomain);
  y.domain(yDomain).nice();

  let state = model(data, {x, y, COLOR, xDomain, yDomain});

  state.circles
    .sort((a,b)=> a.x - b.x);

  load(
    'scatter',
    legendPre(svg),
    axis(svg, SIZE, xAxis, yAxis),
    makeCircles(svg, state.circles, speed),
    legend(svg, SIZE, xDomain, COLOR, state.legend),
    annotation(svg, SIZE, annotateText)
  );
}

export { scatter };
