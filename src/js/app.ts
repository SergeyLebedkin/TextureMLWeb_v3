import { CoreLogs } from "./TextureML/Types/CoreLogs";
import { SessionData } from "./TextureML/Types/SessionData";
import { OverlayLog } from "./TextureML/Components/OverlayLog";
import { ImageInfoListViewer } from "./TextureML/Components/ImageInfoListViewer";
import { ColorMapType } from "./TextureML/Types/ColorMapType";
import { SessionInfo } from "./TextureML/Types/SessionInfo";
import { GenerationInfo } from "./TextureML/Types/GenerationInfo";
import { TextureID } from "./TextureML/Types/TextureID";

// TextureMLApp
export class TextureMLApp {
    // elements - top panel
    private buttonLoadCoreLogs: HTMLButtonElement = null;
    private buttonLoadCoreImages: HTMLButtonElement = null;
    private buttonSubmitTextures: HTMLButtonElement = null;
    private inputSessionID: HTMLInputElement = null;
    // elements - left panel
    private divCore: HTMLDivElement = null;
    private divCorePreview: HTMLDivElement = null;
    private divCrop: HTMLDivElement = null;
    private divCropPreview: HTMLDivElement = null;
    private divRepr: HTMLDivElement = null;
    private divReprPreview: HTMLDivElement = null;
    // elements - right panel
    private divTextureIDsPreview: HTMLDivElement = null;
    private buttonTextuteIDAdd: HTMLButtonElement = null;
    // elements - bottom panel
    private buttonCore: HTMLButtonElement = null;
    private buttonCrop: HTMLButtonElement = null;
    private buttonRepr: HTMLButtonElement = null;
    private buttonInfr: HTMLButtonElement = null;
    // elements - general
    private divOverlay: HTMLDivElement = null;
    private inputLoadCoreLogs: HTMLInputElement = null;
    private inputLoadCoreImages: HTMLInputElement = null;
    private inputColorMapJet: HTMLInputElement = null;
    // components
    private overlayLog: OverlayLog = null;
    private imageInfoListCoreViewer: ImageInfoListViewer = null;
    private imageInfoListCropViewer: ImageInfoListViewer = null;
    private imageInfoListReprViewer: ImageInfoListViewer = null;
    // data structures
    private sessionInfo: SessionInfo = null;

    // constructor
    constructor() {
        // get elements - top panel
        this.buttonLoadCoreLogs = document.getElementById("buttonLoadCoreLogs") as HTMLButtonElement;
        this.buttonLoadCoreImages = document.getElementById("buttonLoadCoreImages") as HTMLButtonElement;
        this.buttonSubmitTextures = document.getElementById("buttonSubmitTextures") as HTMLButtonElement;
        this.inputSessionID = document.getElementById("inputSessionID") as HTMLInputElement;
        // get elements - left panel
        this.divCore = document.getElementById("divCore") as HTMLDivElement;
        this.divCorePreview = document.getElementById("divCorePreview") as HTMLDivElement;
        this.divCrop = document.getElementById("divCrop") as HTMLDivElement;
        this.divCropPreview = document.getElementById("divCropPreview") as HTMLDivElement;
        this.divRepr = document.getElementById("divRepr") as HTMLDivElement;
        this.divReprPreview = document.getElementById("divReprPreview") as HTMLDivElement;
        // get elements - right panel
        this.divTextureIDsPreview = document.getElementById("divTextureIDsPreview") as HTMLDivElement;
        this.buttonTextuteIDAdd = document.getElementById("buttonTextuteIDAdd") as HTMLButtonElement;
        // get elements - bottom panel
        this.buttonCore = document.getElementById("buttonCore") as HTMLButtonElement;
        this.buttonCrop = document.getElementById("buttonCrop") as HTMLButtonElement;
        this.buttonRepr = document.getElementById("buttonRepr") as HTMLButtonElement;
        this.buttonInfr = document.getElementById("buttonInfr") as HTMLButtonElement;
        // get elements - general
        this.divOverlay = document.getElementById("divOverlay") as HTMLDivElement;
        this.inputLoadCoreLogs = document.getElementById("inputLoadCoreLogs") as HTMLInputElement;
        this.inputLoadCoreImages = document.getElementById("inputLoadCoreImages") as HTMLInputElement;
        this.inputColorMapJet = document.getElementById("inputColorMapJet") as HTMLInputElement;

        // setup base params
        this.divCrop.style.display = "none";
        this.divRepr.style.display = "none";

        // setup events
        this.buttonLoadCoreLogs.onclick = this.buttonLoadCoreLogsOnClick.bind(this);
        this.buttonLoadCoreImages.onclick = this.buttonLoadCoreImagesOnClick.bind(this);
        this.buttonSubmitTextures.onclick = this.buttonSubmitTexturesOnClick.bind(this);
        this.buttonCore.onclick = this.buttonCoreOnClick.bind(this);
        this.buttonCrop.onclick = this.buttonCropOnClick.bind(this);
        this.buttonRepr.onclick = this.buttonReprOnClick.bind(this);
        this.buttonInfr.onclick = this.buttonInfrOnClick.bind(this);
        this.inputColorMapJet.onclick = this.inputColorMapJetOnClick.bind(this);

        // data structures
        this.sessionInfo = new SessionInfo();
        this.sessionInfo.onloadFromServer = this.update.bind(this);
        this.sessionInfo.sessionID = Math.random().toString(36).slice(2);
        this.sessionInfo.sessionData.coreImageList.onloadImageFile = imageInfo => console.log(imageInfo);
        this.sessionInfo.sessionData.generationInfos.push(new GenerationInfo());
        this.sessionInfo.sessionData.generationInfos[0].textureIDList = [
            new TextureID("Texture_A", "#0000FF"), new TextureID("Texture_B", "#FF0000"), new TextureID("Texture_C", "#00FF00"), new TextureID("Texture_D", "#FF8800"),
            new TextureID("Texture_E", "#B0187B"), new TextureID("Texture_F", "#8B7DA3"), new TextureID("Texture_G", "#A545BB"), new TextureID("Texture_H", "#C7A248"),
            new TextureID("Texture_I", "#39F992"), new TextureID("Texture_J", "#324CF7"), new TextureID("Texture_K", "#D04D5E"), new TextureID("Texture_L", "#1E88E6"),
            new TextureID("Texture_M", "#92BFB3"), new TextureID("Texture_N", "#858D1A"), new TextureID("Texture_O", "#92E877"), new TextureID("Texture_P", "#1FDFD9"),
            new TextureID("Texture_Q", "#DD7488"), new TextureID("Texture_R", "#9DACBB"), new TextureID("Texture_S", "#934591"), new TextureID("Texture_T", "#FC9AA4"),
        ];

        // components
        this.inputSessionID.value = this.sessionInfo.sessionID;
        this.overlayLog = new OverlayLog(this.divOverlay);
        this.imageInfoListCoreViewer = new ImageInfoListViewer(this.divCorePreview, this.sessionInfo.sessionData.coreImageList);
        this.imageInfoListCropViewer = new ImageInfoListViewer(this.divCropPreview, this.sessionInfo.sessionData.cropImageList);
        this.imageInfoListReprViewer = new ImageInfoListViewer(this.divReprPreview, this.sessionInfo.sessionData.cropImageList);
        this.imageInfoListReprViewer.setIncludeList(this.sessionInfo.sessionData.reprImageNames);
    }

    // update
    private update() {
        this.imageInfoListReprViewer.setIncludeList(this.sessionInfo.sessionData.reprImageNames);
        this.imageInfoListCoreViewer.update();
        this.imageInfoListCropViewer.update();
        this.imageInfoListReprViewer.update();
    }

    // buttonLoadCoreLogsOnClick
    private buttonLoadCoreLogsOnClick(event: MouseEvent) {
        // set files type
        this.inputLoadCoreLogs.accept = ".csv";
        this.inputLoadCoreLogs.onchange = event => {
            // get selected files
            let files: Array<File> = event.currentTarget["files"];
            if (files.length !== 1) return;
            // load from file
            this.sessionInfo.sessionData.coreLogs.loadFromFile(files[0]).then(coreLogs => console.log(coreLogs));
        }
        this.inputLoadCoreLogs.click();
    }

    // buttonLoadCoreImagesOnClick
    private buttonLoadCoreImagesOnClick(event: MouseEvent) {
        // set files type
        this.inputLoadCoreImages.accept = ".png";
        this.inputLoadCoreImages.onchange = event => {
            // get selected files
            let files: Array<File> = event.currentTarget["files"];
            if (files.length === 0) return;
            // load from files
            this.overlayLog.show();
            this.overlayLog.addMessage("Loading images...");
            this.sessionInfo.sessionData.coreImageList.onloadImageFile = imageInfo => this.overlayLog.addMessage(imageInfo.name + " loaded...");
            this.sessionInfo.sessionData.coreImageList.loadFromFiles(files).then(images => {
                this.overlayLog.addMessage("Send... Waiting...");
                this.sessionInfo.send().then(sessionInfo => {
                    this.update();
                    this.overlayLog.hide();
                });
            });
        }
        this.inputLoadCoreImages.click();
    }

    // buttonSubmitTexturesOnClick
    private buttonSubmitTexturesOnClick(event: MouseEvent) {
        this.overlayLog.show();
        new Promise(() => {
            this.overlayLog.addMessage("Send...");
            this.sessionInfo.send().then(sessionInfo => {
                this.update();
                this.overlayLog.hide();
            })
        });
    }

    // buttonCoreOnClick
    private buttonCoreOnClick(event: MouseEvent) {
        this.imageInfoListCoreViewer.update();
        this.buttonCore.className = "panel-button-current";
        this.buttonCrop.className = "panel-button";
        this.buttonRepr.className = "panel-button";
        this.divCore.style.display = "flex";
        this.divCrop.style.display = "none";
        this.divRepr.style.display = "none";
    }

    // buttonCropOnClick
    private buttonCropOnClick(event: MouseEvent) {
        this.imageInfoListCropViewer.update();
        this.buttonCore.className = "panel-button";
        this.buttonCrop.className = "panel-button-current";
        this.buttonRepr.className = "panel-button";
        this.divCore.style.display = "none";
        this.divCrop.style.display = "flex"
        this.divRepr.style.display = "none";
    }

    // buttonReprOnClick
    private buttonReprOnClick(event: MouseEvent) {
        this.imageInfoListReprViewer.update();
        this.buttonCore.className = "panel-button";
        this.buttonCrop.className = "panel-button";
        this.buttonRepr.className = "panel-button-current";
        this.divCore.style.display = "none";
        this.divCrop.style.display = "none";
        this.divRepr.style.display = "flex";
    }

    // buttonInfrOnClick
    private buttonInfrOnClick(event: MouseEvent) {
    }

    // inputColorMapJetOnClick
    private inputColorMapJetOnClick(event: MouseEvent) {
        let colorMapType: ColorMapType = event.currentTarget["checked"] ? ColorMapType.JET : ColorMapType.GRAY_SCALE;
        this.imageInfoListCoreViewer.setColorMapType(colorMapType);
        this.imageInfoListCropViewer.setColorMapType(colorMapType);
        this.imageInfoListReprViewer.setColorMapType(colorMapType);
    }
}