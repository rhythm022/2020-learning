const baiduMap = {
  display(){}
}


// Adapter作为父对象，作为中间层，在源对象被调用前被调用★★★
const baiduAdapter = {
  show(){
    return baiduMap.display()
  }
}


// Adapter作为computed函数，作为中间层，在源对象被调用前被调用★★★
function addressAdapter(oldAddress){
  const res = {}
  oldAddress.forEach(({name,id})=>{
        res[name] = id

      })

  return res
}
//装饰层用来增加功能，代理层用来访问控制，适配层用来适配
//还有命令层
