class GetSetRemoveUrlHelper {
    async setUrl(segmentValue) {
        let url = new URL(window.location.href);
        url.pathname += '/' + segmentValue;
        history.pushState({}, '', url);
    }
    
    async getUrlCoating(segmentValue) {
        let url = new URL(window.location.href);
        let segments = url.pathname.split('/');
        segments = segments.slice(1); // remove the first empty string from split
        let segmentInfo = [];
        for (let i = 0; i < segments.length; i++) {
            if (segments[i] !== 'index.html' && segments[i] !== url.hostname) {
                if (segments[i] === segmentValue) {
                    segmentInfo.push("Segment " + (i+1) + ": " + segments[i] + " (found)");
                } else {
                    segmentInfo.push("Segment " + (i+1) + ": " + segments[i]);
                }
            }
        }
        return segmentInfo;
    }

    async getUrlValueName(position) {
        let url = new URL(window.location.href);
        let segments = url.pathname.split('/');
        segments = segments.slice(1); // remove the first empty string from split
        let adjustedSegments = segments.filter(segment => segment !== 'index.html' && segment !== url.hostname);
        if (position >= 1 && position <= adjustedSegments.length) {
            return adjustedSegments[position - 1];
        } else {
            return "Position out of range";
        }
    }

    async getUrl(name){
        let want;
        switch (name) {
            case ("lang"):
            want = await this.getUrlValueName(1);
              
            break;
        
            case("site"):
            break;

            default:
            break;
        }
    }
    
    
    

    #constURL(varName) {
        switch (varName) {
            case ("lang"):
            break;
            case ("site"):
            break;
            default:
            break;
        }
    }

    async removeUrl(paramName) {
    }
}


export { GetSetRemoveUrlHelper };