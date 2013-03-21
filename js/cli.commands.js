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
    if(command.trim().length == 0){     //handle empty
        return;
    }
    else if (/^clear$/.test(command)){   //handle clear
        $(resultElem).remove();
        return;
    }
    else if(/^ls$/.test(command)){
        jQuery.ajaxSetup({async:false});
        var response = "";
        $.get("pages/cli.php", function(data) {       //pass query parameters here    
            response = {status: 1, response: data};   //change to $.ajax()
        });
        return response;
    }else if (/^intro$/.test(command)) return {status: 1, response: "the beginning..."};
    else return {status: 0, response: command + ": command not found"}
};
