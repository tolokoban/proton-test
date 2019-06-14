require( 'component.email-item', function( exports, module ) {
    "use strict";
    
    var Component = require( "component" );

    var EmailItem = function( email, onDelete ) {
        Component.call( this, 'div', 'component-email-item' );
        
        this.element.textContent = email.label;

        if( typeof onDelete === 'function' ) {
            this.element.addEventListener( 'click', function( evt ) {
                evt.stopPropagation();
                onDelete( email );
            }, false);
        }

        Object.defineProperty( this, 'email', {
            value: email,
            writable: false,
            configurable: false,
            enumerable: true
        });
    };

    // Inheritance from Component
    EmailItem.prototype = Object.create(Component.prototype);
    EmailItem.prototype.constructor = EmailItem;
    

    
    module.exports = EmailItem;
});
