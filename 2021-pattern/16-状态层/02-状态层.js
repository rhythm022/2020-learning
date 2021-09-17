// 字面量对象一般用来只有属性或只有函数的场景
const state = {// 没有自己的上下文，与状态层共用上下文
  whenOff:{
    press(){
      console.log('弱光');
      this.cur = state.whenWeak
    }
  },
  whenWeak:{
    press(){
      console.log('强光');
      this.cur = state.whenStrong
    }
  },
  whenStrong:{
    press(){
      console.log('关灯');
      this.cur = state.whenOff
    }
  }
}



//状态层
class Context{// 状态层是为父函数管理状态，没有状态层父函数自己也要管理cur
  constructor() {
    this.cur = state.whenOff
  }
  press(){
    this.cur.press.call(this)
  }
}



const context = new Context()

context.press()
context.press()
context.press()
context.press()

//////////////////////////////////////////
const state = {
  whenWalk:{//whenWalk是状态，walk是请求，两者没有直接关系
    walk(){
      console.log('行走');
    },
    attack(){
      console.log('攻击');
    },
    defense(){
      console.log('防御');
    },
    jump(){
      console.log('跳跃');
    },
  },
  whenAttack:{
    walk(){
      throw new Error('不能行走')
    },
    defense(){
      throw new Error('不能防御')
    },
    jump(){
      throw new Error('不能跳跃')
    },
    attack(){
      console.log('攻击');
    },
  }
}
