function order500(context) {
  const {orderType, pay,next} = context
  if (orderType === 500 && pay) {
    console.log('500定金减100');

  } else {
    next()

  }
}

function order200(context) {
  const {orderType, pay,next} = context
  if (orderType === 200 && pay) {
    console.log('200定金减50');

  } else {
    next()// 预留接口，准备开闭

  }
}

function noOrder(context) {
  const { stock} = context
  if (stock > 0) {
    console.log('普通购买，无优惠券');

  }
}

function Link(func) {
  let child;

  return {
    add(c) {
      return child = Link(c);
    },
    execute(arg) {
      func.call(null,{...arg,next:()=>child.execute(arg)} )// 递归配链表

    }
  }
}

// 可以说，Link是静态对象，order500是动态对象
// 可以说，Link是父对象，order500是子对象
const root1 = Link(order500)



root1
.add(order200)// 让order500指向order200
.add(noOrder)// 让order200指向noOrder

root1.execute({orderType:2000, pay:1000, stock:1})
