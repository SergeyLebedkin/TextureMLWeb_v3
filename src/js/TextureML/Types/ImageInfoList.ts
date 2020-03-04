import { ImageInfo } from "./ImageInfo";

// ImageInfoList
export class ImageInfoList {
    // data
    public imageInfos: Array<ImageInfo> = [];
    // events
    public onloadImageFile: (this: ImageInfo, imageInfo: ImageInfo) => any = null;

    // loadFromFiles
    public loadFromFiles(files: Array<File>): Promise<ImageInfo[]> {
        let promises = new Array<Promise<ImageInfo>>();
        // start load all files
        for (let file of files) {
            let imageInfo = new ImageInfo();
            imageInfo.onloadImageFile = this.onloadImageFile;
            promises.push(imageInfo.loadImageFromFile(file));
            this.imageInfos.push(imageInfo);
        }
        // wait for all files loaded
        return Promise.all(promises);
    }

    // saveToJson
    public saveToJson(parent: any) {
    }

    // loadFromJson
    public loadFromJson(json: any): void {
    }
}