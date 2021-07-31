const {button,ball} = require('./helper')


// 命令模式除了包装函数、参数，还可以包装前置状态。前置状态在执行前保存，在undo时使用。
function Command(func,...args) {
    let preconditions = null

    return {
        execute() {
            preconditions = 'sth'
            func(...args)
        },
        undo(){//对于可逆操作，有撤销操作
            console.log(preconditions);
            func(preconditions)
        },
    }
}

const command = Command(ball.move,1000)

command.execute()
command.undo()
