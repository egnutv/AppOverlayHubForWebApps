import { readHTML } from "../storageManagement/reader/readHTML.js";
import { readJson } from "../storageManagement/reader/readJSON.js"


async function copyTemplate(name, pasteTarget) {
    let target;
    switch (pasteTarget[0]) {
        case '.':
            target = document.getElementsByClassName(pasteTarget.substring(1))[0]; 
        break;
        case '#':
            target = document.getElementById(pasteTarget.substring(1));
        break;
        default:
            target = document.querySelector(pasteTarget); 
        break;
    }
    var tempDivCount = target.getElementsByClassName('tempDiv').length;
    var nameCount = target.getElementsByClassName(name).length;
    if (tempDivCount === 0 && nameCount === 0) {

        readJson('data/src/packs/templates/sites/index.json', 'index.' + name)
        .then(pathArray => {
            if (pathArray && pathArray.length > 0) {
                let path = pathArray[0];
                readHTML('data/src/packs/templates/sites/' + path + '.html')
                .then(data => {
                    let value = data;
                    setTemplate(name, value, pasteTarget, target);
                })
                .catch(error => console.error('Error:', error));
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

async function pasteTemplate(name, value, pasteTarget, target) {
    var count = target.getElementsByClassName('tempDiv').length;
    if (count === 0) {
        let tempDiv = document.createElement('div');
        tempDiv.className = 'tempDiv'; // Setzen Sie den Klassennamen hier
        target.appendChild(tempDiv);

        let TheTempDiv = document.getElementsByClassName('tempDiv')[0];

        TheTempDiv.innerHTML = value;
        
        var tempCount = TheTempDiv.childElementCount;
        console.warn(tempCount + " ist die Zahl.")

        for (let i = 0; i < TheTempDiv.children.length; i++) {
            TheTempDiv.children[i].classList.add(name);
        }

        while (TheTempDiv.firstChild) {
            target.appendChild(TheTempDiv.firstChild);
        }
        target.removeChild(TheTempDiv);
    }
}


function removeTemplate() {
    let scripts = document.getElementsByClassName(name);
    while(scripts[0]) {
        scripts[0].parentNode.removeChild(scripts[0]);
    }
}

export { copyTemplate, pasteTemplate, removeTemplate};