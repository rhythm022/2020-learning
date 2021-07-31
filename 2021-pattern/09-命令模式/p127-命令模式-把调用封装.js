const {button,ball} = require('./helper')

// 预留、预埋支持 === 接口。传统语言中，将函数包装成对象，达到函数可以被四处传递的目的。
// 命令 = 函数 + 参数
// 命令模式/Command中间层是把函数的参数包装在一起，使得调用者可以简单调用。
const Command = function (receiver,funcName,...args) {
    return {
        execute() {
            receiver[funcName](...args)
        }
    }
}

const move = Command(ball,'move',10)
move.execute()


// 策略模式封装的代码更小。封装的是手段。
// 命令模式则封装任意函数。
