// 将普通的集合转换成迭代器
const iterator = function(obj){
    let current = 0
    const next = ()=>++current

    const isDone = ()=>current>= obj.length

    const getCur = ()=>obj[current]

    return {
        next,
        isDone,
        getCur,
    }
}


const a = iterator([1,2,3])
console.log(a.getCur())
a.next()
console.log(a.getCur())