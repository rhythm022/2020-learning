type Constructor<T = {}> = new (...args: any[]) => T

class Person {
    FirstName: string
    LastName: string

    constructor(firstName: string, lastName: string) {
        this.FirstName = firstName
        this.LastName = lastName
    }
}

function RecordStatus<T extends Constructor>(base: T) {
    return class extends base {
        constructor(...args:any[]) {
            super(args[0],args[1]);
            this.deleted = args[1]
        }
        private deleted: boolean = false

        get Deleted(): boolean {
            return this.deleted
        }

        Delete():void{
            this.deleted = true

            console.log(` deleted OK`)
        }
    }
}

function Timestamp<T extends Constructor>(base: T) {
    return class extends base {
        Updated: Date = new Date()
    }
}

const ActivePerson = RecordStatus(Person)
const ActivePersonPlus = Timestamp(RecordStatus(Person))

let activePerson = new ActivePerson('P', 'O')
let activePersonPlus = new ActivePersonPlus('P', 'O')
// activePerson.Delete()

console.log(
    activePerson.Deleted,
    activePerson.FirstName,
    activePersonPlus.Updated,
)
function deletePerson(person:any){
    person.Delete()

}


deletePerson(activePerson)











