const curry = function(fn){
    return function curryFn(...args){
        if(args.length<fn.length){
            return function(){
                return curryFn(...args,...arguments)
            }
        }else{
            return fn(...args)
        }
    }
}



let add = (a,b,c)=>a+b+c


add = curry(add)




console.log(
    add(1)(2)(3)
)