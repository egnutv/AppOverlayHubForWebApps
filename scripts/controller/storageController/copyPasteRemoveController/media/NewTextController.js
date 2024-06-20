// Angenommen, dass sich Ihre aktuelle Datei im Verzeichnis "controller/storageController/copyPasteRemoveController/media/" befindet
import { SiteController } from "../SiteController.js";
import { GetSetRemoveSessionStorageHelper } from "../../../../helper/storageHelper/clientStorage/GetSetRemoveSessionStorageHelper.js";

class NewTextController extends SiteController {
    constructor() {
        super();
        this.sessionValue = new GetSetRemoveSessionStorageHelper();
        //paths
        let pathToPacks = "data/packs/"; 
        this.main = "main.json"; 
        this.pathToText = pathToPacks + "texts/%lang%/%path%/%name%";
        this.pathToGraphics = pathToPacks + "graphics/%path%/%name%";
        this.pathToIndex = pathToPacks + "templates/sites/index.json";


        //marker
        this.endMarker = "_$_++";
        this.startMarker = "++_$_";

        let startMarker = this.startMarker;
        let endMarker = this.endMarker;

        this.placeholder = startMarker + "%name%" + endMarker;

    }
    /*async get() {
        let listOfPlaceholder = await this.getPlaceholder();
        await this.filterListOfPlaceholder(listOfPlaceholder);
    }*/
        async get(indexEntry) {
            let a = await super.get(indexEntry);
            a = a.toString();
            if (a.includes(".html") ) {
                return indexEntry;
            } else {
                return console.error(null);
            }
        }

    async filterListOfPlaceholder(list) {

    }

    async getPlaceholder() {
        let placeholder = this.placeholder;

        const classSet = new Set();

        document.querySelectorAll('*').forEach(element => {
            element.classList.forEach(className => {
                if (className.includes(this.startMarker) && className.includes(this.endMarker)) {
                    classSet.add(className);
                }
            });
        });

        let listOfPlaceholders = Array.from(classSet);

        console.log(listOfPlaceholders);
        return listOfPlaceholders;
    }
}


export {NewTextController };
