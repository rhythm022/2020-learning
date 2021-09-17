// 类，类似高阶函数，并不会每次调用都重新创建函数。
// 函数在类中定义，通过实例化对象，得到函数引用。
function LightAbsClsFunction(){// 创建LightAbs类，创建一次类，就创建一份对象方法。
  const request1 = function(){ throw new Error() }
  const request2 = function(){  throw new Error() }


  return function extend({request1:r1,request2:r2}){
    const F = function(){}

    F.prototype.request1 = r1 || request1
    F.prototype.request2 = r2 || request2
    return F
  }
}

// 一个需要依赖注入的类 === 一个需要被extend的类：父类永远比子类大
const LightAbs = LightAbsClsFunction()
const Light = LightAbs({// 调用“抽象类”，无法独立产出对象，抽象类只能与“子类”结合，产生“实际类”
  request1(){
    console.log('open light');
  },
  request2(){
    console.log('close light');
  },
})
new Light().request1()// 调用实体类，输出对象
