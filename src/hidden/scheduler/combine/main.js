

// figures out what the final order of objects in transitions are
function inner(currentObject, future, index, finalOder) {
	let currentObjetKeys = Object.keys(currentObject);
	let lastIndex = 0;
	let last = (index) => { return lastIndex = index; }

	currentObjetKeys.forEach( (value, currentIndex) => {
		let whileIndex = index;

		while (++whileIndex < future.length) {
			let futureObj = future[whileIndex];
			
			if ( !futureObj.hasOwnProperty(value) 
					&& !finalOder.hasOwnProperty(value)) {
				// console.log('value',value, 'lastIndex',lastIndex)
				Object.keys(futureObj).forEach( (key, keyIndex) => {
					if (keyIndex >= lastIndex) {
						futureObj[key] += 1;
					}
				});

				// last(currentIndex)
			}

			else if ( futureObj.hasOwnProperty(value)) {
				// 
				if ( currentObject[value] < futureObj[value]) {
					currentObject[value] = futureObj[value];

					last(currentIndex)
				}

				else {
					last(currentIndex)	
				}
			}
		}
		
		finalOder[value] = currentObject[value];
	})
}

function objectToArray(obj) {
	let keys = Object.keys(obj);
	let ordered = new Array(keys.length);

	for (let i = 0; i < keys.length; i++) {
		ordered[i] = keys[obj[keys[i]]]
	}
	return ordered;
}

function transitionOrder(...args) {
	let finalOder = {};

	args.forEach((arg, index) => {
		inner(arg, args, index, finalOder)		
	});

	return objectToArray(finalOder);
}

//
// merge functions
//
function mergeWithMaster(master, supplier){
	let keys = Object.keys(supplier);

	keys.forEach(key => {
		master[key].push(supplier[key])
	});

	return master
}

function compile(keys, suppliers) {
	let master = {};

	// create a master object
	keys.forEach(key => {
		master[key] = []
	});

	suppliers.forEach(supplier => {
		mergeWithMaster(master, supplier);
	});

	return master;
}

export {transitionOrder, compile};
