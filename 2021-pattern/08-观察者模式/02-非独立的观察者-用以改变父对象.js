const { installSlot } = require('./observer')
const dependencyX = ()=>console.log('X')// dependency与slot



// 让一个对象拥有slot，让该对象拥有修改父对象状态的能力。
const child = installSlot({})

child.inject('slotA',dependencyX)// 父调子inject，以部分暴露自己给子对象。

child.use('slotA')// “只允许”子调use，实现子调父
