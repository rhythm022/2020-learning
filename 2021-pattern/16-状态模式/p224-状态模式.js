
// 状态模式适用于：同一请求在不同状况下有不同行为表现。多态???
// 不同的状态 === 不同的上下文。★★★
// 状态模式 = 执行逻辑然后改变上下文。从一个状态可以next往多个状态上下文。
// 比如用户“点击中”进入/next往“扫描中”，“扫描中”可以next往“上传完成”、“上传失败”、“上传中”。 “上传中”可以next往“暂停上传”、“上传完成”。“暂停上传”可以next往“上传中”
class WhenOff{
  constructor(context) {
    this.context = context
  }
  press(){//WhenOff,press...
    console.log('弱光');
    this.context.next(this.context.whenWeak)
  }
}

class WhenWeak{
  constructor(context) {
    this.context = context
  }
  press(){//WhenWeak,press...
    console.log('强光');
    this.context.next(this.context.whenStrong)
  }
}

class WhenStrong{
  constructor(context) {
    this.context = context
  }
  press(){//WhenStrong,press...
    console.log('关灯');//
    this.context.next(this.context.whenOff)
  }
}

// 一般只允许父类请求子类，子类请求子类★★★
class Context{
  constructor() {
    this.whenOff = this.curState = new WhenOff(this)// 允许子类请求父类（特例）
    this.whenWeak = new WhenWeak(this)
    this.whenStrong = new WhenStrong(this)
  }

  next(state){
    this.curState = state
  }
  press(){
    this.curState.press()
  }
}

const context = new Context()
// 委托 === 让调用者在不同状况下，以为服务端是从不同类中实例化而来的
context.press()
context.press()
context.press()
context.press()


// 在Java中所有When类必须继承自When抽象类，当然如果没有通用的方法值得放入抽象类，则是所有When类实现When接口
