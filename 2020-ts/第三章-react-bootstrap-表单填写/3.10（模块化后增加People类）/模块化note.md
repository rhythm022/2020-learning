### Types.tsx
交叉类型PersonRecord的定义从./Database被移入./Types.tsx
```tsx
export type PersonRecord = RecordState & IPersonState

```


### RecordState.ts
RecordState类/IRecordState接口从./Database移入专门新建的./RecordState.ts
```tsx
export interface IRecordState {
    IsActive :boolean
}

export class RecordState implements IRecordState{
    public  IsActive:boolean = true
}

```



### PersonalDetailsTableBuilder.tsx
PersonalDetailsTableBuilder类从./Database移入专门新建的./PersonalDetailsTableBuilder.tsx

```tsx
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

```



### IValidator.ts
IValidator接口从FormValidation.tsx移入专门新建的.Validators/IValidator
```tsx
export interface IValidator<T> {
    IsValid(input: T): boolean
}

```







### MinLengthValidator.ts
MinLengthValidator类从FormValidation.tsx移入专门新建的.Validators/MinLengthValidator
```tsx
export class MinLengthValidator implements IValidator<stringOrNull> {
    private minLength: number;

    constructor(minLength: number) {
        this.minLength = minLength
    }

    public IsValid(input: stringOrNull): boolean {
        if (!input)
            return false
        return input.length >= this.minLength
    }
}

```


### RegularExpressionValidator.ts
RegularExpressionValidator类从FormValidation.tsx移入专门新建的.Validators/RegularExpressionValidator
```tsx
export class RegularExpressionValidator implements IValidator<stringOrNull> {
    private regex: RegExp;

    constructor(expression: string) {
        this.regex = new RegExp(expression)
    }


    public IsValid(input: stringOrNull): boolean {
        if (!input)
            return false

        return this.regex.test(input)
    }
}

```



### Database.ts
Database类从./Database/TableBuilder.ts移入专门新建的./Database/Database.ts
```tsx
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

```
