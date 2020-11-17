import {IPersonState} from "../State";

export interface ITableBuilder {
    WithTableName(tableName:string):ITableBuilder
    WithPrimaryField(primaryField:string):ITableBuilder
    WithIndexName(indexName:string):ITableBuilder
    WithVersion(version:number):ITableBuilder
    WithDatabase(databaseName:string):ITableBuilder
}
export interface ITable {
    TableName():string;
    IndexName():string;
    Build(database:IDBDatabase):void
    Version():number;
    Database():string;
}

export class TableBuilder implements ITableBuilder,ITable{
    private tableName:string = ''
    private primaryField:string = ''
    private indexName:string = ''
    private version:number = 1
    private database: string = ''
    WithTableName(tableName: string): ITableBuilder {
        this.tableName = tableName
        return this
    }



    WithPrimaryField(primaryField: string): ITableBuilder {
        this.primaryField = primaryField
        return this
    }

    WithIndexName(indexName: string): ITableBuilder {
        this.indexName = indexName
        return this
    }
    WithVersion(versionNumber: number): ITableBuilder {
        this.version = versionNumber
        return this
    }

    WithDatabase(databaseName: string): ITableBuilder {
        this.database = databaseName
        return this
    }
    TableName(): string {
        return this.tableName
    }

    IndexName(): string {
        return this.indexName
    }

    Version(): number {
        return this.version
    }

    Database(): string {
        return this.database
    }

    Build(database: IDBDatabase):void {
        //设置keyPath为对象存储提供一个可以搜索的字段，所以它将是一个字段的名称。当添加索引时，可以告诉对象存储哪些字段应该是可被搜索的。
        const parameters:IDBObjectStoreParameters = {
            keyPath:this.primaryField
        }

        // 建表建索引
        const objectStore = database.createObjectStore(this.tableName,parameters)
        objectStore!.createIndex(this.indexName,this.primaryField)
    }



}

export class PersonalDetailsTableBuilder {
    public Build():TableBuilder{
        const tableBuilder:TableBuilder = new TableBuilder()

        tableBuilder
            .WithDatabase('ch3')
            .WithTableName('People')
            .WithPrimaryField('PersonId')
            .WithIndexName('personId')
            .WithVersion(1)

        return tableBuilder
    }
}
export interface IRecordState {
    IsActive :boolean
}

export class RecordState implements IRecordState{
    public  IsActive:boolean = true
}

// 我们不需要修改IPersonState的实现来添加IsActive，而是使用一个交叉类型来处理这种需求
export type PersonRecord = RecordState & IPersonState


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














