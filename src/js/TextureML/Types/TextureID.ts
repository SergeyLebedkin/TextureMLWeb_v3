// TextureID
export class TextureID {
    public name: string = "";
    public color: string = "#ff0000";
    public manImageNames: Array<string> = [];
    public infImageNames: Array<string> = [];

    // constructor
    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }
}