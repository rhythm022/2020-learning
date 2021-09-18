// 流程
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
// 迭代函数的中间层
function IterFn(){
    let children = []

    return {
        add(impl){
            children.push(impl)
        },
        // 为父函数迭代函数
        execute(){
            return children.reduce((ret,next)=>ret || next(),undefined)
        }
    }
}

const iter = IterFn()
iter.add(fn1)
iter.add(fn2)
iter.add(fn3)


const result = iter.execute()

console.log(result)
