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
    async getSet(/*indexEntry, destination*/) {
        
        let indexEntry = "start"
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
        
        currentLang = currentLang.toString();
        
        let newDestValues = await this.#getValuesOfFile(currentLang, dest);

        //console.log(standard);
        
        let zeichen; zeichen = "Ich bin kein Caps"; console.log(zeichen.toUpperCase());

        let destinations = await this.#getValuesOfVariables(dest);
        



        //console.log(currentLang);

        

    }
    async #getValuesOfVariables(destination) {
        // Wählen Sie alle Elemente auf der Seite aus
        let alleDestinationen = await selectDomElement("." + destination);

        // Konvertieren Sie die Sammlung von Elementen in ein Array
        let destinationArray = Array.from(alleDestinationen);

        // Erstellen Sie ein Array, um die Elemente zu speichern, deren Klassenname mit "%" beginnt und endet
        let gesuchteDestinationen = [];

        // Iterieren Sie über jedes Element im Array
        for (let destination of destinationArray) {
            // Überprüfen Sie, ob das Element eine Klasse hat
            if (destination.className) {
                // Überprüfen Sie, ob der Klassenname des Elements mit "%" beginnt und endet
                if (destination.className.startsWith(this.textParStart) && destination.className.endsWith(this.textParEnd)) {
                    // Fügen Sie das Element zum Array hinzu
                    gesuchteDestinationen.push(destination);
                }
            }
        }

        // Jetzt enthält das Array "gesuchteDestinationen" alle Elemente, deren Klassenname mit "%" beginnt und endet
        console.log(gesuchteDestinationen);
        
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
            await this.#errorCatchBlock1(lang, filename);
        }
        try {
            standardValues = await this.getEntryOf(this.langName + lang + ":standard:", standardPath);
        } catch (error) {
            await this.#errorCatchBlock1(lang, filename);
        }
        
        
        console.log("specificValues: ")
        console.log(specificValues)
        console.log("standardValues: ")
        console.log(standardValues)

        let values = Object.assign({}, specificValues, standardValues.interaction);
        console.log(values);
        return values;
    }

    async #errorCatchBlock1(lang, filename) {
        let recall;
        this.count++;
        recall = this.#byPass();
        if (recall) {
            lang = await this.findLang("null");
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
        let docLang;
        let outputLang;
        let defaultConf = await this.getEntryOf(this.defaultConfName, this.configForSite);
        if (lang == null || lang == undefined || lang == "null") {
            docLang = lang;
        } else {
            docLang = document.getElementsByTagName("html")[0].getAttribute("lang");
        }
        
        let defaultLang = defaultConf.default["lang"];
        let supportLangs = defaultConf.default["lang-support"];

        if (supportLangs.includes(docLang)) {
            outputLang = docLang;
        } else {
            outputLang = defaultLang;
        }
        if (Array.isArray(outputLang)) {
            let o = outputLang[0]; outputLang = o;
        }
        console.log("lang: " + outputLang);
        return outputLang;

    }
}
export { TextController }