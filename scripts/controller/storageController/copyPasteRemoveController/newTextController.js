import { GetSetRemoveServerToClientHelper } from "../../../helper/storageHelper/GetSetRemoveServerToClientFileHelper.js";
import { selectDomElement } from "../../../utils/selectDomElement.js";
import { SiteController } from "./newSiteController.js";
import { GetSetRemoveSessionStorageHelper } from "../../../helper/storageHelper/clientStorage/GetSetRemoveSessionStorageHelper.js";

class TextController extends SiteController {
    constructor() {
        super();
        this.stroage = new GetSetRemoveServerToClientHelper;
        this.sessionValue = new GetSetRemoveSessionStorageHelper;
        this.indexName = "indexOfSites"; this.defaultConfName = "defaultConf"; this.langName = "lang:";
        this.indexPath = "data/packs/templates/sites/index.json"; this.pathToLangPack = "data/packs/texts/%lang%/"; this.standardLangFile = "config.json"; this.speceficLangFile = "specific/%file%.json"; this.configForSite = "data/configs/main.json";
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

        
        console.log("SET OF TEXT")
        let dest = destination;
        let d = destination;
        destination = "." + d;

        d = await selectDomElement(destination);
        
        let currentLang = await this.findLang();
        let defaultLang = await this.findLang("default");
        
        currentLang = currentLang.toString();
        
        let newDestValues = await this.#getValuesOfFile(currentLang, dest);
        console.log("------------------------------------------------------")
        let defaultDestValues = await this.#getValuesOfFile(defaultLang, dest);

        //console.log(standard);
        
        let zeichen; zeichen = "Ich bin kein Caps"; console.log(zeichen.toUpperCase());

        let destinations = await this.#getValuesOfVariables(dest);


        for (let i = 0; i < destinations.length; i++) {
            let desti = destinations[i];
            let destiClass = this.textParStart + desti + this.textParEnd;
            console.log(desti);
            let changeValue;

            if (newDestValues.hasOwnProperty(desti)) {
                console.log("YEAH")
                changeValue = newDestValues[desti].toString();
                console.log(changeValue);
            } else {
                changeValue = defaultDestValues[desti].toString();
                console.log(changeValue);
            }
            let dC = await selectDomElement("." + destiClass); destiClass = dC;

            if (destiClass.hasAttribute('value')) {
                destiClass.value = changeValue;
            } else {
                destiClass.innerHTML = changeValue;
            }
            
        }
        //console.log(currentLang);

        

    }
    async #getValuesOfVariables(destination) {
        // Wählen Sie alle Elemente auf der Seite aus
        let alleDestinationen = document.getElementsByTagName("*");
    
        // Erstellen Sie ein Array, um die Elemente zu speichern, deren Klassenname mit "++_$_" beginnt und "_$_++" endet
        let destinationArray = [];
    
        // Iterieren Sie über jedes Element in der Sammlung
        for (let destination of alleDestinationen) {
            // Überprüfen Sie, ob das Element eine Klasse hat
            if (destination.className) {
                // Überprüfen Sie, ob der Klassenname des Elements mit "++_$_" beginnt und "_$_++" endet
                if (destination.className.startsWith(this.textParStart) && destination.className.endsWith(this.textParEnd)) {
                    // Fügen Sie das Element zum Array hinzu
                    destinationArray.push(destination.className.slice(this.textParStart.length, -this.textParEnd.length));
                }
            }
        }
    
        // Jetzt enthält das Array "destinationArray" die extrahierten Werte
        console.log(destinationArray);
        return destinationArray;
    }
    
    async #getValuesOfFile(lang, filename){
        let state;
        let l = lang;
        lang = l.toUpperCase();
        let path = this.pathToLangPack;
        path = path.replace("%lang%", lang);
        
        console.log(path);

        let specificPath = path + this.speceficLangFile;
        specificPath = specificPath.replace("%file%", filename)
        let standardPath = path + this.standardLangFile;

        console.log(specificPath);
        console.log(standardPath);
        let specificValues; let standardValues;
        
        if (await this.sessionValue.existsStartsWith(this.langName + lang + ":specific:")) {
            console.log("YES ITS OK.")
            let valueOfSession = await this.sessionValue.getKeysStartsWith(this.langName + lang + ":specific:");
            console.log(valueOfSession);
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
        
        
        console.log("specificValues: ")
        console.log(specificValues)
        console.log("standardValues: ")
        console.log(standardValues)

        let values = Object.assign({}, specificValues, standardValues.interaction);
        console.log(values);
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
        let defaultConf = await this.getEntryOf(this.defaultConfName, this.configForSite);
        let defaultLang = defaultConf.default["lang"];
        console.log("UND DIE SPRACHE: " + defaultLang)
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
            
            console.log("lang: " + outputLang);
        if (Array.isArray(outputLang)) {
            let o = outputLang[0]; outputLang = o;
        }
        return outputLang;

    }
}
export { TextController }