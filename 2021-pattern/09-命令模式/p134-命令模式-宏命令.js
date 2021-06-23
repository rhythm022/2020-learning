const {button,ball} = require('./helper')

// 宏命令 === 一组命令 === 批处理命令
// 宏命令是命令模式和组合模式的联用
function Command(func, ...args) {
    let start = null

    return {
        execute() {
            start = 500
            func(...args)
        },
        undo(){
            func(start)
        },
    }
}



////////////////////////////////////////////////////////////////

const MacroCommand = function(){
    const cmds = []

    return {
        add(command){
            cmds.push(command)
        },
        execute(){
            cmds.forEach(cmd=>cmd.execute())
        },
        reverse(){
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

button.addEventListner('click', () => {
    macro.execute()
})

button.addEventListner('reverse', () => {
    macro.reverse()
})


button.trigger('click')
button.trigger('reverse')

