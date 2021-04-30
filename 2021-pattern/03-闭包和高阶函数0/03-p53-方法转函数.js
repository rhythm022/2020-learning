Function.prototype.funcCall = function () {
    const func = this
    return function () {
        return func.call(...arguments)
    }
}

const push = Array.prototype.push.funcCall()
const obj = {}
push(obj, 1)// 相当于Array.prototype.push.call(obj,1)
console.log(obj)



////////////////////////////////////////////////
Function.prototype.call.apply(function(args){console.log(this,args)},[{1:2},3])

Function.prototype.call.call(function(args){console.log(this,args)},{1:2},3)