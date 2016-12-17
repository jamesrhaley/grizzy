import ColorMap from './ColorMap';

class Id {
	constructor() {
		this.__count__ = 0
		this.__ids__ = new Map;
	}

	getId(key) {
		if (!this.__ids__.has(key)) {
			let localId = ++this.__count__
			this.__ids__.set(key,localId)
			return localId;
		} else {
			return this.__ids__.get(key);
		}
	}
}

function legendModel(domain, ids, colors){
	let domPosition = new Array(domain.length)

	domain.forEach((name,i)=> {
		domPosition[i] = {
			name: name,
			position: i * 20,
			id: ids.getId(name),
			color: colors.getColor(name)
		}
	});
	
	return domPosition;
}

var setColors;
var legendIds;

function model(data, helpers) {
	let len = data.length
		, circles = new Array(len)
		, i;

	if (setColors === undefined) {
		setColors = new ColorMap(helpers.COLOR);
	}

	if (legendIds === undefined) {
		legendIds = new Id();
	}

	for (i = 0; i < len; i++) {

		if (setColors.isOpen) {
			setColors.addKey(data[i].CONTEXT)
		}

		let dot = {
			x: helpers.x(data[i].CONTEXT),
			y: helpers.y(data[i].PVALUE_MLOG),
			color: setColors.getColor(data[i].CONTEXT),
		};

		let all = Object.assign({}, data[i], dot)
		circles[i] = all;
	}

	//setColors.closeStore()

	let legend = legendModel(
		helpers.xDomain, legendIds, setColors
	);
	
	return {
		circles,
		legend,
		colorMap : setColors.getMap()
	};
}

export { model }
