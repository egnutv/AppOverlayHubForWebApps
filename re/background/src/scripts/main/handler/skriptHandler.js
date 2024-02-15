function getSkript(name) {
    //Hier soll eine Config ausgelesen werden
}
function setSkript(path, name) {
    let script = document.createElement(script);

    script.src = path;
    script.id = name;

}

function delSkript(name) {
    let script = document.getElementById(name)
    document.head.removeChild(script);
}