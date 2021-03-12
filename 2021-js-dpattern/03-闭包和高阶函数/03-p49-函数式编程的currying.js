//没有闭包，就没有currying
const cost = (function () {
    const args = []

    return function () {
        if (arguments.length === 0) {// 执行最终逻辑
            let ret = 0
            args.forEach(v => ret += v)

            return ret
        } else {
            // 修改闭包状态
            Array.prototype.push.apply(args, arguments)
        }
    }
})()



cost(100)
cost(200)
cost(300)

console.log(
    cost()
)