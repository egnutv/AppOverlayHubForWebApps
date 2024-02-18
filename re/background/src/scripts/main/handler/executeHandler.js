function chainedExecute(aChain) {
    var chain = [aChain];

    for (let i = 0; i < chain.length; i++) {
        this.execute(chain[i]); //Hier wird der Wert aus dem Array, der Nummer einer function die es ausführt übergeben
    }

}   

function execute(action){
    //Hier wird dann 
}