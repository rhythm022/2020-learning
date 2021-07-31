// 100件内衣，只需要一个模特
class Model{
  constructor(sex) {
    this.sex = sex
    this.underwear = null
  }
  takePhoto(){
    console.log(this.underwear)
  }
}


// 享元模式将属性分为内部/共享/固定和外部/不共享/变化
// 把内部状态相同的对象指定为同一个对象，这个对象可以复用。而把不可复用的状态玻璃出来，放在外部。

// 享元模式是时间换空间，减少系统中的对象数量，但每次使用前都要做一些初始化操作。

// 所以内部状态有多少种组合，系统中便最多有多少个对象。




// objectManager = CommonObjFactory(代表CommonObj) + eachStatuses



const objectMgt = (function(){
  const eachStatuses = {}

  const CommonObjFactory = (function(){
    class CommonObj{// 公共对象需要能够调用“装配临时状态”
      constructor(g1,g2) {
        this.g1 = g1
        this.g2 = g2
      }
      doSth(id){// involveEachState
        Object.assign(commonObj,eachStatuses[id])//☆☆☆“装配临时状态”需要id

        console.log('使用外部状态');
      }
    }
    const pool = {}
    return {
      create:function(g1,g2){// 当没有g1,g2,CommonObjFactory就是单例工厂。
        return pool[g1+g2] || (pool[g1+g2] = new CommonObj(g1,g2))// CommonObj拥有这个对象通用的属性和通用的方法
      }
    }
  })()

  return {
    new(id,g1,g2,u1,u2){
      eachStatuses[id] = Object.create(null)
      eachStatuses[id].u1 = u1//eachStatuses[id]拥有这个对象各人私有的属性
      eachStatuses[id].u2 = u2

      return CommonObjFactory.create(g1,g2)
    },

  }
})()

const id = 0// id important!!!
const commonObj = objectMgt.new(id,1,2,11,22)

console.log(commonObj);
commonObj.doSth(id)
console.log(commonObj);


// 可以看到：享元模式需要维护更多的代码，所以只有当程序中有大量对象造成了大量内存开销，剥离出对象的外部状态后可以用较少的公共对象取代大量对象的场景


// p175-对象池/对象复用，不是享元模式，享元模式的关键是区别公共状态和自身状态，并把自身状态保存在其他地方，需要时把自身状态组装进共享对象
