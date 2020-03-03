// CoreLogs
export class CoreLogs {
    // file
    public fileRef: File = null;
    // data
    public depth: Array<number> = [];
    public density: Array<number> = [];
    public PE: Array<number> = [];
    public zeff: Array<number> = [];
    // events
    public onloadFileData: (this: CoreLogs, dataLogs: CoreLogs) => any = null;

    // loadFromFile
    public loadFromFile(file: File): void {
        // check for null
        if (file === null) return;
        // store name
        this.fileRef = file;
        // read file
        var fileReader = new FileReader();
        fileReader.onload = event => {
            this.loadFromCSV(event.currentTarget["result"]);
            this.onloadFileData && this.onloadFileData(this);
        }
        fileReader.readAsText(this.fileRef);
    }

    // loadFromFile
    public loadFromCSV(csv: string): void {
        // get strings list
        let strings: Array<string> = csv.split('\r\n');
        // parse lines
        for (let i = 1; i < strings.length; i++) {
            let values = strings[i].split(",");
            // parse values
            if (values.length >= 4) {
                this.depth.push(parseFloat(values[0]));
                this.density.push(parseFloat(values[1]));
                this.PE.push(parseFloat(values[2]));
                this.zeff.push(parseFloat(values[3]));
            }
        }
    }
}