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

  // 本组件的职能：事前收集files，事后反馈imageSource、message，事中由preview.Preview处理
  public OnImageSelected(files:any):void{
    this.preview.Preview(files).then(r=>{
      this.imageSource = r
    }).catch(r=>{
      this.message = r
    })
  }

  // ★★★ 组件的职责只有收集和反馈原始信息，反馈给界面/父组件/service
  //
  public Save():void{
    this.imageSource.Description = this.description
    this.imageSource.Tags = this.tags

    this.dialog.close(this.imageSource)
  }

}
