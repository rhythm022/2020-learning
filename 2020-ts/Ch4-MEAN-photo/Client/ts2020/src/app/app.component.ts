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
  title = 'ts2020';
  private dialogRef:MatDialogRef<FileuploadComponent> | null = null
  constructor(
    private dialog:MatDialog,
    private addImage:AddImageService
  ) {
  }

  public ImportImage():void{
    const config = new MatDialogConfig()
    config.disableClose = true
    config.autoFocus = true
    config.width = '500px'

    this.dialogRef = this.dialog.open(FileuploadComponent,config)

    this.dialogRef.afterClosed().subscribe(r=>{
      if(r){
        this.addImage.add(r)
      }
    })

  }
}





































