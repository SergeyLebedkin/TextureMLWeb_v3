import { SessionData } from "./SessionData";

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
            sessionId: this.sessionID,
            coreLogs: {},
            coreImageList: {},
            cropImageList: {},
            reprImageNames: this.sessionData.reprImageNames
        };
        this.sessionData.coreLogs.saveToJson(data.coreLogs);
        this.sessionData.coreImageList.saveToJson(data.coreImageList);
        this.sessionData.cropImageList.saveToJson(data.cropImageList);
        return JSON.stringify(data);
    }

    // send
    public send(): Promise<SessionInfo> {
        return new Promise<SessionInfo>((resolve, reject) => {
            // create http request
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = event => { if (xhr.readyState === 4 && xhr.status === 200) resolve(this); };
            xhr.onerror = event => reject(this);
            xhr.send(this.saveToJsonString());
        })
    }
}