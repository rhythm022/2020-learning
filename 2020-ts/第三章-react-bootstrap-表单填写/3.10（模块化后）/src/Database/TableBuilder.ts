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


















