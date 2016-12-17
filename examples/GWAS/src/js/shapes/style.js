
/* --------------base layout-------------------- */
export const BASE_DIMENSIONS = {
    width : 800,
    height : 500,
    margin:{top: 20, right: 200, bottom: 80, left: 67}
}

export const COLOR = d3.scale.category20();

/* --------------circle styles---------------------- */

export const BASE_OPACITY = 0.5;
export const EXIT_OPACITY = 0.2;
export const ENTER_OPACITY = 0;
export const SHIFT_POSITION = 10;
export const CIRCLE_DELAY_TIME = .8;//.35.8;
export const FADE_COLOR = '#000099';


/* --------------base text style-------------------- */
export const TEXT_STYLE = {
  'text-anchor': 'start',
  'font-size': '.75em'
}

/* --------------text spacing----------------------- */
export const LEGEND_SPACING = 20;
export const LEGEND_DELAY_TIME = 75;

export const ANNOTATION_SPACING = 15;


/* --------------legond styles & attributes--------- */
const RECT_SIZE = 10;

// rect
export const LEGEND_RECT_ATTR = {
  'width': RECT_SIZE,
  'height': RECT_SIZE
}

// text
const TEXT_MARGIN_LEFT = RECT_SIZE + 2;

export const LEGEND_TEXT_ATTR = {
   'x': TEXT_MARGIN_LEFT,
  'dy': '.75em'
}


/* --------------annotation attributes-------------- */

export const ANNOTATION_TEXT_ATTR = {
  'dy': '.8em'
}

