import {Component, OnInit} from '@angular/core';
import {IPictureModel} from '../../types';
import {MatDialogRef} from '@angular/material';
import {FilePreviewServiceService} from '../../Services/file-preview-service.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {
  protected message:any;
  protected imageSource: IPictureModel | null;
  protected description:string;
  protected tags:string

  constructor(
    private dialog:MatDialogRef<FileuploadComponent>,
    private preview:FilePreviewServiceService
  ) {
  }

  ngOnInit() {
  }

  // 组件的职能：触发service/触发DOM
  public OnImageSelected(files:any):void{
    this.preview.Preview(files).then(r=>{
      this.imageSource = r
    }).catch(r=>{
      this.message = r
    })
  }

  // 组件的职能：触发其他组件
  public Save():void{
    this.imageSource.Description = this.description
    this.imageSource.Tags = this.tags

    this.dialog.close(this.imageSource)
  }

}
