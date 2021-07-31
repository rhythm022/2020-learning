const {button,ball} = require('./helper')


// 最简、演示版命令模式
function Command(func,...args){
    return function(){
        func(...args)
    }
}


const move = Command(ball.move,10)


move()

