const {button,ball} = require('./helper')

// 宏命令 === 连续命令 === 批命令

function Command(func, ...args) {
    let preconditions = null

    return {
        execute() {
            preconditions = 'x'
            func(...args)
        },
        undo(){
            console.log(preconditions);
            func(preconditions)
        },
    }
}




////////////////////////////////////////////////////////////////
// 宏命令是命令模式和组合模式的联用
// MacroCommand是组合对象，Command是叶对象，MacroCommand自己不实现，而是把请求委托给叶对象
// 有了组合对象，调用者就不需要关心叶对象，只需要关心顶层的组合对象。
// 另外常常，基于多态性，使得调用者可以MacroCommand和Command混用。
const MacroCommand = function(){
    const cmds = []

    return {
        add(command){
            cmds.push(command)
        },
        execute(){
            cmds.forEach(cmd=>cmd.execute())
        },
        undo(){
            let command
            while(command = cmds.pop()){
                command.undo()
            }
        },
    }
}

const macro = MacroCommand()
const command1 = Command(ball.move,1)
const command2 = Command(ball.move,2)
const command3 = Command(ball.move,3)

macro.add(command1)
macro.add(command2)
macro.add(command3)

macro.execute()
macro.undo()
