import { d3local, pick } from '../helpers/sharedResource';
import { Observable } from 'rx';

//tooltip---------------------------------------------------------

const UNITS = "People";
const formatNumber = d3local.format(",.0f"); // zero decimal places
const formatToString = (d) => formatNumber(d) + " " + UNITS;

const tooltip = d3local.select("body")
    .append("div")
    .attr('class','theTip')
    .style("position", "absolute")
    .style("z-index", "10")

const innerh = window.innerHeight - 225;

const mouseOver = pick('#chart');

const mouseOver$ = Observable.fromEvent(mouseOver, 'mouseover')
    .map(evt=> {
        let selected = d3local.select(evt.target).datum();
        if (selected !== undefined){
            let cy = evt.clientY
            if (cy > innerh){
                cy = innerh;
            }
            return {
                target: selected,
                pageX:evt.pageX,
                pageY:cy
            };
        } else {
          return {
                target: '',
                pageX:evt.pageX,
                pageY:evt.pageY
            };
        }
    })
    .debounce(100);


function text(object) {
    return '<span class="header">MAPPED TRAIT:</span>'
      + "<br>" 
      + object.MAPPED_TRAIT
      + "<br>"
      + "<span class='snps'>SNP: "
      + object.SNPS
      + "</span>"
      + "<br>" 
      + "<span class='study'>STUDY:<br>"
      + object.STUDY
        .capitalizeFirstLetter()
      + "</span>"
      + "<br>" 
      + "<span class='fineprint'>"
      + 'click for more info'
      + "</span>"
}

function emptyText(object) {
    return '';
}

function makeTip(mouse$, tip, stringFucs) {

    return () => mouse$.subscribe( evt => {
      let string = (d) => {
        if (d.hasOwnProperty('CONTEXT')) {
            return stringFucs.text(d)
        } else {
            return stringFucs.emptyText(d);
        }
      };

      let getstring = string(evt.target);

      tip.style({
        'opacity': () => {
          if (getstring === ''){
              return 0;
          } else {
              return 1;
          }
        },
        "top":(evt.pageY+20)+"px",
        "left":(evt.pageX+25)+"px"
      })
      .html(getstring);

    });
}
export const callTip = makeTip(mouseOver$, tooltip, {
    text: text, 
    emptyText: emptyText
});