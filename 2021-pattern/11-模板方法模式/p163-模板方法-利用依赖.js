class DrinkBase{
  constructor(receiver) {
    this.receiver = receiver
  }
  init(){
    this.receiver.brew()
    this.receiver.pourInCup()
    this.receiver.addCondiments()
  }
}

class Coffee {
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

// 继承、组合都是扩充父类
// 继承、组合之间，子类没什么差别，倒是父类有差异：继承的父类 === 依赖注入的父类。
const coffee = new DrinkBase(new Coffee()) // 类似super，但是父调子
coffee.init()
