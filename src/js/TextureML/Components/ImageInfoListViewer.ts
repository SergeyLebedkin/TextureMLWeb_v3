import { ImageInfo } from "../Types/ImageInfo"
import { ImageInfoList } from "../Types/ImageInfoList"
import { ColorMapType } from "../Types/ColorMapType";

// ImageInfoListViewer
export class ImageInfoListViewer {
    // fields
    private parent: HTMLDivElement = null;
    private imageInfoList: ImageInfoList = null;
    // scale
    public scale: number = 1.0;
    public dragable: boolean = false;
    private includeList: Array<string> = null;
    // color map type
    private colorMapType: ColorMapType = ColorMapType.GRAY_SCALE;
    // events
    public onclickImageInfo: (this: ImageInfoListViewer, imageInfo: ImageInfo) => any = null;
    public ondropImageInfo: (this: ImageInfoListViewer, imageInfo: ImageInfo) => any = null;
    // constructor 
    constructor(parent: HTMLDivElement, imageInfoList: ImageInfoList) {
        // set fields
        this.parent = parent;
        this.imageInfoList = imageInfoList;
        this.update();
    }

    // setIncludeList
    public setIncludeList(includeList: Array<string>) {
        if (this.includeList !== includeList) {
            this.includeList = includeList;
            this.update();
        }
    }

    // setColorMapType
    // NOTE: This is async function
    public setColorMapType(colorMapType: ColorMapType) {
        if (this.colorMapType !== colorMapType) {
            this.colorMapType = colorMapType;
            this.update();
        }
    }

    // setScale
    public setScale(scale: number): void {
        if (this.scale !== scale) {
            this.scale = scale;
            this.update();
        }
    }

    // redraw
    public update() {
        // just clear
        while (this.parent.firstChild)
            this.parent.removeChild(this.parent.firstChild);

        // add all images to preview
        for (let imageInfo of this.imageInfoList.imageInfos) {
            if (this.includeList) {
                if (this.includeList.indexOf(imageInfo.name) >= 0)
                    this.appendImageItem(imageInfo);
            } else this.appendImageItem(imageInfo);
        }
    }

    // appendImageItem
    private appendImageItem(imageInfo: ImageInfo) {
        // add div
        var div = document.createElement('div');
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.padding = "5px";
        div.style.textAlign = "center";

        // get ratio
        var ratio = imageInfo.canvasImage.width / imageInfo.canvasImage.height;
        var canvas_height = Math.min(imageInfo.canvasImage.height, 512) * this.scale;
        var canvas_width = canvas_height * ratio;

        // create div canvas
        var divCanvas = document.createElement('div');
        divCanvas.style.textAlign = "center";

        // create canvas
        var canvas = document.createElement('canvas');
        canvas.draggable = this.dragable;
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        //canvas.style.cursor = "pointer";
        canvas["imageInfo"] = imageInfo;
        canvas.onclick = (event) => this.onclickImageInfo && this.onclickImageInfo(event.target["imageInfo"]);
        canvas.ondragstart = ev => ev.dataTransfer.setData("text", ev.target["imageInfo"].baseName);
        // get context
        var ctx = canvas.getContext('2d');
        // draw image original
        if (this.colorMapType === ColorMapType.GRAY_SCALE)
            ctx.drawImage(imageInfo.canvasImage,
                0, 0, imageInfo.canvasImage.width, imageInfo.canvasImage.height,
                0, 0, canvas.width, canvas.height);
        // draw image jet
        if (this.colorMapType === ColorMapType.JET)
            ctx.drawImage(imageInfo.canvasImageJet,
                0, 0, imageInfo.canvasImage.width, imageInfo.canvasImage.height,
                0, 0, canvas.width, canvas.height);

        divCanvas.appendChild(canvas);
        div.appendChild(divCanvas);

        // add label
        var fileNameLabel = document.createElement("label");
        fileNameLabel.innerText = imageInfo.name;
        //fileNameLabel.style.color = "white";
        fileNameLabel.style.fontSize = "16px";
        fileNameLabel.style.textAlign = "center";
        div.appendChild(fileNameLabel);

        // append new canvas
        this.parent.appendChild(div);
    }
}