import { selectDomElement } from "../../../utils/selectDomElement.js";
import { SiteController } from "./SiteController.js";
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
        let currentLang = await this.findLang();
        let defaultLang = await this.findLang("default");
        currentLang = currentLang.toString();
        let defaultDestValues = await this.#getValuesOfFile(defaultLang, dest);
        let DestValues = await this.#getValuesOfFile(currentLang, dest);
        let arrayOfDestinations = await this.#compareAndReplace(defaultDestValues, DestValues);
        let keysOfDestinations = Object.keys(arrayOfDestinations);
        console.log(arrayOfDestinations);
        for (let i = 0; i < keysOfDestinations.length; i++) {
            let nameOfDestination = keysOfDestinations[i];
            let valueOfDestination = arrayOfDestinations[nameOfDestination][0];
            console.log(valueOfDestination);
            let parameter = this.textParStart + nameOfDestination + this.textParEnd;
            console.log(parameter);
            await this.replaceTextIn(parameter, valueOfDestination, d);
        }
    }
    async replaceTextIn(nameOfParameter, valueOfDestination, d) {
        let area = await selectDomElement("." + d);
        let parameter = await area.getElementsByClassName(nameOfParameter)[0];
        if(parameter) {
            console.log("YEAH HA")
            if(parameter.hasAttribute('value')) {
                parameter.value = valueOfDestination;
            } else {
                parameter.innerHTML = valueOfDestination;
            }
        } else {
        }
    }
    async #compareAndReplace(defaultArray, replaceArray) {
        let outputArray = defaultArray;
        let dA = defaultArray; defaultArray = dA; let rA = replaceArray; replaceArray = rA;
        let keysOfDefault = Object.keys(defaultArray);
        let keysOfReplace = Object.keys(replaceArray);
        for (let i = 0; i < keysOfReplace.length; i++) {
            let keyOfReplace = keysOfReplace[i];
            let keyOfReplaceValue = replaceArray[keyOfReplace];
            keyOfReplaceValue = keyOfReplaceValue.toString();
                if (outputArray.hasOwnProperty(keyOfReplace)) {

                    outputArray[keyOfReplace][0] = keyOfReplaceValue;
                } else {
                    outputArray[keyOfReplace][0] = keyOfReplaceValue;
                }
        }
        return outputArray;
    }
    async #getValuesOfVariables(destination) {
        let alleDestinationen = await document.getElementsByTagName("*");
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
            lang = await this.findLang("default");
            await this.#getValuesOfFile(lang, filename);
        }
        try {
            standardValues = await this.getEntryOf(this.langName + lang + ":standard:", standardPath);
        } catch (error) {
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