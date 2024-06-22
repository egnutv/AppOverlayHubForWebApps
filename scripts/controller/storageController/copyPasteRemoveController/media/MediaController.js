import { SiteController } from "../SiteController.js";
import { GetSetRemoveSessionStorageHelper } from "../../../../helper/storageHelper/clientStorage/GetSetRemoveSessionStorageHelper.js";
import { selectDomElement } from "../../../../utils/selectDomElement.js";

class MediaController extends SiteController {
    constructor() {
        super();
        this.sessionValue = new GetSetRemoveSessionStorageHelper();

        // Namen und Parameter
        this.langName = "lang:";
        this.parameterName = "%parameterName%";
        this.name = "%name%";
        this.endMarker = "_$_++";
        this.startMarker = "++_$_";

        this.trimmerMarker = ":";
        this.graphicsParameter = "graphic";
        this.textParameter = "text";

        this.mainName = "main";


        this.placeholder = this.startMarker + this.name + this.endMarker;
    }

    async getSet() {
        let indexEntry = "start";
        let a = await this.get(indexEntry);
        let listOfPlaceholder = await this.getPlaceholder();
        await this.set(listOfPlaceholder);
    }

    async set(listOfPlaceholder) {
        console.log(listOfPlaceholder);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log(entry.target);

                    // Ausgabe des Klassennamens
                    const className = elementClassMap.get(entry.target);
                    console.log(className);
                    if (className.includes(this.trimmerMarker)) {
                        console.log(": is included");
                        let ident = className.replace(this.endMarker, "").replace(this.startMarker, "").replace(this.endMarker, "").split(this.trimmerMarker)[0];
                        console.log(ident)
                        switch (ident) {
                            case this.textParameter:
                                console.log(this.textParameter + " = " + ident);
                            break;
                            case this.graphicsParameter:
                            break;
                        }
                    } else {
                        console.log(": not included")
                    }
                }
            });
        });

        // Map zum Speichern der Elemente und ihrer Klassennamen
        const elementClassMap = new Map();

        // Liste der DOM-Elemente erstellen und zur Map hinzufügen
        listOfPlaceholder.forEach((selector) => {
            const element = selectDomElement("." + selector);
            if (element) {
                elementClassMap.set(element, selector);
                observer.observe(element);
            } else {
                console.warn(`Element not found for selector: ${selector}`);
            }
        });
    }

    async getIndexEntry(indexEntry) {
        let a = await super.getIndexEntry(indexEntry);
        a = a.toString();
        if (a.includes(".html")) {
            return indexEntry;
        } else {
            return console.error(null);
        }
    }

    async getPlaceholder() {
        let placeholder = this.placeholder;
        const classSet = new Set();

        document.querySelectorAll('*').forEach(element => {
            element.classList.forEach(className => {
                if (className.includes(this.startMarker) && className.includes(this.endMarker)) {
                    classSet.add(`${className}`);
                }
            });
        });

        let listOfPlaceholders = Array.from(classSet);

        console.log(listOfPlaceholders);
        return listOfPlaceholders;
    }
}

export { MediaController };
