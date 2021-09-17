Function.prototype.before = function(beforeFn){// 传入子函数，返回父函数，父函数更大，更早被调用★★★
  const srcFn = this

  return function(){// 返回的是装饰器
    beforeFn.apply(this,arguments)

    return srcFn.apply(this,arguments)
  }

}

Function.prototype.after = function(afterFn){// 后置装饰
  const srcFn = this

  return function(){
    const res = srcFn.apply(this,arguments)

    afterFn.apply(this,arguments)

    return res
  }

}


const src = () => { console.log('main') }

const decorator = src
.before(() => { console.log('before2') })
.before(() => { console.log('before1') })
.after(() => { console.log('after1') })
.after(() => { console.log('after2') })
.after(() => { console.log('step3') })
.after(() => { console.log('step4') })

decorator()
// 前后置AOP用于将行为划分为力度更细的函数
// 比如先校验表单再提交表单
// 不同于代理模式作为中间层只有一层，装饰器作为中间层可能与多层
/////////////////////////////////////////////////////////

window.onload = (window.onload ||  (()=>{})).after(()=>{
// self logic
})
