// 函数责任链调用 === 单一职责 + 链表式调用
// 解决单体函数体积过大问题



// 不要写成if else if的多链表结构
// 要使用if else的单链表结构
function order500(orderType,pay,stock){// 父函数
  if(orderType === 500 && pay){
    console.log('500定金减100');
  }else{
    order200(orderType,pay,stock)// 子函数
  }

}

function order200(orderType,pay,stock){// 父函数
  if(orderType === 200 && pay){
    console.log('200定金减50');
  }else{
    noOrder(orderType,pay,stock)// 子函数
  }

}

function noOrder(orderType,pay,stock){// 父函数
  if(stock >0){
    console.log('普通购买，无优惠券');
  }

}
