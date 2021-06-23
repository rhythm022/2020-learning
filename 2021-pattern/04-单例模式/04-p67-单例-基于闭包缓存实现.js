
// 以返回对象为职责的函数 === 构造函数 === 工厂函数
// 这也是代理（对调用者透明，覆盖源函数的语义）
const single = function(func){
    let instance

    return function(){
        return instance || (instance = func.apply(this,arguments))

    }
}


// 语法对比single2
const single2 = function (Func) {
    let instance

    return function () {
        return instance || (instance = new Func(...arguments))
    }

}


// 语法对比single3
const single3 = function (Func) {
    let ret

    return class extends Func {
        constructor() {
            if (ret) return ret

            super(...arguments)

            ret = this
        }
    }
}


const singletonModalWindow = single(function modalWindow(){
    const div = Object.create(null)
    div.innerHTML = '我是登录悬浮窗'

    return div

})

const modal1 = singletonModalWindow()

// const Person = single(class Person {
//     constructor(name) {
//         this.name = name
//     }
//     getName() {
//         console.log(this.name)
//     }

// })
// const jw = new Person('jw')
// const jw2 = new Person('jw')

// console.log(jw === jw2,jw2.name)