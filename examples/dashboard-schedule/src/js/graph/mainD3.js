import { load } from 'grizzy';
import { barGraph, setBarOpacity } from './bar/main';
import { pieGraph, setPieOpacity } from './pie/main';
import { dropDownMenu } from './dropDown/main';
import { pause } from './helpers';

let init = false;

function dashboard(baseData, groupsForPieData, allVals, stateById) {
  if (!init) {
    dropDownMenu(baseData, stateById);

    init = true;
  }
  load(
    'dashboard',
    [
      setPieOpacity(.9, 250),
      setBarOpacity(.9,250)
    ],
    pause(80),
    setBarOpacity(1,100),
    barGraph(baseData, stateById),
    pause(80),
    setPieOpacity(1, 250),
    pieGraph(groupsForPieData, allVals)
  );
}

export { dashboard };