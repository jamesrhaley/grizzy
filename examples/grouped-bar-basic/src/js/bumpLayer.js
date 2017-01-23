// Inspired by Lee Byron's test data generator. I am not sure who that is
// but it came from the d3 example
let id = 0;

export default function bumpLayer(n, smooth, props) {
  let {color, rowCount} = props;
  function bump(arr) {
    var x = 1 / (.1 + Math.random()),
        y = 2 * Math.random() - .5,
        z = 10 / (.1 + Math.random());
    for (var i = 0; i < n; i++) {
      var w = (i / n - y) * z;
      arr[i] += x * Math.exp(-w * w);
    }
  }

  var arr = [];
  for (let i = 0; i < n; ++i) {
    arr[i] = smooth + smooth * Math.random();
  }

  for (let i = 0; i < 5; ++i) {
    bump(arr);
  }

  return arr.map((d, i) => ({
    x: i,
    y: Math.max(0, d),
    _id : (id++),
    row: rowCount,
    color: color(rowCount)
  }));
}