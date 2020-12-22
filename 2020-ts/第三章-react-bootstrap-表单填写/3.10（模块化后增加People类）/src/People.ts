import {PersonRecord} from "./Types";
import {Database} from "./Database/Database";
import {PersonalDetailsTableBuilder} from "./PersonalDetailsTableBuilder";
import {IPersonState} from "./State";
import {IRecordState, RecordState} from "./RecordState";

export class People{
    private people = new Array<PersonRecord>()
    private readonly dataLayer:Database<PersonRecord>

    constructor() {
        const tableBuilder:PersonalDetailsTableBuilder = new PersonalDetailsTableBuilder()
        this.dataLayer = new Database(tableBuilder.Build())
    }


   async loadPeople(){
       this.people =  await this.dataLayer.Read()
    }


    getPeople(){
        return this.people
    }
    findPerson(person:string){
        return this.people.find((element:IPersonState)=>element.PersonId === person)
    }

    async deletePerson(person:string){//软删除：设置该数据库记录为no active
        const foundPerson = this.findPerson(person)
        if(!foundPerson) return

        const personState:IRecordState = new RecordState()
        personState.IsActive = false;
        const state: PersonRecord = {...foundPerson,...personState}

        await this.dataLayer.Update(state)

    }


    createPerson(person:IPersonState) {
        const personState: IRecordState = new RecordState()
        personState.IsActive = true
        const state: PersonRecord = {...person, ...personState}

        state.PersonId = Date.now().toString()
        this.dataLayer.Create(state)
    }


    async updatePerson (person:IPersonState){
        const personState: IRecordState = new RecordState()
        personState.IsActive = true
        const state: PersonRecord = {...person, ...personState}

        await this.dataLayer.Update(state)

    }


}
