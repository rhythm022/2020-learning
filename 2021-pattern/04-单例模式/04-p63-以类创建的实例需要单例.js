const Singleton = function (Func) {
    let ret

    return class extends Func {
        constructor() {
            if (ret) return ret

            super(...arguments)

            ret = this
        }


    }

}
//旧语法
const Singleton2 = function (Func) {
    let ret

    return function () {
        return ret || (ret = new Func(...arguments))
    }

}
// 单例模式的核心是目标实例有了就不再创建，并提供全局的访问。
// 适用于以类创建的实例需要单例的场景
const Person = Singleton(class Person {
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