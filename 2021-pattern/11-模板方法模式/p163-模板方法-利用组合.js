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

// 继承、组合结果都是扩充高层类
// 但组合直白的多
const coffee = new DrinkBase(new Coffee()) // 类似super，但是父调子
coffee.init()
