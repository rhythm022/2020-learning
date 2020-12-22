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

  // 界面：操作区和信息区的集合。
  // ★★★ 组件的职责是触发service触发DOM。
  // 操作的背后就是service的执行和DOM的刷新。
  // 组件把信息交给父组件，父组件触发service，为什么组件不直接触发service？？
  // --- 答：这里组件只传递信息，而不指定更具体传给谁，这样的选择可以保持组件的可复用性
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

        // 触发service
        this.addImage.add(r)
      }
    })

  }
}





































