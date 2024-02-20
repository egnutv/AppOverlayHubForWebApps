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
} //Example execute: getScript('Script1'). If you are execute then you are place a path in the head.

function setScript(paths, name) {
    var count = document.head.getElementsByClassName(name).length;
    if (count == 0) {
        for (let path of paths) {
            let script = document.createElement('script');
            script.src = path;
            script.className = name;
            document.head.appendChild(script);
        }
        if (document.head.getElementsByClassName(name).length != paths.length) {
            console.error("a path wasn't set")
        } else {
            console.warn("The paths was placed")
        }
    }
} 


function delScript(name) {
    let scripts = document.getElementsByClassName(name);
    while(scripts[0]) {
        scripts[0].parentNode.removeChild(scripts[0]);
    }
}