const { installSlot } = require('./observer')
const dependencyX = ()=>console.log('X')// dependency与slot


// 你观察我，我就改变你
// 让一个对象拥有slot，使这个对象可以被观察，被观察的对象可以改变其他对象。
const child = installSlot({})

// 父对象作为观察者，观察子对象，使得子对象可以改变父对象的状态
child.inject('slotA',dependencyX)// 父调子inject，部分暴露了自己给子对象。

child.use('slotA')// “只允许”子调use，实现子调父
