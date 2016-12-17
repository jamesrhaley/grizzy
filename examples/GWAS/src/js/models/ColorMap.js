/**
 * ColorMap -> a wrapper around d3 colors or any other color
 * map to keep state of what values map to what colors
 * {@param:Function} (callColor) -> helper function to set
 * colors
 */
export default class ColorMap {
	constructor(callColor) {
		this.callColor = callColor;
		this.open = true;
    this.toMap = new Map;
  }

  addKey(key) {
  	if (!this.toMap.has(key)) {
  		let color = this.callColor(key)
  		this.toMap.set(key, color)
  	}
  }

  getColor(key) {
  	return this.toMap.get(key)
  }

  getMap() {
  	let all = [];
  	for (var [key, value] of this.toMap) {
  		all.push({domain:key, color:value})
  	}
  	return all;
  }

  closeStore() {
  	this.open = false;
  }

  isOpen(){
  	return this.open;
  }
}