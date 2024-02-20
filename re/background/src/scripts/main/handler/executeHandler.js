function chainedExecute(chain) {
    for (let i = 0; i < chain.length; i++) {
        window[chain[i][0]].apply(null, chain[i].slice(1)); 
    }
}   

// Example: chainedExecute([["function1", arg1, arg2], ["function2", arg3], ["function3"]]); If you are write this you can infinity executeing step by step


function execute(action){
    //Hier wird dann Ausgeführt
}