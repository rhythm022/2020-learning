const compose = function(...fns){
    return function(arg){
        return fns.reverse().reduce((acc,fn)=>{
            return fn(acc)
        },arg)
    }
}
const stepA = a=>  a + 'a'
const stepB = a=>  a + 'b'
const stepC = a=>  a + 'c'



const action= compose(stepA,stepB,stepC)

console.log(action(''))


const pipe = function(...fns){
    return function(arg){
        return fns.reduce((acc,fn)=>{
            return fn(acc)
        },arg)
    }
}