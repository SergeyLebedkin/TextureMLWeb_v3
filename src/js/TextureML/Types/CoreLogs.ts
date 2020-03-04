// CoreLogs
export class CoreLogs {
    // data
    public depth: Array<number> = [];
    public density: Array<number> = [];
    public PE: Array<number> = [];
    public zeff: Array<number> = [];
    // events
    public onloadFileData: (this: CoreLogs, dataLogs: CoreLogs) => any = null;

    // clear
    public clear(): void {
        // clear data
        this.depth = [];
        this.density = [];
        this.PE = [];
        this.zeff = [];
    }

    // loadFromFile
    public loadFromFile(file: File): void {
        // check for null
        if (file === null) return;
        // read file
        var fileReader = new FileReader();
        fileReader.onload = event => {
            this.loadFromCSV(event.currentTarget["result"]);
            this.onloadFileData && this.onloadFileData(this);
        }
        fileReader.readAsText(file);
    }

    // loadFromCSV
    public loadFromCSV(csv: string): void {
        // clear
        this.clear();
        // get strings list
        let strings = csv.split('\r\n');
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