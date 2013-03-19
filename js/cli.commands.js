/*
 *  Project: cli
 *  Author: DarkCthulhu
 *  License: MIT
 */

/*
 * Class to handle all interaction with cli 
 * Functions handle an input command, and return output to cli.plugin
 */
 
var classContext;
function cliHandler(){
    this.history = new Array();
    classContext = this;
}

cliHandler.prototype.execute = function(command, resultElem){
    if (/clear/i.test(command)){
        $(resultElem).remove();
        return;
    }
    if (/cat/i.test(command)) return "Meow!";
    else if (/ls/i.test(command)) return "Ain't nobody got time fo dat!";
    else return "Yea... no! it ain't ready."
};
