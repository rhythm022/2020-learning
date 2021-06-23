const {button,ball} = require('./helper')


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
function Executer(){
    const cmds = []

    return {
        execute(command){
            cmds.push(command)

            command.execute()
        },
        undo(){
            const command = cmds.pop()

            command.undo()
        },
        clear(){
            cmds.length = 0
        },
        play(){
            cmds.forEach(cmd=>cmd.execute())
        }
    }
}
const exe = Executer()

button.addEventListner('click', () => {
    exe.execute(new Command(ball.move,1))

})


button.addEventListner('dbclick', () => {
    exe.execute(new Command(ball.move,2))

})


button.addEventListner('undo', () => {
    exe.undo()

})

button.addEventListner('play', () => {
    exe.play()

})



button.trigger('click')
button.trigger('dbclick')

button.trigger('undo')

button.trigger('play')


