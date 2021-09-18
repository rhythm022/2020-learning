const singletonModalWindow = once(function modalWindow(){
    const div = Object.create(null)
    div.innerHTML = '我是登录悬浮窗'

    return div

})

const modal1 = singletonModalWindow()

const Person = single(class Person {
    constructor(name) {
        this.name = name
    }
    getName() {
        console.log(this.name)
    }
})

const jw = new Person('jw')
const jw2 = new Person('jw')

console.log(jw === jw2,jw2.name)










// 单例中间层限制只生产一个实例
function once(func){
  let instance

  return function(){
    return instance || (instance = func.apply(this,arguments))

  }
}



function single(Func) {
  let instance

  return function () {
    return instance || (instance = new Func(...arguments))
  }

}



function single1(Func) {
  let ret

  return class extends Func {
    constructor() {
      if (ret) return ret

      super(...arguments)

      ret = this
    }
  }
}
