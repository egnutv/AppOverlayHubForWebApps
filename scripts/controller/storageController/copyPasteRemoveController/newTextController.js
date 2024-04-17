import { selectDomElement } from "../../../utils/selectDomElement.js";
import { SiteController } from "./newSiteController.js";
import { GetSetRemoveSessionStorageHelper } from "../../../helper/storageHelper/clientStorage/GetSetRemoveSessionStorageHelper.js";

class TextController extends SiteController {
    constructor() {
        super();
        this.sessionValue = new GetSetRemoveSessionStorageHelper; this.langName = "lang:"; this.indexPath = "data/packs/templates/sites/index.json"; this.pathToLangPack = "data/packs/texts/%lang%/"; this.standardLangFile = "config.json"; this.speceficLangFile = "specific/%file%.json"; 
        this.textParStart = "++_$_"; this.textParEnd = "_$_++"; this.count;
    }
    async getSet(indexEntry) {
        
        let arrayOfEntrys = await this.get(indexEntry);
        console.log("Der Eintrag : " + arrayOfEntrys);
        await this.set(arrayOfEntrys)
    }
    async get(indexEntry) {
        let a = await super.get(indexEntry);
        a = a.toString();
        if (a.includes(".html") ) {
            return indexEntry;
        } else {
            return console.error(null);
        }
    }
    async set(destination) {
        let dest = destination;
        let d = destination;
        destination = "." + d;
        d = await selectDomElement(destination);
        let currentLang = await this.findLang();
        let defaultLang = await this.findLang("default");
        currentLang = currentLang.toString();
        let newDestValues = await this.#getValuesOfFile(currentLang, dest);
        let defaultDestValues = await this.#getValuesOfFile(defaultLang, dest);
        let zeichen; zeichen = "Ich bin kein Caps"; console.log(zeichen.toUpperCase());
        let destinations = await this.#getValuesOfVariables(dest);
        for (let i = 0; i < destinations.length; i++) {
            let desti = destinations[i];
            let destiClass = this.textParStart + desti + this.textParEnd;
            let changeValue;

            if (newDestValues.hasOwnProperty(desti)) {
                changeValue = newDestValues[desti].toString();
            } else {
                changeValue = defaultDestValues[desti].toString();
            }
            let dC = await selectDomElement("." + destiClass); destiClass = dC;

            
            
            
            if (destiClass.hasAttribute('value')) {
                let loggedValue = destiClass.value;
                console.log(loggedValue);

                if (changeValue != loggedValue) {
                    destiClass.value = changeValue;
                }
                
            } else {
                let loggedInner = destiClass.innerHTML;
                console.log(loggedInner);

                if (changeValue != loggedInner) {
                    destiClass.innerHTML = changeValue;
                }

                
            }
            
        }
    }
    async #getValuesOfVariables(destination) {
        let alleDestinationen = document.getElementsByTagName("*");
        let destinationArray = [];
        for (let destination of alleDestinationen) {
            if (destination.className) {
                if (destination.className.startsWith(this.textParStart) && destination.className.endsWith(this.textParEnd)) {
                    destinationArray.push(destination.className.slice(this.textParStart.length, -this.textParEnd.length));
                }
            }
        }
        return destinationArray;
    }
    async #getValuesOfFile(lang, filename){
        let state;
        let l = lang;
        lang = l.toUpperCase();
        let path = this.pathToLangPack;
        path = path.replace("%lang%", lang);
        let specificPath = path + this.speceficLangFile;
        specificPath = specificPath.replace("%file%", filename)
        let standardPath = path + this.standardLangFile;
        let specificValues; let standardValues;
        
        if (await this.sessionValue.existsStartsWith(this.langName + lang + ":specific:")) {
            let valueOfSession = await this.sessionValue.getKeysStartsWith(this.langName + lang + ":specific:");
            if (valueOfSession != this.langName + lang + ":specific:" + filename){
                await this.sessionValue.remove(valueOfSession);
            }
        }
        try {
            specificValues = await this.getEntryOf(this.langName + lang + ":specific:" + filename, specificPath);
        } catch (error) {
            //await this.#errorCatchBlock1(filename);
            lang = await this.findLang("default");
            await this.#getValuesOfFile(lang, filename);
        }
        try {
            standardValues = await this.getEntryOf(this.langName + lang + ":standard:", standardPath);
        } catch (error) {
            //await this.#errorCatchBlock1(filename);
            lang = await this.findLang("default");
            await this.#getValuesOfFile(lang, filename);
        }
        let values = Object.assign({}, specificValues, standardValues.interaction);
        return values;
    }
    async #errorCatchBlock1(filename) {
        let recall;
        this.count++;
        recall = this.#byPass();
        if (recall) {
            let lang = await this.findLang("default");
            await this.#getValuesOfFile(lang, filename);
        }
    }    
    #byPass() {
        if (this.count >= 3) {
            this.count = 0;
            return false;
        } else {
            return true;
        }
    }
    async findLang(lang) {
        let usedefault = false;
        let docLang;
        let outputLang;
        let defaultConf = await this.getEntryOf(this.defaultConfName, this.defaultConf);
        let defaultLang = defaultConf.default["lang"];
        let supportLangs = defaultConf.default["lang-support"];
        if (lang === "default") {
            docLang = defaultLang;
        } else {
            docLang = document.getElementsByTagName("html")[0].getAttribute("lang");
        }
            if (supportLangs.includes(docLang)) {
                outputLang = docLang;
            } else {
                outputLang = defaultLang;
            }
        if (Array.isArray(outputLang)) {
            let o = outputLang[0]; outputLang = o;
        }
        return outputLang;

    }
}
export { TextController }