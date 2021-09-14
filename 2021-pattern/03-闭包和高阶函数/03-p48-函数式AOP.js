Function.prototype.before = function(beforeFn){
    const srcFn = this

    return function(){// 返回的是装饰器
        beforeFn.apply(this,arguments)

        return srcFn.apply(this,arguments)
    }

}

Function.prototype.after = function(afterFn){
    const srcFn = this

    return function(){
        const res = srcFn.apply(this,arguments)

        afterFn.apply(this,arguments)

        return res
    }

}


const src = () => { console.log('main') }

/*
// 错误
fn.before(()=>{console.log('before')})
fn.after(()=>{console.log('after')})
fn()
*/

const decorator = src
.before(() => { console.log('before2') })
.before(() => { console.log('before1') })
.after(() => { console.log('after1') })
.after(() => { console.log('after2') })


decorator()
