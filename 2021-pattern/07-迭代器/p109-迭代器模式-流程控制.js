const implement1 = function () {
    // return '1'
}
const implement2 = function () {
    return '2'
}
const implement3 = function () {
    return '3'
}


// const execute = function (impls) {
//     return impls.reduce((ret,impl)=>{
//         return ret || impl()
//
//     },undefined)
// }


// const impls = [implement1, implement2, implement3]//☆☆☆
// const result = execute(impls)//branch1优先级最高
//
// console.log(result)



// 封装成类
function Executor(){
    let impls = []//☆☆☆


    return {
        add(impl){
            impls.push(impl)
        },
        execute(){
            return impls.reduce((ret,next)=>ret || next(),undefined)
        }
    }
}

const exe = Executor()
exe.add(implement1)
exe.add(implement2)
exe.add(implement3)


const result = exe.execute()

console.log(result)
