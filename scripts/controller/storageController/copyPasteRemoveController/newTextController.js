import { GetSetRemoveServerToClientHelper } from "../../../helper/storageHelper/GetSetRemoveServerToClientFileHelper.js";
import { selectDomElement } from "../../../utils/selectDomElement.js";
import { SiteController } from "./newSiteController.js";

class TextController extends SiteController {
    constructor() {
        super();
        this.stroage = new GetSetRemoveServerToClientHelper;
        this.indexName = "indexOfSites";
        this.defaultConfName = "defaultConf";
        this.indexPath = "data/packs/templates/sites/index.json";
        this.pathToLangPack = "data/packs/texts/%lang%/";
        this.standardLangFile = "config.json";
        this.speceficLangFile = "specific/%file%.json";
        this.configForSite = "data/configs/main.json"
        this.langName = "lang:";
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

        let pathToLangPack = this.pathToLangPack;
        pathToLangPack = pathToLangPack.replace("%lang%", currentLang.toUpperCase());
        console.log("pathToLangPack " + pathToLangPack);
        let standardLangFile = this.standardLangFile;
        let speceficLangFile = this.speceficLangFile;
        
        standardLangFile = pathToLangPack + this.standardLangFile;
        speceficLangFile = pathToLangPack + this.speceficLangFile;
        speceficLangFile = speceficLangFile.replace("%file%", dest);
        console.log(speceficLangFile);
        console.log(standardLangFile);
        let langName = this.langName;
        let valueOfSpecific;
        let valueOfStandard;
        let nameOfLang = langName + currentLang;
        try {
            valueOfSpecific = await this.getEntryOf(nameOfLang, speceficLangFile);
            console.log("try of specific");
        } catch (error) {
            currentLang = await this.findLang("null");
            pathToLangPack = pathToLangPack.replace("%lang%", currentLang.toUpperCase());
            speceficLangFile = this.speceficLangFile;
            speceficLangFile = pathToLangPack + this.speceficLangFile;
            speceficLangFile = speceficLangFile.replace("%file%", dest);
        }
        try {
            valueOfStandard = await this.getEntryOf(nameOfLang, standardLangFile);
            console.log("try of standard");
        } catch (error) {
            currentLang = await this.findLang("null");
            pathToLangPack = pathToLangPack.replace("%lang%", currentLang.toUpperCase());
            standardLangFile = this.standardLangFile;
            standardLangFile = pathToLangPack + this.standardLangFile;
            standardLangFile = standardLangFile.replace("%file%", dest);
        }

         



        //console.log(currentLang);

        

    }
    async #getValuesOfFile(lang, filename){
        let path;
        if (filename.includes("/")){
            
        }
    }

    async findLang(lang) {
        let docLang;
        let outputLang;
        let defaultConf = await this.getEntryOf(this.defaultConfName, this.configForSite);
        if (lang != null || lang != undefined || lang != "null") {
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
        console.log("lang: " + outputLang);
        return outputLang;

    }
}
export { TextController }