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


// 享元模式将属性分为共享的元属性和不共享的个性属性
// 元属性封装成一个对象用来复用。个性属性封装成一个对象，以id为索引放入容器，需要时插拔进元对象

// objectManager = CommonObjFactory(代表CommonObj) + eachStatuses



const objectMgt = (function(){
  const eachStatuses = {}

  const CommonObjFactory = (function(){
    class CommonObj{
      constructor(g1,g2) {
        this.g1 = g1
        this.g2 = g2
      }
      doSth(id){// involveEachState
        Object.assign(commonObj,eachStatuses[id])//☆☆☆以id插拔个性属性

        console.log('使用外部状态');
      }
    }
    const pool = {}
    return {
      create:function(g1,g2){// 当没有元属性g1,g2,CommonObjFactory就是单例工厂。
        return pool[g1+g2] || (pool[g1+g2] = new CommonObj(g1,g2))
      }
    }
  })()

  return {
    new(id,g1,g2,u1,u2){
      eachStatuses[id] = {//eachStatuses是保存个性属性的容器
        u1,u2
      }

      return CommonObjFactory.create(g1,g2)
    },

  }
})()

const id = 0
const commonObj = objectMgt.new(id,1,2,11,22)

console.log(commonObj);
commonObj.doSth(id)
console.log(commonObj);



// 可以看到：享元模式增加了系统复杂度，只有当程序有大量对象造成了大量内存开销，提炼出对象的元属性后用较少的元对象取代大量对象可以减少内存占用时使用。
// 享元模式是时间换空间

// p175-对象池/对象复用，不是享元模式，享元模式的核心是提炼出对象元属性，并把个性属性保存在容器待插拔
