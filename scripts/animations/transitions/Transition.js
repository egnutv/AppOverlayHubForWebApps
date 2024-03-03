import { selectDomElement } from "../../utils/selectDomElement.js";

selectDomElement
class Transition {

    async start(from, to, selector) {

        let fromElement = selectDomElement(from);
        let toElement = selectDomElement(to);
        switch (selector) {
            case "single":
                await this.#prepareItems(fromElement, selector);
            break;
            case "all":
            break;
            case "infinite":
            break;
        }
    }

    async #prepareItems(fromElement, selector) {

        

        tempDiv = document.createElement("div");
        tempDiv.className = "tempDiv";
    }
}