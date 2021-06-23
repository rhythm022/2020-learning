const implement1 = function () {
    // return '1'
}
const implement2 = function () {
    return '2'
}
const implement3 = function () {
    return '3'
}


const execute = function (impls) {
    return impls.reduce((ret,impl)=>{
        if(ret) return ret

        return impl()

    },undefined)
}


const impls = [implement1, implement2, implement3]
const result = execute(impls)//branch1优先级最高

console.log(result)


