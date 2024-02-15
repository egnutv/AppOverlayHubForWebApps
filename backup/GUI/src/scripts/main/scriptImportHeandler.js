function importScripts(){
    let scriptImport;
    scriptImport = new ScriptImport();
    
    var script = "testtext";
    scriptImport.setScript(script);
}
class ScriptImportHeandler{
    setScript(script){
        var para = document.createElement("p");
        var node = document.createTextNode(script);
        para.appendChild(node);

        document.head.appendChild(para);
    }
    getScipt(){

    }
    rmScript(){

    }
}