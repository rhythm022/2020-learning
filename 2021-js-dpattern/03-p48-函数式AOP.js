
// 原函数一before_func为闭包内方法/回调函数
// 原函数二this_func为闭包内方法
// 闭包主方法耦合了这两个闭包内方法
Function.prototype.before = function (before_func) {
    const this_func = this
    return function () {
        // 闭包主方法：执行闭包内方法一/回调函数。执行闭包内方法二。
        before_func.apply(this, arguments)

        return this_func.apply(this, arguments)
    }
}

Function.prototype.after = function (after_func) {
    const this_func = this
    return function () {
        // 闭包主方法：执行闭包内方法一。执行闭包内方法二/回调函数。
        const ret = this_func.apply(this, arguments)

        after_func.apply(this, arguments)//?? 无法使用前面函数的结果

        return ret

    }
}


const fn = () => { console.log('middle') }

/*
// 错误
fn.before(()=>{console.log('before')})
fn.after(()=>{console.log('after')})
fn()
*/

const new_func = fn
    .before(() => { console.log('before') })
    .after(() => { console.log('after') })


new_func()