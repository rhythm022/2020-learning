class DrinkLayer{
  init(){
    if(this.isAddCondiments()){
      this.addCondiments()

    }
  }
  // hook和回调传参差不多
  isAddCondiments(){return false}

  addCondiments(){ throw '加调味'}

}
class Coffee extends DrinkLayer{
  isAddCondiments(){
    return true
  }
  addCondiments(){
    console.log('加牛奶');
  }
}

const coffee = new Coffee()// 使用继承向父函数隐藏静态部分
coffee.init() // 父函数直接调动态层，动态层中隐藏有静态层，静态层再调动态层








////////////////////////////////////////////////////////////////
function DrinkLayerGenerator({pourInCup,addCondiments}){
  return class{
    init(){
      pourInCup()
      addCondiments()
    }
  }
}


const _DrinkLayer_ = DrinkLayerGenerator({
  pourInCup(){
    console.log('pourInCup');

  },
  addCondiments(){
    console.log('addCondiments');

  }
})


const drinkLayer = new _DrinkLayer_()//反之，静态层不会被隐藏，而是动态层被隐藏
drinkLayer.init()
