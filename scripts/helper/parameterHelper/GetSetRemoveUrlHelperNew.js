class GetSetRemoveUrlHelper {
    async setUrl(segmentValue) {
        try {
            let position = await this.getSegmentPosition(segmentValue);
            position;
        } catch (error) {
            let url = new URL(window.location.href);
            url.pathname += '/' + segmentValue;
            history.pushState({}, '', url);
        }
    }
    
    async getSegmentPosition(segmentValue) {
        let wantedValuesOfAdress = await this.#filterUrl();
        let getPosOfAdress = wantedValuesOfAdress.indexOf(segmentValue);
    
        if (getPosOfAdress === (1 - 2)) {
            throw new Error(null);
        } else {
            return getPosOfAdress;
        }
    }    

    async getUrlValueName(position) {
        let wantedValuesOfAdress = await this.#filterUrl();
        if (wantedValuesOfAdress == "") {
            throw new Error("No content");
        } else {
            return wantedValuesOfAdress[position]
        }
    }

    async #filterUrl() {
        let adress = window.location.href;
        let wants = adress.split("/");
        console.log(wants);
        for (let i = 0; i < wants.length; i++) {
            if (wants[i].includes(".") || wants[i].includes(":") || wants[i] === "") {
                wants.splice(i, 1);
                i--;
            }
        }
        return wants;
    }

    
    
    

    async getUrl(name, segmentValue){
        let want;
        let selection;
        if (name === "lang" || name === "site"){
            switch (name) {
                case ("lang"):
                    selection = 0;
                break;
            
                case("site"):
                    selection = 1;
                break;
            }
            
            let values = await this.#filterUrl();
            let segPos = values.indexOf(segmentValue);
            if (segPos !== -1) {
                want = await this.getUrlValueName(segPos);
            } else {
                throw new Error(segmentValue + " not found in URL");
            }
    
            console.log(want)
            return want;
        } else {
    
        }
        
    }
    
    
}


export { GetSetRemoveUrlHelper };