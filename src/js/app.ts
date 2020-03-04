import { CoreLogs } from "./TextureML/Types/CoreLogs";
import { SessionData } from "./TextureML/Types/SessionData";

// TextureMLApp
export class TextureMLApp {
    // elements - top panel
    private buttonLoadCoreLogs: HTMLButtonElement = null;
    private buttonLoadCoreImages: HTMLButtonElement = null;
    private buttonSubmitTextures: HTMLButtonElement = null;
    // elements - left panel
    private divCore: HTMLDivElement = null;
    private divCorePreview: HTMLDivElement = null;
    private divCrops: HTMLDivElement = null;
    private divCropsPreview: HTMLDivElement = null;
    private divReprs: HTMLDivElement = null;
    private divReprsPreview: HTMLDivElement = null;
    // elements - right panel
    private divTextureIDsPreview: HTMLDivElement = null;
    private buttonTextuteIDAdd: HTMLButtonElement = null;
    // elements - bottom panel
    private buttonCore: HTMLButtonElement = null;
    private buttonCrops: HTMLButtonElement = null;
    private buttonRepresentativeCrops: HTMLButtonElement = null;
    private buttonTextureMLInference: HTMLButtonElement = null;
    // elements - general
    private divOverlay: HTMLDivElement = null;
    private inputLoadCoreLogs: HTMLInputElement = null;
    private inputLoadCoreImages: HTMLInputElement = null;
    private inputColorMapJet: HTMLInputElement = null;
    // data structures
    private sessionData: SessionData = null;

    // constructor
    constructor() {
        // get elements - top panel
        this.buttonLoadCoreLogs = document.getElementById("buttonLoadCoreLogs") as HTMLButtonElement;
        this.buttonLoadCoreImages = document.getElementById("buttonLoadCoreImages") as HTMLButtonElement;
        this.buttonSubmitTextures = document.getElementById("buttonSubmitTextures") as HTMLButtonElement;
        // get elements - left panel
        this.divCore = document.getElementById("divCore") as HTMLDivElement;
        this.divCorePreview = document.getElementById("divCorePreview") as HTMLDivElement;
        this.divCrops = document.getElementById("divCrops") as HTMLDivElement;
        this.divCropsPreview = document.getElementById("divCropsPreview") as HTMLDivElement;
        this.divReprs = document.getElementById("divReprs") as HTMLDivElement;
        this.divReprsPreview = document.getElementById("divReprsPreview") as HTMLDivElement;
        // get elements - right panel
        this.divTextureIDsPreview = document.getElementById("divTextureIDsPreview") as HTMLDivElement;
        this.buttonTextuteIDAdd = document.getElementById("buttonTextuteIDAdd") as HTMLButtonElement;
        // get elements - bottom panel
        this.buttonCore = document.getElementById("buttonCore") as HTMLButtonElement;
        this.buttonCrops = document.getElementById("buttonCrops") as HTMLButtonElement;
        this.buttonRepresentativeCrops = document.getElementById("buttonRepresentativeCrops") as HTMLButtonElement;
        this.buttonTextureMLInference = document.getElementById("buttonTextureMLInference") as HTMLButtonElement;
        // get elements - general
        this.divOverlay = document.getElementById("divOverlay") as HTMLDivElement;
        this.inputLoadCoreLogs = document.getElementById("inputLoadCoreLogs") as HTMLInputElement;
        this.inputLoadCoreImages = document.getElementById("inputLoadCoreImages") as HTMLInputElement;
        this.inputColorMapJet = document.getElementById("inputColorMapJet") as HTMLInputElement;

        // setup events
        this.buttonLoadCoreLogs.onclick = this.buttonLoadCoreLogsOnClick.bind(this);
        this.buttonLoadCoreImages.onclick = this.buttonLoadCoreImagesOnClick.bind(this);

        // data structures
        this.sessionData = new SessionData();
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
            this.sessionData.coreLogs.loadFromFile(files[0]);
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
            this.sessionData.coreImageList.loadFromFiles(files);
        }
        this.inputLoadCoreImages.click();
    }
}