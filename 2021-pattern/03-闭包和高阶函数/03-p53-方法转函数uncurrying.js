Function.prototype.toFunc = function () {
    const func = this
    return function () {
        return Function.prototype.call.apply(func,arguments)
        // return func.apply(arguments)
    }
}

const push = Array.prototype.push.toFunc()
const that = []
push(that, 1)
console.log(that)




