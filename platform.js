rad.platform = class{
    constructor(){
        this.platform = "PC";
        const ua = navigator.userAgent;
        if (ua.includes("Mobi") || ua.includes("Android") || ua.includes("iPhone") || ua.includes("BlackBerry")) {
            this.platform = "Phone";
        } else if (ua.includes("iPad") || ua.includes("Tablet")) { // Check for iPad specifically, also "Tablet" if available
            this.platform = "Tablet";
        }
        console.log(ua);
    }
}