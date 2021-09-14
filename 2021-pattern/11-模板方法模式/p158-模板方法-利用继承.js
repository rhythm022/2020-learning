// 模板方法模式围绕一个主函数，主函数向外提供服务
// 在子类中的子函数，为主函数提供实现。
// 和js中某个函数调用回调参数，差不多
class DrinkBase{
  init(){//init就是这个核心的模板main方法☆☆☆☆
    this.boilWater()
    this.brew()
    this.pourInCup()
    this.addCondiments()// 该类通知另一个类执行addCondiments方法：是由另一个类执行addCondiments方法
  }
  boilWater(){
    console.log('烧水');// 固有实现
  }
  brew(){
    throw '冲泡'

  }
  pourInCup(){
    throw '把水倒进杯子'

  }
  addCondiments(){
    throw '加调味'

  }
}
class Coffee extends DrinkBase{
  brew(){
    console.log('冲泡Coffee');
  }
  pourInCup(){
    console.log('把Coffee倒进杯子');

  }
  addCondiments(){
    console.log('加牛奶');

  }
}
class Tea extends DrinkBase{
  brew(){
    console.log('浸泡Tea');
  }
  pourInCup(){
    console.log('把Tea倒进杯子');

  }
  addCondiments(){
    console.log('加柠檬');

  }
}


// 可以认为new Coffee返回的是带有Coffee拓展包的DrinkBase
const coffee = new Coffee()
coffee.init()
