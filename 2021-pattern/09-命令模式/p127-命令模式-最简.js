const {button,ball} = require('./helper')


// 最简、演示版命令模式
function Command(func,...args){
    return function(){
        func(...args)
    }
}


const move = Command(ball.move)
button.addEventListner('move', () => {
    move()
})

button.trigger('move')
