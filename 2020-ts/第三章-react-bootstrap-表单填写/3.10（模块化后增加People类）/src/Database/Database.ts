import {PersonRecord} from "../Types";
import {ITable} from "./TableBuilder";

export class Database<T extends PersonRecord> {
    private readonly indexDb:IDBFactory
    private database:IDBDatabase | null = null
    private readonly table:ITable

    constructor(table:ITable) {
        this.indexDb = window.indexedDB;
        this.table = table

        this.OpenDatabase()
    }

    private OpenDatabase():void{
        // 数据库，在table类中指定table的数据库
        // 在Database类中建立数据库
        const open = this.indexDb.open(this.table.Database(),this.table.Version())


        open.onsuccess = (e:any)=>{
            this.database = e.target.result
        }

        open.onupgradeneeded = (e:any)=>{
            this.database = e.target.result;

            this.UpgradeDatabase(e.target.result)
        }
    }

    //建表 === 升级数据库
    private UpgradeDatabase(database:IDBDatabase){
        this.table.Build(database)
    }

    // 在Database类中获取table
    private GetObjectStore():IDBObjectStore | null{
        try {
            const transaction:IDBTransaction = this.database!.transaction(this.table.TableName(),"readwrite")
            const dbStore:IDBObjectStore = transaction.objectStore(this.table.TableName())

            return dbStore
        }catch (e) {
            return null
        }
    }
    public Create(state:T):void{
        const dbStore = this.GetObjectStore()

        dbStore!.add(state)
    }

    public Read():Promise<T[]>{
        return new Promise((resolve) => {
            const dbStore = this.GetObjectStore()
            const items:T[] = new Array<T>()
            const request :IDBRequest = dbStore!.openCursor();
            request.onsuccess = (e:any) =>{
                const cursor:IDBCursorWithValue = e.target.result

                if(cursor){
                    const result:T = cursor.value;
                    if(result.IsActive)
                        items.push(result)

                    cursor.continue()
                }else{
                    resolve(items)
                }
            }
        })
    }

    public Update(state:T):Promise<void>{
        return new Promise((resolve)=>{
            const dbStore = this.GetObjectStore()
            const innerRequest:IDBRequest = dbStore!.put(state)
            innerRequest.onsuccess = () =>{
                resolve()
            }
        })
    }

    public Delete(idx:number | string):Promise<void>{
        return new Promise((resolve)=>{
            const dbStore = this.GetObjectStore()
            const innerRequest:IDBRequest = dbStore!.delete(idx.toString())
            innerRequest.onsuccess = () =>{
                resolve()
            }
        })
    }
}
