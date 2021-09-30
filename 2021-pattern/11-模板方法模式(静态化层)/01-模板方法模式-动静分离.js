// 静态业务逻辑的静态化层
class DrinkBase{
  constructor(child) {
    this.child = child
  }
  init(){
    this.child.pourInCup()
    this.child.addCondiments()
  }
}

// 将动态的东西分离到另外的地方，如Coffee动态类
class Coffee {
  pourInCup(){
    console.log('把Coffee倒进杯子');
  }

  addCondiments(){
    console.log('加牛奶');
  }
}








const coffee = new DrinkBase(new Coffee()) // 注入动态的东西
coffee.init()


