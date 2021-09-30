// 100件内衣，只需要一个模特

// 复用 === 共用 ★★★
// 越是公共的数据越是静态 ★★★
// 享元模式将对象视为静态和动态的两部分
// 享元模式将静态属性对象放入池中，共用化，达到节省内存的目的
// 可以说，静态对象是父对象，动态对象是子对象，一对多
const dynamics = {}
class Static{
  constructor(...arg) {
  }

  xxx(id){
    Object.assign(this,dynamics[id])// 当异步，不安全

    console.log('使用动态',this);
  }
}


class Statics{
  constructor() {
    this.statics = {}
  }


  get(...arg){
    const key = JSON.stringify(arg)
    const {statics} = this
    if(!statics[key]){
      statics[key] = new Static(...arg)
    }
    return statics[key]//共享flyweight
  }
}
const statics = new Statics()

function create(id,a,b,c,d){
  dynamics[id] = {c,d}

  return statics.get(a,b)
}



const flyweight = create(0,1,2,3,4)
const flyweight2 = create(1,1,2,5,6)


console.log(flyweight === flyweight2);
flyweight.xxx(0)
flyweight.xxx(1)


// 享元模式是时间换空间

// 享元模式的核心是提炼出对象静态属性
