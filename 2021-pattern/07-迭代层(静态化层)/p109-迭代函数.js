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
// 迭代函数的静态化层
function IterFn(){
    let children = []

    return {
        add(fn){
            children.push(fn)
            return this
        },
        // 为父函数迭代函数
        execute(){
            return children.reduce((ret,next)=>ret || next(...arguments),undefined)
        }
    }
}

const root = IterFn()
root.add(fn1)
    .add(fn2)
    .add(fn3)


const result = root.execute()

console.log(result)
