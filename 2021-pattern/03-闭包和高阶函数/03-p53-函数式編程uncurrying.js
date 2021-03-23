Function.prototype.uncurrying = function(){
    const this_func = this

    return function(){
        return (Function.prototype.call).apply(this_func,arguments)
    }
}

const push = Array.prototype.push.uncurrying()
const obj = {}
push(obj,1)

console.log(obj)