import {stringOrNull} from "./Types";

export interface IPersonState{
    PersonId:string,
    FirstName:string,
    LastName:string,
    Address1:string,
    Address2:stringOrNull
    Town:string,
    Country:string,
    PhoneNumber:string,
    Postcode:string,
    DateOfBirth:stringOrNull,
}
