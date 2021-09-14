

// 虚拟代理
function cache(func) {
  const ca = new Map();

  return function() {
    if (ca.has(JSON.stringify(arguments))) {
      return ca.get(JSON.stringify(arguments))
    }


    const res = func.apply(this, arguments);
    ca.set(JSON.stringify(arguments), res);


    return res;
  };
}
