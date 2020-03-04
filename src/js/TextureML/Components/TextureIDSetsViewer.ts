import { ImageInfo } from "../Types/ImageInfo"
import { TextureID } from "../Types/TextureID"
import { ColorMapType } from "../Types/ColorMapType";

// TextureIDSetsViewer
export class TextureIDSetsViewer {
    // parent
    private parent: HTMLDivElement = null;
    // base lists
    private textureIDList: Array<TextureID> = null
    private imageInfoCropsList: Array<ImageInfo> = null;
    // color map type
    public represent: boolean = false;
    private colorMapType: ColorMapType = ColorMapType.GRAY_SCALE;
    // events
    public ondropImageInfo: (this: TextureIDSetsViewer, imageInfo: ImageInfo) => any = null;
    // constructor
    constructor(parent: HTMLDivElement,
        textureIDList: Array<TextureID>,
        imageInfoCropsList: Array<ImageInfo>) {
        // parent
        this.parent = parent;
        // base lists
        this.textureIDList = textureIDList;
        this.imageInfoCropsList = imageInfoCropsList;
        // color map type
        this.represent = false;
        this.colorMapType = ColorMapType.GRAY_SCALE;
    }

    // setColorMapType
    public setColorMapType(colorMapType: ColorMapType): void {
        this.colorMapType = colorMapType;
        this.update();
    }

    // drawRegions
    public update(): void {
        // just clear
        while (this.parent.firstChild)
            this.parent.removeChild(this.parent.firstChild);

        // append texture ids columns
        for (let textureID of this.textureIDList) {
            // create column
            let divColumn = document.createElement("div");
            divColumn.className = "texture-id-column";
            divColumn.ondragover = ev => ev.preventDefault();
            divColumn.ondrop = (ev => {
                let baseName = ev.dataTransfer.getData("text");
                // find image info in lists
                let imageInfo = this.imageInfoCropsList.find(imageInfo => imageInfo.baseName === baseName);
                // update image info
                if (imageInfo) {
                    imageInfo.textureID = ev.currentTarget["textureID"];
                    this.update();
                    this.ondropImageInfo && this.ondropImageInfo(imageInfo);
                }
            }).bind(this);
            divColumn.id = "columnid_" + textureID.ID;
            divColumn["textureID"] = textureID;
            // append column
            this.parent.appendChild(divColumn);
            this.updateNamed(textureID.ID);
        }
    }

    // updateNamed
    private updateNamed(ID: string): void {
        let divColumn = document.getElementById("columnid_" + ID);
        if (divColumn) {
            // clear existing
            while (divColumn.firstChild)
                divColumn.removeChild(divColumn.firstChild);
            // find texture id
            let textureID = this.textureIDList.find(textureID => textureID.ID === ID);
            // header
            let divHeader = document.createElement("div");
            divHeader.className = "texture-id-column";
            divHeader.style.background = textureID.color;
            divHeader.style.width = "100%";
            // input
            let inputHeader = document.createElement("input");
            inputHeader.type = "text";
            inputHeader.className = "texture-id-column-header-input";
            inputHeader.style.background = textureID.color;
            inputHeader.value = textureID.ID;
            inputHeader.onchange = (event => {
                //set texture id
                let textureID = this.textureIDList.find(textureID => textureID.ID === event.currentTarget.value);
                let currentTextureID = event.currentTarget["textureID"] as TextureID;
                if (!textureID)
                    currentTextureID.ID = event.currentTarget.value;
                else
                    event.currentTarget.value = currentTextureID.ID;
            }).bind(this);
            inputHeader["textureID"] = textureID;
            divHeader.appendChild(inputHeader);
            divColumn.appendChild(divHeader);
            // images
            let divImages = document.createElement("div");
            divImages.className = "texture-id-column-images";
            // scan image info list
            for (let imageInfo of this.imageInfoCropsList) {
                if (imageInfo.textureID && (imageInfo.textureID.ID === ID))
                    this.appendImageInfoItem(divImages, imageInfo);
            }
            divColumn.appendChild(divImages);
        }
    }

    // addRegionInfoItem
    private appendImageInfoItem(node: HTMLElement, imageInfo: ImageInfo): void {
        // add div
        let div = document.createElement('div');
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.padding = "5px";

        // add label
        let filaNameLabel = document.createElement('a');
        filaNameLabel.innerText = imageInfo.baseName;
        filaNameLabel.style.fontSize = "16px";
        div.appendChild(filaNameLabel);

        // get ratio
        var ratio = imageInfo.canvasImage.width / imageInfo.canvasImage.height;
        var canvas_height = Math.min(imageInfo.canvasImage.height, 512);
        var canvas_width = canvas_height * ratio;

        // create div canvas
        var divCanvas = document.createElement('div');
        divCanvas.style.textAlign = "center";

        // create canvas
        var canvas = document.createElement('canvas');
        canvas.draggable = true;
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        canvas.style.cursor = "pointer";
        canvas.style.border = "3px solid " + imageInfo.textureID.color;
        canvas["imageInfo"] = imageInfo;
        canvas.ondragstart = ev => ev.dataTransfer.setData("text", ev.target["imageInfo"].baseName);

        // get context and draw original image
        var ctx = canvas.getContext('2d');
        // draw region original
        if (this.colorMapType === ColorMapType.GRAY_SCALE)
            ctx.drawImage(imageInfo.canvasImage,
                0, 0, canvas.width, canvas.height,
                0, 0, canvas.width, canvas.height);
        // draw region jet
        if (this.colorMapType === ColorMapType.JET)
            ctx.drawImage(imageInfo.canvasImageJet,
                0, 0, canvas.width, canvas.height,
                0, 0, canvas.width, canvas.height);

        divCanvas.appendChild(canvas);
        div.appendChild(divCanvas);

        // append new canvas
        node.appendChild(div);
    }
}