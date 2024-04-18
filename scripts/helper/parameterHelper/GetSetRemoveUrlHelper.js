class GetSetRemoveUrlHelper {
    async set(value) {
        try {
            await this.#getSegmentPosition(value);
        } catch (error) {
            let url = new URL(window.location.href);
            let separator = url.search ? '/' : '?';
            url.search += separator + value;
            history.pushState({}, '', url);
        }
        
    }
    async overwrite(position, newValue) {
        let url = new URL(window.location.href);

        let oldValue;
        try {
            oldValue = await this.#getSegmentPosition(position);
        } catch (error) {
        }
        if (oldValue !== undefined) {
            let arrayOfEntrys = await this.#arrayFromURL();
            arrayOfEntrys[position] = newValue;
            let newSegments = arrayOfEntrys.join("/");
            await this.remove();

            await this.set(newSegments)
        }
    }
    async remove() {
        let url = new URL(window.location.href);
        url.search = '';
        history.pushState({}, '', url);
    }
    

    async #getSegmentPosition(value) {
        let arrayOfEntrys = await this.#arrayFromURL();

        let position = arrayOfEntrys.indexOf(value);
        return position;
    }
    async #getvalue(position) {
        let arrayOfEntrys = await this.#arrayFromURL();
        let value = arrayOfEntrys[position];
        return value;
    }
    async #arrayFromURL() {
        let adress = window.location.href;
        if (adress.includes('?')) {
            let parts = adress.split('?'); let segments = parts[1];
            let segmentArray;
            if (segments.includes('/')){
                segmentArray = segments.split("/");
                return segmentArray;
            } else {
                segmentArray = [segments];
                return segmentArray;
            }
        }
    }

    async get(value){
        let want;
            if (isNaN(value)){
                want = await this.#getSegmentPosition(value);
            } else {
                want = await this.#getvalue(value);
            }
        return want;
    }
    
    
}


export { GetSetRemoveUrlHelper };