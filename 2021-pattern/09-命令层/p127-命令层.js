const ball = {
    move: ( x = 0) => console.log(`移动小球至${x}px`)
}

// 入参 = 命令 - 函数 。
// 预留、预埋支持 === 接口 === 入参。
const Command = function (fn,that,...args) {
    return {
        execute() {
            // 为父函数免去传参
            fn.apply(that,args)
        }
    }
}

const move = Command(ball.move,ball,10)
move.execute()

// 最简命令层
function Command2(fn,that,...args){
    return function(){
        fn.apply(that,args)
    }
}


const move2 = Command2(ball.move,ball,20)


move2()

