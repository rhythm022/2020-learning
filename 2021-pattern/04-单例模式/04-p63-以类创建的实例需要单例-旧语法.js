class Person {
    constructor(name) {
        this.name = name
    }
    getName() {
        console.log(this.name)
    }

}

const Singleton = function (Func) {
    let instance

    return function () {
        return instance || (instance = new Func(...arguments))
    }

}
// 单例模式的核心是目标实例有了就不再创建，并提供全局的访问。
// 适用于以类创建的实例需要单例的场景
const SingletonPerson = Singleton(Person)
const jw = new SingletonPerson('jw')
const jw2 = new SingletonPerson('jw')

console.log(jw === jw2,jw2.name)