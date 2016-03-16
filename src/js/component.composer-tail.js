require( 'component.composer-tail', function( exports, module ) {
    "use strict";
    
    var Component = require( "component" );

    var ComposerTail = function( onSend ) {
        Component.call( this, 'div', 'component-composer-tail' );
        var btnSend = document.createElement( 'div' );
        btnSend.textContent = "Send";
        this.element.appendChild( btnSend );

        // Clicking the  send button will  send the message  (here, it
        // will just close the composer).
        btnSend.addEventListener( 'click', function( evt ) {
            if( typeof onSend === 'function' ) {
                evt.stopPropagation();
                onSend();
            }
        });
    };

    // Inheritance from Component
    ComposerTail.prototype = Object.create(Component.prototype);
    ComposerTail.prototype.constructor = ComposerTail;
    

    module.exports = ComposerTail;
});
