class DrinkBase{
  init(){
    this.boilWater()
    this.brew()
    this.pourInCup()
    if(this.isAddCondiments()){
      this.addCondiments()

    }
  }
  boilWater(){
    console.log('烧水');
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
  // hook和回调传参差不多
  isAddCondiments(){// hook
    return true
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
