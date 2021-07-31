function order500({orderType, pay,stock},res,next) {
  if (orderType === 500 && pay) {
    console.log('500定金减100');

  } else {
    next();
  }
}

function order200({orderType, pay,stock},res,next) {
  if (orderType === 200 && pay) {
    console.log('200定金减50');

  } else {
    next();
  }
}

function noOrder({orderType, pay,stock},{sth}) {
  if (stock > 0) {
    console.log('普通购买，无优惠券',sth);

  }
}

function Node(func) {// Gluing同时拥有上下两个函数
  let _next;
  function then(next) {
    return _next = next;
  }

  function exe() {
    func.apply(this, [...arguments,()=>_next.exe(...arguments)])// 递归exe方法

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
node1.exe({orderType:200, pay:1000, stock:1},{sth:'sthA'})
