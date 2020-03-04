// ImageInfo
export class ImageInfo {
    // file reference
    public name: string = "";
    // propertis
    public minHeight: number = 0;
    public maxHeight: number = 0;
    // canvases
    public canvasImage: HTMLCanvasElement = null;
    public canvasImageJet: HTMLCanvasElement = null;
    // events
    public onloadImageFile: (this: ImageInfo, imageInfo: ImageInfo) => any = null;
    public onloadImageBase64: (this: ImageInfo, imageInfo: ImageInfo) => any = null;

    // constructor
    constructor() {
        // canvases
        this.canvasImage = document.createElement("canvas");
        this.canvasImageJet = document.createElement("canvas");
    }

    // updateCanvasImageJet
    public updateCanvasImageJet(): void {
        // copy image to canvas jet size
        this.canvasImageJet.width = this.canvasImage.width;
        this.canvasImageJet.height = this.canvasImage.height;
        // get contexts
        let canvasImageCtx = this.canvasImage.getContext("2d") as CanvasRenderingContext2D;
        let canvasImageJetCtx = this.canvasImageJet.getContext("2d") as CanvasRenderingContext2D;
        // get contexts
        let canvasImageData = canvasImageCtx.getImageData(0, 0, this.canvasImage.width, this.canvasImage.height);

        // update image data
        for (var i = 0; i < canvasImageData.data.length; i += 4) {
            let color = grayscaleToJit(canvasImageData.data[i + 1]) as any; // get green value
            canvasImageData.data[i + 0] = color.r * 255;
            canvasImageData.data[i + 1] = color.g * 255;
            canvasImageData.data[i + 2] = color.b * 255;
            canvasImageData.data[i + 3] = 255;
        }
        canvasImageJetCtx.putImageData(canvasImageData, 0, 0);
    }

    // loadImageFromFile
    public loadImageFromFile(file: File): Promise<ImageInfo> {
        return new Promise((resolve, reject) => {
            // check for null
            if (file === null) reject(this);
            // store name
            this.name = file.name.split('.').slice(0, -1).join('.');
            this.minHeight = parseFloat(this.name.split('-')[0]);
            this.maxHeight = parseFloat(this.name.split('-')[1]);
            // read file
            var fileReader = new FileReader();
            fileReader.onload = event => {
                let image = new Image();
                // load image from file data
                image.onload = event => {
                    // copy image to canvas
                    this.canvasImage.width = image.width;
                    this.canvasImage.height = image.height;
                    let canvasImageCtx = this.canvasImage.getContext("2d") as CanvasRenderingContext2D;
                    canvasImageCtx.drawImage(image, 0, 0);
                    // update image canvas jet
                    this.updateCanvasImageJet();
                    // call event
                    this.onloadImageFile && this.onloadImageFile(this);
                    // resolve
                    resolve(this);
                }
                image.src = event.currentTarget["result"];
            }
            fileReader.readAsDataURL(file);
        });
    }
}

// clamp, just clamp
function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

// gray scale to JIT
function grayscaleToJit(value: number): {} {
    let t = ((value - 127.0) / 255.0) * 2.0;
    let result = {
        r: clamp(1.5 - Math.abs(2.0 * t - 1.0), 0, 1),
        g: clamp(1.5 - Math.abs(2.0 * t - 0.0), 0, 1),
        b: clamp(1.5 - Math.abs(2.0 * t + 1.0), 0, 1),
    };
    return result;
}