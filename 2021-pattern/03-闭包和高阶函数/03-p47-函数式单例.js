
// 原函数target_fn为闭包内方法/回调函数
// ret为闭包内状态
// 闭包主函数耦合ret、target_fn

const single = function (target_fn){
    let ret
    
    return function(){
        // 闭包主函数：当ret为null时，执行回调函数
        return ret || (ret = target_fn.apply(this,arguments))
    }
}




function getObject(){
    return Object.create(null)
}


const getSingleObj = single(getObject)



const obj01 = getSingleObj()
const obj02 = getSingleObj()


obj01.name = 'jw'

console.log(obj02.name)