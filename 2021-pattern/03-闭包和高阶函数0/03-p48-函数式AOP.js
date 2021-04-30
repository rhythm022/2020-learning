
Function.prototype.onBefore = function (before_func) {
    const func = this
    return function () {
        before_func.apply(this, arguments)

        return func.apply(this, arguments)
    }
}

Function.prototype.onAfter = function (after_func) {
    const func = this
    return function () {
        const ret = func.apply(this, arguments)

        after_func.apply(this, arguments)// 无法使用前面函数的结果

        return ret

    }
}


const fn = () => { console.log('main') }

/*
// 错误
fn.before(()=>{console.log('before')})
fn.after(()=>{console.log('after')})
fn()
*/

const new_func = fn
    .onBefore(() => { console.log('before') })
    .onAfter(() => { console.log('after') })


new_func()