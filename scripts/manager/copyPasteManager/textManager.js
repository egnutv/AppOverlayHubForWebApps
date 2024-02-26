import { readJson } from "../storageManagement/reader/readJSON.js";




async function copyText(name) {
    let tempCopy = "null";
    await readJson('data/configs/addScripts.json', 'add.' + name)
        .then(async paths => {
            if (paths) {
                

                tempCopy = name + " " + paths;
                
            }
        })
        .catch(error => console.error('Error:', error));

        console.warn("Copied" + tempCopy);
        return tempCopy;
}

 //Example execute: getScript('Script1'). If you are execute then you are place a path in the head.

 async function pasteText(tempCopy) {
    if (tempCopy === "null") {
        console.error("tempCopy is null");
    } else {
        let [name, ...paths] = tempCopy.split(" ");
    paths = paths.join(" ").split(",");
    var count = document.head.getElementsByClassName(name).length;
    if (count == 0) {
        console.warn("Länge " + paths.length);

        for (let i = 0; i < paths.length; i++) {
            let path = paths[i];
            console.log("Ein element " + path);

            let script = document.createElement("script");
            script.classList.add(name);
            script.src = path;

            // Fügt das Skript-Element zum head des Dokuments hinzu
            document.head.appendChild(script);
        }
    }
    }
    
}

async function copyPasteText(name) {
    let tempCopy = await copyScript(name);
    
    await pasteScript(tempCopy);
}

function removeText(name) {
    let scripts = document.getElementsByClassName(name);
    while(scripts[0]) {
        scripts[0].parentNode.removeChild(scripts[0]);
    }
}
async function reCopyPasteScript(name, destination) {
    removeTemplate(name);
    await copyPasteTemplate(name, destination);
}


export { copyScript, pasteScript, removeScript, copyPasteScript, reCopy};