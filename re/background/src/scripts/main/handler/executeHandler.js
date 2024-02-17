function chainedExecute(aChain) {
    var chain = [aChain];

    for (let i = 0; i < chain.length; i++) {
        this.execute(chain[i]);
    }

}   

function execute(action){
    //Hier wird dann 
}