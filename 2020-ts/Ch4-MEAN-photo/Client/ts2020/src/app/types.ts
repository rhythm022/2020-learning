export interface IPictureModel {
  Image: string;
  Name: string;
  Description: string;
  Tags: string;
}


export class PictureModel implements IPictureModel {
  Image: string;
  Name: string;
  Description: string;
  Tags: string;
}
