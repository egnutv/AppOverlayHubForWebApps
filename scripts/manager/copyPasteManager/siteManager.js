import { readHTML } from "../storageManagement/reader/readHTML.js";
import { readJson } from "../storageManagement/reader/readJSON.js";
import { selectDomElement } from "../../utils/selectDomElement.js";

async function copyPasteTemplate(name, destination) {
    let tempCopy = await copyTemplate(name);
    await pasteTemplate(destination, tempCopy);
}

async function copyTemplate(name) {
    let tempCopy = "null";
    await readJson('data/packs/templates/sites/index.json', 'index.' + name)
        .then(async valueArray => {
            if (valueArray && valueArray.length > 0) {
                let value = valueArray[0];
                await readHTML('data/packs/templates/sites/' + value + '.html')
                .then(data => {
                    let value = data;
                    tempCopy = name + ' ' + value;
                })
                .catch(error => console.error('Error:', error));
            }
        })
        .catch(error => console.error('Error:', error));
    return tempCopy;
}

async function pasteTemplate(destination, tempCopy) {
    let aDestination = selectDomElement(destination);
    console.warn("Unser aDestination:" + aDestination);

    if (tempCopy === "null") {
        console.error("tempCopy is null");
    } else {
        let name = tempCopy.split(" ")[0]; let replacement = "";
        tempCopy = tempCopy.replace(name, replacement, 0);
        let value = tempCopy;
        let count = aDestination.getElementsByClassName('tempDiv').length;
        let nameCount = aDestination.getElementsByClassName(name).length;
        if (count === 0 && nameCount === 0) {
            let tempDiv = document.createElement('div');
            tempDiv.className = 'tempDiv';
            aDestination.appendChild(tempDiv);

            let TheTempDiv = document.getElementsByClassName('tempDiv')[0];

            TheTempDiv.innerHTML = value;
            
            let tempCount = TheTempDiv.childElementCount;
            console.warn(tempCount + " ist die Zahl.")

            for (let i = 0; i < TheTempDiv.children.length; i++) {
                TheTempDiv.children[i].classList.add(name);
            }

            while (TheTempDiv.firstChild) {
                aDestination.appendChild(TheTempDiv.firstChild);
            }
            aDestination.removeChild(TheTempDiv);

            triggerEvents();
        }
    }
}

function removeTemplate(name) {
    let scripts = document.getElementsByClassName(name);
    while(scripts[0]) {
        scripts[0].parentNode.removeChild(scripts[0]);
    }
}

export { copyTemplate, pasteTemplate, removeTemplate, copyPasteTemplate};
