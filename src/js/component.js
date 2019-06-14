require( 'component', function( exports, module ) {
    "use strict";

    /**
     * @param nodeName {string}: Name of the underlying DOM element. Default is `div`.
     * @param className {string}: If defined, it will be the main stylesheet class of the element.
     */
    var Component = function( nodeName, className ) {
        // Default value is `div`.
        if( typeof nodeName === 'undefined' ) nodeName = 'div';

        var element = document.createElement( nodeName );
        if( typeof className === 'string' ) {
            element.classList.add( className );
        }

        Object.defineProperty( this, 'element', {
            value: element,
            writable: false,
            configurable: false,
            enumerable: true
        });
    };

    /**
     * Append the underlying element to `parent`.
     * @param parent {object}: a DOM element to which append this one.
     */
    Component.prototype.appendTo = function( parent ) {
        parent.appendChild( this.element );
    };

    /**
     * Remove the underlying element from its parent in the DOM.
     */
    Component.prototype.detach = function() {
        var parent = this.element.parentNode;
        if( !parent ) {
            // The underlying element has no parent yet.
            // We can't detach it.
            return;
        }
        parent.removeChild( this.element );
    };

    /**
     * Remove all the children of this element.
     */
    Component.prototype.clear = function() {
        this.element.innerHTML = "";
    };


    module.exports = Component;
});
