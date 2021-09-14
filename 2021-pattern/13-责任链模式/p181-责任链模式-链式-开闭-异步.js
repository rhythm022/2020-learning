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

function Wrapper(func) {// Gluing同时拥有上下两个函数
  let _next;
  function after(next) {
    return _next = next;
  }

  function exe() {
    func.apply(this, [...arguments,()=>_next.exe(...arguments)])// 递归exe方法

  }




  return {
    after,
    exe
  }
}


const func1 = Wrapper(order500)// 为order500函数提供后继函数的可能
const func2 = Wrapper(order200)
const func3 = Wrapper(noOrder)

// 动态配置后继函数，达到开闭效果
func1.after(func2).after(func3)

// 通过我的exe接口做执行☆☆☆
func1.exe({orderType:200, pay:1000, stock:1},{sth:'sthA'})
