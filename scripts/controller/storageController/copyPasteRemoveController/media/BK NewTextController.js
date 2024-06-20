import { SiteController } from "../SiteController.js";
import { GetSetRemoveSessionStorageHelper } from "../../../../helper/storageHelper/clientStorage/GetSetRemoveSessionStorageHelper.js";
import { selectDomElement } from "../../../../utils/selectDomElement.js";

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

        //names
        this.langName = "lang:"
        this.parameterName = "text";
        
        //marker
        this.endMarker = "_$_++";
        this.startMarker = "++_$_";

        let startMarker = this.startMarker;
        let endMarker = this.endMarker;

        this.placeholder = startMarker + "%name%" + endMarker;

        
    }

    async getSet() {
        let indexEntry = "start";
        let a = await this.get(indexEntry);
        let listOfPlaceholder = await this.getPlaceholder();
        await this.set(a, listOfPlaceholder);
    }

    async get(indexEntry) {
        let a = await super.get(indexEntry);
        a = a.toString();
        if (a.includes(".html") ) {
            return indexEntry;
        } else {
            console.error(null);
            return null;
        }
    }

    async set(indexEntry, listOfPlaceholder) {
        console.log(indexEntry, listOfPlaceholder);
        let c = [];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log(entry);
                    
                }
            });
        });

        // Liste der DOM-Elemente erstellen
        let elementsToObserve = [];

        listOfPlaceholder.forEach((selector) => {
            const element = selectDomElement(selector);
            if (element) {
                elementsToObserve.push(element);
            } else {
                console.warn(`Element not found for selector: ${selector}`);
            }
        });

        // Beobachten der Elemente
        elementsToObserve.forEach((element) => {
            observer.observe(element);
        });
    }

    async filterVisiblePlaceholder(listOfPlaceholder) {
        console.log(listOfPlaceholder);
        let c = [];
        for (let i = 0; i < listOfPlaceholder.length; i++) {
            const element = array[i];
            // Implement logic here if needed
        }
    }

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
