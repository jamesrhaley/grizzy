
const model = (data) => {
	// capture the keys of each line will be used to asign colors
	const keys = Object.keys(data[0])
		.filter((key) => key !== "date");
  
  // capture the data points of each key into object with 
  // arrays for all data points
  const cities = keys
    .map(name => {
      return {
        name: name,
        values: data.map((d) =>{
          return {
            date: d.date,
            temperature: +d[name]
          };
        })
      };
    });

  const cityLabels = cities.map(city => {
  	let last = city.values[city.values.length - 1]
  	return {
  		name: city.name,
  		x: last.date,
  		y: last.temperature
  	}
  });

  // get values for x domain
  const xDomain = d3.extent(data, (d) => d.date);
  
  // get min max of y domain
  const yDomain = [
    d3.min(cities, (c) => d3.min(c.values, (v) => v.temperature)),
    d3.max(cities, (c) => d3.max(c.values, (v) => v.temperature))
  ];

  return {keys, cities, cityLabels, xDomain, yDomain};
};

export default model;