// 如果一个函数是以返回对象为职责的
// 只执行一次这个函数，返回对象就是单例对象
const single = function(func){
    let instance
    return function(){
        return instance || (instance = func.apply(this,arguments))

    }
}




const singletonModalWindow = single(function modalWindow(){
    const div = Object.create(null)
    div.innerHTML = '我是登录悬浮窗'

    return div

})

const modal1 = singletonModalWindow()
const modal2 = singletonModalWindow()


console.log(modal1 === modal2)