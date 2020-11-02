class Queue<T> {
    private queue: T[] = []

    public Push(value: T): void {
        this.queue.push(value)
    }

    public Pop(): T | undefined {
        return this.queue.shift()
    }
}




const queue:Queue<number> = new Queue();
queue.Push(10)
console.log(
    queue.Pop()
)

interface  Stream {
    ReadStream():Int8Array
}

class Data<T extends Stream>{
    Read(stream:T){
        return stream.ReadStream()
    }
}


class WebStreamImp implements Stream{
    ReadStream(): Int8Array {
        let array = new Int8Array(8)
        for (let i = 0; i < array.length; i++) {
            array[i] = i + 3
        }

        return array
    }
}


const web = new Data<WebStreamImp>()

console.log(
    web.Read(new WebStreamImp())

)









