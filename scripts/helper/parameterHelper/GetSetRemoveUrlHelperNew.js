class GetSetRemoveUrlHelper {
    async setUrl(segmentValue) {
        let url = new URL(window.location.href);
        url.pathname += '/' + segmentValue;
        history.pushState({}, '', url);
    }
    
    async getUrl(segmentValue) {
        console.log("HI")
        let url = new URL(window.location.href);
        let segments = url.pathname.split('/');
        let x = ((segments.length - 1) - 1); // -1 to ignore the first empty string from split
        console.log(x)
        await this.setUrl("XY");
        url = new URL(window.location.href);
        segments = url.pathname.split('/');
        console.log(x)
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
        let url = new URL(window.location.href);
        let params = url.pathname.split('/');
        let index = this.#constURL().indexOf(paramName);

        if (index !== -1) {
            params.splice(index + 1, 1); // +1 to ignore the first empty string from split
        } else {
            console.error("Ungültiger Parametername: " + paramName);
            return;
        }

        url.pathname = params.join('/');
        history.pushState({}, '', url.href);
    }
}

export { GetSetRemoveUrlHelper };