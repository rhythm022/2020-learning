let guitar = {
    doo:1,re:2,mi:3
}

let {doo, ...next} = guitar

console.log(next)



/////////////////////////////////
let increments  = [1,2,3,4,5]

let [f,s,th,fo,fi,si,...res] = increments

console.log(
    f,s,th,fo,fi,si,res
)
