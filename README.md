# Welecome to Grizzy

Grizzy is a better way to organize your [D3](https://d3js.org) code. It is not a framework. It does not reinvent D3. It does not change your application or try to take over parts of your app that handles your model, ajax, or anything you might find to be obtrusive. What grizzy is about is reducing what part of D3 to use, creating "dumb" D3 components, and following a reactive pushed based design. While setting this constraints, grizzy with allow you to create elegant, complex, and meaningful transitions without the pain of callback hell... and without a lot of state management.  

Following the lead of React and D3 gizzy encourages a user to write push base code. Please read the doc for more understanding, but if you are familiar with D3 you will be ready to use grizzy. Under the hood grizzy uses Observables from [RxJS](https://github.com/Reactive-Extensions/RxJS), so if you like RxJS to deal with your asynchronous code you are going to like grizzy even more.

All D3 functions follow the convention of the following

```
function(selection) {
    return selection.enter()
        .attr(...)
}
```

Grizzy has two main functions amoung others. They are `draw` and `drawSchedule`. As you read the docs you will find them to be written almost exactly the same beside one big difference in functionality.  `draw` creates single instances of D3 DOM elements while `drawSchedule` with `load` creates animation sequences in order from left to right.

`draw` functions run independently
```
function render(data) {
    bar(data);
    axis(data);
}
```
`drawSchedule` must be arguments of load and include a key for an event listener
```
function render(data) {
    load(
        'barGraph',
        bar(data),
        axis(data)
    );
}
```



## Install it
```
npm install grizzy
```

## Development

```
git clone https://github.com/jamesrhaley/grizzy.git
cd grizzy
npm install
npm run validate
```

## Run Examples
```
cd grizzy/examples/`<example>`
npm install
gulp
```
## Documentation
[doc.esdoc.org/github.com/jamesrhaley/grizzy](https://doc.esdoc.org/github.com/jamesrhaley/grizzy)