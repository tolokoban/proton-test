require( 'component.composer-head', function( exports, module ) {
    "use strict";
    
    var Component = require( "component" );

    var ComposerHead = function( onClose ) {
        Component.call( this, 'div', 'component-composer-head' );
        var btnClose = document.createElement( 'div' );
        btnClose.textContent = "Close";
        this.element.appendChild( btnClose );

        // Clicking the close button will close the composer.
        btnClose.addEventListener( 'click', function( evt ) {
            if( typeof onClose === 'function' ) {
                evt.stopPropagation();
                onClose();
            }
        });
    };

    // Inheritance from Component
    ComposerHead.prototype = Object.create(Component.prototype);
    ComposerHead.prototype.constructor = ComposerHead;
    

    module.exports = ComposerHead;
});
