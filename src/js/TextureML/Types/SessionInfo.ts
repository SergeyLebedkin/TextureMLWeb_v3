import { SessionData } from "./SessionData";
import { GenerationInfo } from "./GenerationInfo";
import { TextureID } from "./TextureID";

// POST_URL
const POST_URL: string = "http://localhost:8087";

// SessionInfo
export class SessionInfo {
    // data
    public sessionID: string = "";
    public sessionData: SessionData = new SessionData();
    // events
    public onload: (this: SessionInfo, sessionInfo: SessionInfo) => any = null;
    public onloadFromServer: (this: SessionInfo, sessionInfo: SessionInfo) => any = null;

    // send
    public send(): Promise<SessionInfo> {
        return new Promise<SessionInfo>((resolve, reject) => {
            // create http request
            let url = POST_URL + "/texml_v3";
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = event => { this.loadFromJsonString(xhr.responseText); resolve(this); };
            xhr.onerror = event => { reject(this); };
            xhr.send(this.saveToJsonString());
        })
    }

    // saveToJsonString
    public saveToJsonString(): string {
        // generate request data
        let data = {
            session_id: this.sessionID,
            core_logs: {
                depth: this.sessionData.coreLogs.depth.slice(),
                density: this.sessionData.coreLogs.density.slice(),
                PE: this.sessionData.coreLogs.PE.slice(),
                zeff: this.sessionData.coreLogs.zeff.slice(),
            },
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
        this.sessionData.coreImageList.saveToJson(data.core_images);
        this.sessionData.cropImageList.saveToJson(data.crop_images);
        return JSON.stringify(data);
    }

    // loadFromJsonString
    public loadFromJsonString(json: string) {
        let data = JSON.parse(json);
        this.sessionID = data.session_id;
        // core logs
        this.sessionData.coreLogs.depth = data.core_logs.depth.slice();
        this.sessionData.coreLogs.density = data.core_logs.density.slice();
        this.sessionData.coreLogs.PE = data.core_logs.PE.slice();
        this.sessionData.coreLogs.zeff = data.core_logs.zeff.slice();
        // load images
        this.sessionData.coreImageList.loadFromJson(data.core_images).then(() => this.onloadFromServer && this.onloadFromServer(this));
        this.sessionData.cropImageList.loadFromJson(data.crop_images).then(() => this.onloadFromServer && this.onloadFromServer(this));
        this.sessionData.reprImageNames = data.repr_images.slice();
        // generation info
        if (data.generations) {
            this.sessionData.generationInfos = data.generations.map(generation => {
                let generationInfo = new GenerationInfo();
                if (generation.texure_ids) {
                    generationInfo.textureIDList = generation.texure_ids.map(texture_id => {
                        let textureID = new TextureID(texture_id.name, texture_id.color);
                        textureID.manImageNames = texture_id.man_images.slice();
                        textureID.infImageNames = texture_id.inf_images.slice();
                        return textureID;
                    })
                }
                return generationInfo;
            })
        }
    }
}