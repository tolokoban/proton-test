require( 'component.editor', function( exports, module ) {
    "use strict";

    var Component = require( "component" );
    
    var Editor = function( options ) {
        var that = this;

        Component.call( this, 'div', 'component-editor' );
        
        var iframe = document.createElement( 'iframe' );
        iframe.addEventListener( 'load', function() {
            // Storing a reference to the wysiwyg editor.
            that._squire = iframe.contentWindow.editor;
            if( that._postponedHTML ) {
                that._squire.setHTML( that._postponedHTML );
                delete that._postponedHTML;
            }
        }, false);
        iframe.setAttribute( "src", "squire/squire.html" );
        this.element.appendChild( iframe );

        // If argument `options` is defined, we use it to initialise this component.
        if( typeof options !== 'undefined' ) {
            if( typeof options.content !== 'undefined' ) this.content = options.content;
        }
    };
    
    // Inheritance from Component
    Editor.prototype = Object.create(Component.prototype);
    Editor.prototype.constructor = Editor;
    
    /**
     * Get/Set the HTMl content of the editor.
     */
    Object.defineProperty( Editor.prototype, 'content', {
        get: function() { 
            if( typeof this._squire === 'undefined' ) {
                // IFrame is not ready.
                return this._postponedHTML || "";
            }
            return this._squire.getHTML(); 
        },
        set: function( html ) {
            if( typeof this._squire === 'undefined' ) {
                // IFrame is  not ready.  We store  the `html`  and it
                // will  be inserted  as soon  as the  iframe will  be
                // loaded.
                this._postponedHTML = html;
                return;
            }
            this._squire.setHTML( html );
        },
        configurable: true,
        enumerable: true
    });


    module.exports = Editor;
});
