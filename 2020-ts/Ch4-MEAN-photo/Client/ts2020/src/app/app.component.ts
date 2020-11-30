import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {AddImageService} from './Services/add-image.service';
import {FileuploadComponent} from './components/fileupload/fileupload.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private dialogRef:MatDialogRef<FileuploadComponent> | null = null
  constructor(
    private dialog:MatDialog,
    private addImage:AddImageService
  ) {
  }

  // 组件：操作区和信息区的集合。
  // - 操作区和信息区过多（无法容纳在一个界面）就需要调用专门组件/子组件。调用子组件仅仅意味着在另一个地方收集和传递信息。
  // ★★★ 组件的职责只有收集和传递信息，传递给HTML/组件/service
  // ★★★ 操作一定是组件和service的合作：组件负责收集和传递信息、调用子组件，其他全由service负责。
  // 比如这里，由专门组件收集信息，传递给父组件，父组件传递给service处理。为什么专门组件不直接传递给service？？
  // - 因为专门组件只传递信息，而不指定更具体传给谁，这样可以保持专门组件的可复用性
  //:=> addImage.add
  public ImportImage():void{
    const config = new MatDialogConfig()
    config.disableClose = true
    config.autoFocus = true
    config.width = '500px'
    // ★★★ 假如这个dialog组件是我自己的编码，要在界面上打开这个组件，这种方式是会比通过visible变量触发，更好的方式
    this.dialogRef = this.dialog.open(FileuploadComponent,config)

    // dialog作为子组件职责应单一，所以由本父组件:=>addImage.add的逻辑
    this.dialogRef.afterClosed().subscribe(r=>{
      if(r){

        // 我不管，反正有新增，剩下的不是我的职责
        this.addImage.add(r)
      }
    })

  }
}





































