import { SessionData } from "./SessionData";

// POST_URL
const POST_URL: string = "http://localhost:8087";

// SessionInfo
export class SessionInfo {
    // data
    public sessionID: string = "";
    public sessionData: SessionData = new SessionData();
    // events
    public onload: (this: SessionInfo, sessionInfo: SessionInfo) => any = null;

    // saveToJsonString
    public saveToJsonString(): string {
        // generate request data
        let data = {
            session_id: this.sessionID,
            core_logs: {},
            core_images: {},
            crop_images: {},
            repr_images: this.sessionData.reprImageNames.slice(),
            generations: this.sessionData.generationInfos.map(generationInfo => {
                return {
                    texure_ids: generationInfo.textureIDList.map(textureID => {
                        return {
                            name: textureID.name,
                            color: textureID.color,
                            man_images: textureID.manImageNames.slice(),
                            inf_images: textureID.infImageNames.slice()
                        }
                    })
                }
            })
        };
        // safe images
        this.sessionData.coreLogs.saveToJson(data.core_logs);
        this.sessionData.coreImageList.saveToJson(data.core_images);
        this.sessionData.cropImageList.saveToJson(data.crop_images);
        return JSON.stringify(data);
    }

    // send
    public send(): Promise<SessionInfo> {
        return new Promise<SessionInfo>((resolve, reject) => {
            // create http request
            let url = POST_URL + "/texml_v3";
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = event => { if (xhr.readyState === 4 && xhr.status === 200) resolve(this); };
            xhr.onerror = event => reject(this);
            xhr.send(this.saveToJsonString());
        })
    }
}