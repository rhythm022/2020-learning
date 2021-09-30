class Pool{
  constructor(_class_) {
    this.class = _class_
    this.pool = []
  }

  create(){
    const {pool} = this
    if(pool.length){
      return pool.pop()//分发
    }else{
      return new this.class()
    }
  }

  recycle(target){
    const {pool} = this

    pool.push(target)
  }
}




const pool = new Pool(class Person{})
const person = pool.create()
pool.recycle(person)
const person2 = pool.create()

console.log(person === person2,person)
