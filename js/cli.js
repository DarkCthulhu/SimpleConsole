/*
 *  Project: cli
 *  Author: DarkCthulhu
 *  License: MIT
 */

$(function() {
    //document ready
    $('#interactive').setupCli({
        resultDiv: "result",
        prompt: $('#input').text(),
        cssClass: "cli"
    });
    
    //body click handler: any click brings cli into focus
    $('html').click(function(e){
        $('#interactive').focus();
    });
});

function showInput(){
    $('#input').show();
}
function hideInput(){
    $('#input').hide();
}
