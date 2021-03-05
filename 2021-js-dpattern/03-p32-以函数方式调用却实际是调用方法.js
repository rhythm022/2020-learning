Function.prototype.bind = function(context){
    const self_func = this

    return function(){
        return self_func.apply(context,arguments)
    }
}

const obj = {
    name:'jw'
}

const alertName = function(){
console.log(this.name)
}.bind(obj)



// 以函数方式调用却实际是调用方法
alertName()