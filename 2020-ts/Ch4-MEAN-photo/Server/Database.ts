import mongoose,{Schema} from "mongoose";



// 对于这个应用程序，我们将在数据库的Image字段中保存图片，这样可以简化要创建的基础设施。商业应用程序将选择在数据库之外单独存储实际的图片，而让数据库的Image字段指向图片的物理位置。Web应用程序必须能够访问图片的存储位置，并且必须有策略确保安全备份图片以及方便地恢复图片。
// 架构告诉我们数据是什么样子的，而模型告诉我们如何操纵数据库中的数据
export const PictureSchema = new Schema({
    Image:String,
    Name:String,
    Description:String,
    Tags:String,
})

export const Picture = mongoose.model('picture',PictureSchema)

export class Mongo{
    constructor(
        private url:string =  "mongodb://localhost:27017/atp_chapter_04"
    ) {
    }

    public Connect():void{
        mongoose.connect(this.url,(e)=>{
            if(e){
                console.log(`Unable to connect ` + e)
            }else{
                console.log(`Connected to the database`)

            }
        })
    }



}


















