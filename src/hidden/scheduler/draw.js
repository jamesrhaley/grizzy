function draw(what, parent, settings){
  let data = settings.data
  , create = data === false ? parent : parent.selectAll(what)
  , keys = Object.keys(settings.is)
  , len = keys.length
  , applyArgs;

  if (!(data instanceof Array && data[1] instanceof Function)){
    applyArgs = [data];
  } else {
    applyArgs = data;
  }

  if (data) {
    create = create.data.apply(create, applyArgs);
  }

  for (var i = 0; i < len; i++){
    create.call(settings.is[ keys[i] ]);  
  }
  return create;
}

function drawLoader(what, parent, settings) {
  let data = settings.data
  , create = data === false ? parent : parent.selectAll(what)
  , keys = Object.keys(settings.is)
  , len = keys.length
  , is = settings.is
  , applyArgs
  , dataBinder;

  if (!(data instanceof Array && data[1] instanceof Function)){
    applyArgs = [data];
  } else {
    applyArgs = data;
  }

  if (data) {
    dataBinder = () => {
      return create.data.apply(create, applyArgs);
    }
  } else {
    dataBinder = () => {
      return create;
    }
  }
  return {
    type: 'start',
    parent: create,
    dataBinder,
    keys,
    is,
    len
  }
}

export { draw, drawLoader }