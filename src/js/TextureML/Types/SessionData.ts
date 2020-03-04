import { CoreLogs } from "./CoreLogs";
import { ImageInfoList } from "./ImageInfoList";
import { Inference } from "./Inference";

// SessionData
export class SessionData {
    // data
    public coreLogs: CoreLogs = new CoreLogs();
    public coreImageList: ImageInfoList = new ImageInfoList();
    public cropImageList: ImageInfoList = new ImageInfoList();
    public reprImageNames: Array<string> = [];
    public inferenceList: Array<Inference> = new Array<Inference>();

    // saveToJson
    public saveToJson(): any {
    }

    // loadFromJson
    public loadFromJson(json: string): void {
    }
}