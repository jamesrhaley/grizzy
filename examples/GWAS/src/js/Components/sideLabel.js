import { d3local, pick } from '../helpers/sharedResource';
import { Observable } from 'rx';

const mouseClick = pick('#chart');
const mousedown$ = Observable.fromEvent(
        mouseClick, 'mousedown',
        (evt) => evt.target.closest('.dot')
            || null
    )
    .startWith(null)
    .map(mouse => { 
        let node = mouse === null ? null : mouse.nodeName;
        let value = mouse === null ? null : d3local.select(mouse).datum();
        return {
            type: 'mouse',
            node : node,
            value : value
        }
    })

const largeLable = d3local.select("body")
    .append("div")
    .attr('class','largeLable')
    .style("position", "absolute")

function lableText(object) {
  return '<span><span class="header">SNP: </span><br>'
    + object.SNPS
    + "<br>"
    + '<span class="header">CURRENT SNP ID: </span><br>'
    + object.SNP_ID_CURRENT 
    + "<br><br>"
    + '<span class="header">STUDY: </span><br>'
    + object.STUDY
      .capitalizeFirstLetter()
    + "<br>"
    + `<a target="_blank" href="http://${object.LINK}">link</a><br>`
    + "<br>"
    + '<span class="header">DISEASE TRAIT: </span><br>'
    + object.DISEASE_TRAIT
    + "<br><br>"
    + '<span class="header">REGION: </span><br>'
    + object.REGION
    + "<br>"
    + '<span class="header">CHR ID: </span><br>'
    + object.CHR_ID
    + "<br>"
    + '<span class="header">CHR POS: </span><br>'
    + object.CHR_POS
    + "<br>"
    + '<span class="header">MAPPED GENE: </span><br>'
    + object.MAPPED_GENE
    + "<br>"
    + '<span class="header">MAPPED TRAIT: </span><br>'
    + object.MAPPED_TRAIT 
    + "<br>"
    + `<a target="_blank" href="${object.MAPPED_TRAIT_URI}">link</a><br>`
    + "<br>"
    + '<span class="header">P VALUE & MLOG: </span><br>'
    + `${object.P_VALUE}, ${object.PVALUE_MLOG.toFixed(2)}`
    + "<br>"
    + '<span class="header">ODDS RATIO or BETA Coef: </span><br>'
    + object.OR_or_BETA
    + "<br>"
    + '<span class="header">CONTEXT: </span><br>'
    + object.CONTEXT.replace(/_/g,' ')
        .capitalizeFirstLetter()
    + "</span>"
    + "<br>"
    + "<span class='fineprint'>"
    + 'click graph to close'
    + "</span>"

}

function emptyText() {
    return '';
}

function makeLable(mouse$, lable, stringFucs) {
    
    return () => mouse$.subscribe( evt => {
      let string = (d) => {
        if (d.node != null) {
            return stringFucs.lableText(d.value)
        } else {
            return stringFucs.emptyText();
        }
      };

      let getstring = string(evt);

      lable.style({
        'opacity': () => {
          if (getstring === ''){
              return 0;
          } else {
              return 1;
          }
        },
        "top":"131px",
        "left":"5px"
      })
      .html(getstring);

    });
}


export const callLabel = makeLable(mousedown$, largeLable, {
  emptyText,
  lableText
});
