import { SiteController } from "../SiteController.js";
import { GetSetRemoveSessionStorageHelper } from "../../../../helper/storageHelper/clientStorage/GetSetRemoveSessionStorageHelper.js";
import { selectDomElement } from "../../../../utils/selectDomElement.js";

class NewTextController extends SiteController {
    constructor() {
        super();
        this.sessionValue = new GetSetRemoveSessionStorageHelper();
        //paths
        let pathToPacks = "data/packs/"; 
        this.pathToText = pathToPacks + "texts/%lang%/%path%/%name%";

        //names
        this.langName = "lang:"
        this.parameterName = "text:";
        
        //paramete
        this.name = "%name%";
        this.num = "%num%";
        this.endMarker = "_$_++";
        this.startMarker = "++_$_";

        let parameterName = this.parameterName;
        let startMarker = this.startMarker;
        let endMarker = this.endMarker;
        let name = this.name;
        let num = this.num;

        this.placeholder = startMarker + parameterName + name  + endMarker;
        this.newPlaceholder = startMarker + parameterName + name + num + endMarker;

        
    }
        async getSet() {
            let indexEntry = "start";
            let a = await this.getIndexEntry(indexEntry);
            console.log(a);
            
        }

        async getIndexEntry(indexEntry) {
            let a = await super.getIndexEntry(indexEntry);
            a = a.toString();
            if (a.includes(".html") ) {
                return indexEntry;
            } else {
                return console.error(null);
            }
        }
        //async set()
        async getPlaceholder() {
            let placeholder = this.placeholder;
            const classSet = new Set();
    
            document.querySelectorAll('*').forEach(element => {
                element.classList.forEach(className => {
                    if (className.includes(this.startMarker) && className.includes(this.endMarker)) {
                        classSet.add(`.${className}`);
                    }
                });
            });
    
            let listOfPlaceholders = Array.from(classSet);
    
            console.log(listOfPlaceholders);
            return listOfPlaceholders;
        }
}

export { NewTextController };
