function loadSrc(){
    const img = new Image()//可能被垃圾回收
    img.src = src
}

loadSrc('http://xxx.com')



// 函数在，闭包对象就在
const report = (function(){
    let __img// 不会被垃圾回收

    return function(src){
        const img = new Image()
        img.src = src
        __img = img
    }
})()