const { Slot } = require('./observer')
const dependencyX = ()=>console.log('X')// dependency与slot

// 独立的观察者，作为所有父对象的中心，构成观察圈
const slot = new Slot()

// 多个父对象拥有一个观察者。观察者的所有父对象组成一个圈子。
// 圈子内，父对象之间不直接构成依赖调用，而是各自只与观察者交互。
slot.inject('slotA',dependencyX)// 圈子内对象把自己部分暴露给观察者（观察者不拥有这些父对象的引用）

slot.use('slotA')//  圈子内对象都可以通过观察者改变其他父对象
