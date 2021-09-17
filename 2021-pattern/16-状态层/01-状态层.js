// 状态层为父函数管理curState
// 只要一件事有if/else就可以使用状态层。多态 === 多实例。
// 行为按不同状态放在不同文件下。off/weak是状态，鸡鸭也是状态
class WhenOff{
  constructor(context) {
    this.context = context
  }
  press(){//WhenOff,press...
    console.log('弱光');
    this.context.next(this.context.whenWeak)//执行逻辑然后改变curState
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

context.press()
context.press()
context.press()
context.press()


// 在Java中所有WhenXXX类必须继承自When抽象类，如果没有通用的方法值得放入抽象类，则是所有WhenXXX类实现When接口
// 从一个状态可以next往多个状态上下文。 比如用户“点击中”进入/next往“扫描中”，“扫描中”可以next往“上传完成”、“上传失败”、“上传中”。 “上传中”可以next往“暂停上传”、“上传完成”。“暂停上传”可以next往“上传中”
