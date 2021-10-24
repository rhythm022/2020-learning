const { Slot } = require('./observer')
const dependencyX = ()=>console.log('X')// dependency与slot

// 独立的观察者，所有父对象都拥有它，构成一个被观察的中心对象，这个中心对象可以改变所有的观察者/父对象
const slot = new Slot()


// 观察者/父对象之间不直接构成依赖调用，而是各自只与观察者交互。
slot.inject('slotA',dependencyX)

slot.use('slotA')//  观察者可以通过中心对象改变其他观察者
