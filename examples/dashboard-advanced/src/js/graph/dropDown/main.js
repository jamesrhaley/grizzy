export function dropDownMenu(data, stateById) {
    let select = d3.select('#pulldown')
      .append('select')
        .attr('id','selected');
    
    select.selectAll('option')
        .data(stateById.values())
      .enter().append('option')
        .attr('value', (d) => d.id)
        .text((d) => d.id);
    
    select.property('value', data.id);
}