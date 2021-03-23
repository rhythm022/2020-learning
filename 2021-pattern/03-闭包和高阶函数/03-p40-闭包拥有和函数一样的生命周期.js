function report(){
    const img = new Image()
    img.src = src
}

report('http://xxx.com')



// 闭包内状态拥有和闭包主函数一样的生命周期
// 可以防止还没发出请求，img就被销毁
const report = (function(){
    let __img

    return function(src){
        const img = new Image()
        img.src = src
        __img = img
    }
})()