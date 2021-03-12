const getSingle = function(func){

    let instance
    return function(){
        return instance || (instance = func.apply(this,arguments))

    }
}

function createModalWindow(){
    const div = document.createElement('div')
    div.innerHTML = '我是登录悬浮窗'

    return div
}


const createSingletonModalWindow = getSingle(createModalWindow)

const modal1 = createSingletonModalWindow()
const modal2 = createSingletonModalWindow()


console.log(modal1 === modal2)