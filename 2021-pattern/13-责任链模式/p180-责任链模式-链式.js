// 责任链调用，是符合一叉链表结构的函数调用
// 解决一个函数中同级及嵌套的多个分支的耦合问题



// 不要写成else if的结构
// 只使用一叉链表结构
function order500(orderType,pay,stock){// 父函数
  if(orderType === 500 && pay){
    console.log('500定金减100');// 本节点
  }else{
    order200(orderType,pay,stock)// 孩子节点
  }

}

function order200(orderType,pay,stock){// 父函数、子函数
  if(orderType === 200 && pay){// 本节点
    console.log('200定金减50');
  }else{
    noOrder(orderType,pay,stock)// 孩子节点
  }

}

function noOrder(orderType,pay,stock){// 子函数
  if(stock >0){
    console.log('普通购买，无优惠券');
  }

}
