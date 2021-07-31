const ObjectMgt = function(Sth){
  const pool = []

  return {
    create(){
      if(pool.length)return pool.pop()

      return new Sth()
    },
    recycle(sth){
      pool.push(sth)
    }
  }
}
