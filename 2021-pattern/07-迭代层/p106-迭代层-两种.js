const exp = [1,2,3]
exp.iter = exp.forEach
// 迭代层/内部迭代器
// 迭代层 === exp
exp.iter(console.log)


///////////////////////////////////////
// 迭代层/外部迭代器
// next,isDone,getCurrent是规范
const Iterator = function(obj){
    let current = 0

    const next = function(){
        current += 1 //自己实现next逻辑
    }

    const isDone = function(){
        return current >= obj.length //自己实现isDone逻辑
    }

    const getCurrent = function(){
        return obj[current]//自己实现getCurrent逻辑
    }

    return {
        next,
        isDone,
        getCurrent,
    }
}
