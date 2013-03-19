/*
 *  Project: cli
 *  Author: http://stackoverflow.com/a/10872412
 *  License: CC
 * 
 */

$.fn.teletype = function(opts){
    var $this = this,
        defaults = {
            animDelay: 500
        },
        settings = $.extend(defaults, opts);
    
    hideInput();
    $.each(settings.text.split(''), function(i, letter){
        setTimeout(function(){
            $this.html($this.html() + letter);
            if(i == settings.text.length - 1){ //really horrible way to do it, kill me now
                $this.html($this.html() + "<br/>");
                showInput();
            }
        }, settings.animDelay * i);
        
    });
};
