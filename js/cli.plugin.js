/*
 *  Project: cli
 *  Author: DarkCthulhu
 *  License: MIT
 */

;(function ($, window, document, undefined) {
    // Create the defaults once
    var pluginName = "setupCli";
    var defaults = {
        resultDiv: "__result__",
        prompt: "> ",
        cssClass: "cli"
    };

    // The plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        //history
        this.history = new Array();
        this.historyPtr = 0;
        
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    
    // Implementation
    Plugin.prototype = {
        init: function () {
            $(this.element).attr("contenteditable", "true");
            $(this.element).attr("spellcheck", "false");
            this.registerKeys(this.element, this.options, this);
        },
        registerKeys: function (element, options, context) {
            $(element).bind('keydown', function(e) {
                var resultElem = $('#' + options.resultDiv);
                var historyPtr = 0;
                //handle return key-press
                if(e.keyCode==13){
                    e.preventDefault(); //necessary, or IE goes psycho with the contentEditable
                    if(!resultElem.length){
                        var d = document.createElement('div');
                        $(d).addClass(options.cssClass)
                            .attr("id", options.resultDiv)
                            .prependTo($('body'));
                        resultElem = $('#' + options.resultDiv);
                    }
                    
                    //clear current line
                    var command = $(element).text();
                    $(resultElem).append(context.addNewLine(options.prompt + command));
                    $(element).text('');
                    
                    //add to history
                    context.history.push(command);
                    context.historyPtr = 0;
                    
                    //handle command
                    context.executecmd(command, context);
                //handle up-key press
                }else if(e.keyCode==38){
                    e.preventDefault();
                    //don't go beyond the size of history array
                    if(context.historyPtr < context.history.length){
                        $(element).text(context.history[context.history.length - (context.historyPtr++) - 1]);
                    }
                    if(context.historyPtr >= context.history.length)
                        context.historyPtr = context.history.length - 1;
                //handle down-key press
                }else if(e.keyCode==40){
                    e.preventDefault();
                    //don't go beyond the size of history array
                    if(context.historyPtr >= 0){
                        $(element).text(context.history[context.history.length - (context.historyPtr--) - 1]);
                    }
                    if(context.historyPtr < 0)
                        context.historyPtr = 0;
                }
            });
        },
        teleType: function(resultElem, content){
            //change anim-delay according to length of content
            $(function(){
                $(resultElem).teletype({
                    animDelay: 1000/content.length,
                    text: content
                });
            });
        },
        addNewLine: function(stringVal){
            return stringVal + "<br/>";
        },
        executecmd: function(command, context){
            //process the command here (cli.commands.js does the actual processing)
            var resultElem = $('#' + context.options.resultDiv);
            var cliH = new cliHandler();
            var output = cliH.execute(command, resultElem);
            if(typeof output !== "undefined"){
                context.teleType(resultElem, output + "\n");
            }
        }
    };

    // Preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
