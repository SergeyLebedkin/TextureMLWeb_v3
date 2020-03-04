import { CoreLogs } from "./CoreLogs";
import { ImageInfoList } from "./ImageInfoList";
import { TextureIDList } from "./TextureIDList";

// SessionData
export class SessionData {
    // data
    public coreLogs: CoreLogs = new CoreLogs();
    public coreImageList: ImageInfoList = new ImageInfoList();
    public cropImageList: ImageInfoList = new ImageInfoList();
    public textureIDList: TextureIDList = new TextureIDList();
    public reprImageNames: Array<string> = [];
}