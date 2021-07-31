function order500({orderType, pay, stock}) {
  if (orderType === 500 && pay) {
    console.log('500定金减100');

  } else {
    return 'next';
  }
}

function order200({orderType, pay, stock}) {
  if (orderType === 200 && pay) {
    console.log('200定金减50');

  } else {
    return 'next';// 具体的next由then指定，达到开闭的效果☆☆☆
  }
}

function noOrder({orderType, pay, stock}) {
  if (stock > 0) {
    console.log('普通购买，无优惠券');

  }
}

function Node(func) {// 粘合了本节点和下个节点进行执行
  let _next;
  function then(next) {
    return _next = next;
  }

  function exe() {
    let ret = func.apply(this, arguments)
    return ret === 'next' ? _next.exe(...arguments) : ret// 递归
  }

  return {
    then,
    exe
  }
}


const node1 = Node(order500)
const node2 = Node(order200)
const node3 = Node(noOrder)

// 动态配置孩子节点，达到开闭效果☆☆☆
node1.then(node2).then(node3)

// 通过我的exe接口做执行☆☆☆
node1.exe({orderType:'200', pay:1000, stock:1})
