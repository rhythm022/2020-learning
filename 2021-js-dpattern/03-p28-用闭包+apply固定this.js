
// 用闭包+apply固定this
document.getElementById = (function(fn){
    return function(){
        return fn.apply(document,arguments)
    }
})(document.getElementById)


