# Welecome to Grizzy

Grizzy is a better way to organize your [D3](https://d3js.org) code and create meaning tranitions without the pain of callback hell.  Following the lead of React and D3 gizzy encourages a user to write push base code.  Please read the doc for more understanding but if you are familar with d3 you will be ready to use grizzy.  Under the hood grizzy uses Observables from [RxJS](https://github.com/Reactive-Extensions/RxJS), so if you like RxJS to deal with you asynchronous code you are going to like grizzy even more.

All d3 functions follow the convention of the following

```
function(selection) {
    return selection.enter()
        .attr(...)
}
```

Gizzy has two main functions amoung others. They are `draw` and `drawSchedule`. As you read the docs you will find them to be writen almost exactly the same beside one huge diference.  `draw` creates single instances of d3 DOM elements while `drawSchedule` with `load` creates animation sequences in order from left to right.


## Install it
```
npm install grizzy
```

## Development

```
git clone https://github.com/jamesrhaley/grizzy.git
cd grizzy
npm install
```

## Run Examples
```
cd grizzy/examples/`<example>`
npm install
gulp
```
## Documentation
[doc.esdoc.org/github.com/jamesrhaley/grizzy](https://doc.esdoc.org/github.com/jamesrhaley/grizzy)