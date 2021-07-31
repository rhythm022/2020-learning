// 模板方法模式围绕一个核心的模板main方法
// 模式由高层类和底层类组成。底层类是为高层类服务的。底层类包裹了各种可变的实现。高层类包裹了模板main方法。
// js中如果某个函数使用了成套的无状态回调函数，可以升级成模板方法模式
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

// Coffee是DrinkBase的拓展包
// 继承、组合结果都是扩充高层类，而不是夯实底层类
// 可以认为new Coffee返回的是带有Coffee拓展包的DrinkBase
const coffee = new Coffee()
coffee.init()
