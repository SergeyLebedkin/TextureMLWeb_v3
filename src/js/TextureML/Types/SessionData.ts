import { CoreLogs } from "./CoreLogs";
import { ImageInfoList } from "./ImageInfoList";
import { GenerationInfo } from "./GenerationInfo"

// SessionData
export class SessionData {
    // data
    public coreLogs: CoreLogs = new CoreLogs();
    public coreImageList: ImageInfoList = new ImageInfoList();
    public cropImageList: ImageInfoList = new ImageInfoList();
    public reprImageNames: Array<string> = [];
    public generationInfos: Array<GenerationInfo> = [];
}