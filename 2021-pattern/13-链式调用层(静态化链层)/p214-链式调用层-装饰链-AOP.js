// Link Function
Function.prototype.before = function(beforeFn){
  const srcFn = this

  return function(...context){// 返回的是Link

    if(beforeFn.apply(this,context) === false) return false

    return srcFn.apply(this,context)
  }

}

Function.prototype.after = function(afterFn){
  const srcFn = this

  return function(...context){
    if(srcFn.apply(this,context) === false) return false

    return afterFn.apply(this,context)
  }

}


const link = (p1) => { p1.main = '';console.log(p1) }

const root = link
.before((p1) => { p1.step2 = '';console.log(p1);return false })// 后执行
.before((p1) => { p1.step1 = '';console.log(p1) })// 先执行
.after((p1) => { p1.step3 = '';console.log(p1) })
.after((p1) => { p1.step4 = '';console.log(p1) })


root({})








// window.onload = (window.onload ||  (()=>{})).after(()=>{
// // self logic
// })

////////////////////////////////////////////////////////////////////
// 父对象内部细节不应对子对象可见。
// 装饰链，拥有与子对象一致的接口，如AtomDecorator装饰MissileDecorator装饰Plane，三个对象都拥有fire方法

// const _onload = window.onload
//
// window.onload = function(){// 父函数
//   _onload()//子函数
//
//   //self logic
// }
//
