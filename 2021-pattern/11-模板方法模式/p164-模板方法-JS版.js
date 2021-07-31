const extendsDrinkBase = function({brew,pourInCup,addCondiments}){
  return class DrinkBase{
    init(){
      brew()
      pourInCup()
      addCondiments()
    }
  }
}


const Coffee = extendsDrinkBase({
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
const coffee = new Coffee()
coffee.init()
