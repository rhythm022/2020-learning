function DrinkAbsCls({brew,pourInCup,addCondiments}){
  brew = brew || function(){throw new Error()}//包含了一些抽象方法
  pourInCup = pourInCup || function(){throw new Error()}//包含了一些抽象方法
  addCondiments = addCondiments || function(){throw new Error()}//包含了一些抽象方法

  return class{
    init(){
      brew()
      pourInCup()
      addCondiments()
    }
  }
}

// 比p224浪费内存，因为重复创建抽象方法，没有把抽象方法封装成抽象父类，事先准备好
const Drink = DrinkAbsCls({
  brew(){
    console.log('冲泡Coffee');
  },
  pourInCup(){
    console.log('把Coffee倒进杯子');

  },
  addCondiments(){
    console.log('加牛奶');

  }
})
const drink = new Drink()
drink.init()
