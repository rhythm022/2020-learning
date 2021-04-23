
// 用闭包+apply实现bind
const bind = function(fn,self){
    return function(){
        return fn.apply(self,arguments)
    }
}

const getElementsByTagName = bind(document.getElementsByTagName,document)

/////////////////////////////////////////////////////////////////
// 将bind挂在Function上
Function.prototype.bind = function(self){
    const func = this

    return function(){
        return func.apply(self,arguments)
    }
}
const getElementsByTagName2 = document.getElementsByTagName.bind(document)
