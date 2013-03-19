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
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    
    // Implementation
    Plugin.prototype = {
        init: function () {
            $(this.element).attr("contenteditable", "true");
            $(this.element).attr("spellcheck", "false");
            this.registerReturnKey(this.element, this.options, this);
        },
        registerReturnKey: function (element, options, context) {
            $(element).bind('keydown', function(e) {
                if(e.keyCode==13){
                    e.preventDefault(); //necessary, or ie goes psycho with the contentEditable
                    var resultElem = $('#' + options.resultDiv);
                    if(!resultElem.length){
                        var d = document.createElement('div');
                        $(d).addClass(options.cssClass)
                            .attr("id", options.resultDiv)
                            .prependTo($('body'));
                        resultElem = $('#' + options.resultDiv);
                    }
                    //emulate terminal history, clear current line
                    var command = $(element).text();
                    $(resultElem).append(context.addNewLine(options.prompt + command));
                    $(element).text('');
                    
                    //process the command here
                    var output = context.processCommand(command, options, resultElem);
                    if(typeof output !== "undefined"){
                        //$(resultElem).append(context.addNewLine(output)); //straightforward way
                        context.teleType(resultElem, output);
                    }
                }
            });
        },
        processCommand: function(command, options, resultElem) {
            if (/clear/i.test(command)){
                $(resultElem).remove();
                return;
            }
            if (/cat/i.test(command)) return "Meow!";
            else if (/ls/i.test(command)) return "Ain't nobody got time fo dat!";
            else return "Yea... no! it ain't ready."
            
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
