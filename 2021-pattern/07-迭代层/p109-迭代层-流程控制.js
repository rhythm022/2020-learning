const fn1 = function () {
    // return '1'
}
const fn2 = function () {
    return '2'
}
const fn3 = function () {
    return '3'
}

// 数组式对象(而非链表式对象)
function IterFn(){
    let impls = []

    return {
        add(impl){
            impls.push(impl)
        },
        // 为父函数顺序执行函数
        do(){
            return impls.reduce((ret,next)=>ret || next(),undefined)
        }
    }
}

const iter = IterFn()
iter.add(fn1)
iter.add(fn2)
iter.add(fn3)


const result = iter.do()

console.log(result)
