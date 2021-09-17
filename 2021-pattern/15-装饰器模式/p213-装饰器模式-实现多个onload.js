const _onload = window.onload || (()=>{})//闭包 === 子函数

window.onload = function(){// 父函数
  _onload()

  //self logic
}
//////////////////
