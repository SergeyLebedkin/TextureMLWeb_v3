import { SessionData } from "./SessionData";

// SessionInfo
export class SessionInfo {
    // data
    public sessionID: string = "";
    public sessionData: SessionData = new SessionData();
    // events
    public onload: (this: SessionInfo, sessionInfo: SessionInfo) => any = null;

    // send
    public send(): Promise<SessionInfo> {
        return new Promise<SessionInfo>((resolve, reject) => {
            // generate request data
            let dataJSON = {
                sessionId: this.sessionID,
                coreLogs: {},
                coreImageList: {},
                cropImageList: {},
                reprImageNames: this.sessionData.reprImageNames
            };
            this.sessionData.coreLogs.saveToJson(dataJSON.coreLogs);
            this.sessionData.coreImageList.saveToJson(dataJSON.coreImageList);
            this.sessionData.cropImageList.saveToJson(dataJSON.cropImageList);
            console.log(JSON.stringify(dataJSON));
            
            /*
            gImageInfoList.forEach(imageInfo => dataJSON.payload.images[imageInfo.fileRef.name] = imageInfo.canvasImage.toDataURL().replace("data:image/png;base64,", ""));
            // create http request
            let url = POST_URL + "/texml_v3";
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = event => {
                if (xhr.readyState === 4 && xhr.status === 200)
                    resolve(xhr.responseText);
            }
            xhr.onerror = event => reject(xhr.statusText);
            xhr.send(JSON.stringify(dataJSON));
            // log message
            gOverlayLog.addMessage(`Images sended to ${POST_URL} ...`);
            */
        })
    }
}