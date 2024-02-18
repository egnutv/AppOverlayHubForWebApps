function getScript(name) {
    fetch('data/src/configs/addScripts.json')
        .then(response => response.json())
        .then(data => {
            let paths = data.add[name];
            if (paths) {
                setScript(paths, name);
            }
        })
        .catch(error => console.error('Error:', error));
}

function setScript(paths, name) {
    var count = document.head.getElementsByClassName(name).length;
    if (count == 0) {
        for (let path of paths) {
            let script = document.createElement('script');
            script.src = path;
            script.className = name;
            document.head.appendChild(script);
        }
    }
}


function delScript(name) {
    let scripts = document.getElementsByClassName(name);
    while(scripts[0]) {
        scripts[0].parentNode.removeChild(scripts[0]);
    }
}

/*function getScript(name) {
    //Hier soll eine Config ausgelesen werden
}
function setScript(path, name) {
    let script = document.createElement(script);

    script.src = path;
    script.id = name;

}

function delScript(name) {
    let script = document.getElementById(name)
    document.head.removeChild(script);
}*/
// Verwenden Sie eine Bibliothek wie js-yaml, um die YML-Datei zu lesen
// Verwenden Sie eine Bibliothek wie js-yaml, um die YML-Datei zu lesen


