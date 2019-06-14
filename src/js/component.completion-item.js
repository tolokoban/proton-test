/**********************************************************************
 require( 'component.completion-item' )
 -----------------------------------------------------------------------
 A __CompletionItem__ is the read only representation of a email with label and value.
 It is used in the CompletionBox.

 When it is selected, he got the `selected` css class. 
 **********************************************************************/

require( 'component.completion-item', function( exports, module ) {
    "use strict";

    var Component = require( "component" );

    var CompletionItem = function( email, onClick ) {
        var that = this;

        Component.call( this, 'div', 'component-completion-item' );
        this.element.textContent = email.label + " <" + email.value + ">";

        Object.defineProperty( this, 'email', {
            value: email,
            writable: false,
            configurable: true,
            enumerable: true
        });

        // 
        this.element.addEventListener( 'click', function( evt ) {
            evt.preventDefault();
            evt.stopPropagation();
            if( typeof onClick === 'function' ) {
                onClick.call( that, email );
            }
        }, false);
    };

    // Inheritance from Component
    CompletionItem.prototype = Object.create(Component.prototype);
    CompletionItem.prototype.constructor = CompletionItem;    


    /**
     * List of completions to display.
     */
    Object.defineProperty( CompletionItem.prototype, 'selected', {
        get: function() { return this.element.classList.contains( 'selected' ); },
        set: function(v) {
            if( v ) {
                this.element.classList.add( 'selected' );
            } else {
                this.element.classList.remove( 'selected' );
            }
        },
        configurable: true,
        enumerable: true
    });



    module.exports = CompletionItem;
});
