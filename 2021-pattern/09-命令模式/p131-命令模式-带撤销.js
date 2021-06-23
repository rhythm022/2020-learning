const {button,ball} = require('./helper')

//对于多步撤销，是startX升级为可以存储多步中间状态的stack
function MoveCommand(ball,endX) {
    let startX = null

    return {
        execute() {
            startX = 0
            ball.move(endX)
        },
        undo(){//对于可逆操作，有撤销操作
            ball.move(startX)
        },
    }
}

const command = MoveCommand(ball,1000)

button.addEventListner('click', () => {
    command.execute()
})
button.addEventListner('dbclick', () => {
    command.undo()
})


button.trigger('click')
button.trigger('dbclick')


