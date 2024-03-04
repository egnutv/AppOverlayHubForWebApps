import { selectDomElement } from "../../utils/selectDomElement.js";


//Muss gemacht werden wenn Zeit da ist...

selectDomElement
class Transition {

    async start(from, to, selector) {

        let fromElement = selectDomElement(from);
        let toElement = selectDomElement(to);
        switch (selector) {
            case "single":
                await this.#prepareElements(selector, fromElement, toElement);
            break;
            case "all":
            break;
            case "infinite":
            break;
        }
    }

    async #prepareElements(selector, fromElement, toElement) {

        

        tempDiv = document.createElement("div");
        tempDiv.className = "tempDiv";

        let destinationName = fromElement.parentElement.className;
        destinationName = "." + destinationName;
        destinationName.toString();
        let destination = selectDomElement(destinationName);
        destination.appendChild(tempDiv);
        tempDiv.appendChild(fromELement);

        if (toElement !== null | toElement !== undefined | toElement !== "" | toElement !== "null") {
            tempDiv.appendChild(toElement);
        } else {
            let destinationElements = Array.from(destination.children);
            
        }
        
        
    }
}