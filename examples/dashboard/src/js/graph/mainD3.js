import {dimensions, blankSVG, draw} from 'grizzy';
import { barGraph } from './bar/main';
import { pieGraph } from './pie/main';
import { dropDownMenu } from './dropDown/main';

let init = false;

function dashboard(baseData, groupsForPieData, allVals, stateById) {
    if (!init) {
      dropDownMenu(baseData, stateById);

      init = true;
    }

    barGraph(baseData, stateById);

    pieGraph(groupsForPieData, allVals);
}

export { dashboard };