const {button,ball} = require('./helper')

// 预留、预埋支持 === 接口
// 传统
class Command {//Command中间层使得dom可以无视每个函数的差异
    constructor(receiver,funcName,...args) {
        this.receiver = receiver
        this.funcName = funcName
        this.args = args
    }

    execute() {
        this.receiver[this.funcName](...this.args)
    }
}

const move = new Command(ball,'move')
button.addEventListner('move', () => {
    move.execute()
})
button.trigger('move')


// 传统的命令模式，将函数包装成对象，达到函数可以被四处传递的目的。
// 和策略模式一样，命令模式也早已融入进了js语言之中。
// js中的命令模式一般是这种形式：
const Command2 = function (func,...args) {
    return {
        execute() {
            func(...args)
        }
    }
}

// ☆☆☆☆☆
// 命令模式是包装方法，策略模式是实现方法。命令模式如果自己实现方法，就会退化成策略模式的代码样子。
// 此时只能充代码的意图区分它们，策略模式指向的问题域更小，所有策略对象的目的是一致的，他们只是达到这一目的的不同手段。
