require( 'composer-factory', function( exports, module ) {
    "use strict";

    var Component = require( "component" );
    var Head = require( "component.composer-head" );
    var Tail = require( "component.composer-tail" );
    var Editor = require("component.editor");
    var Autocomplete = require("component.autocomplete");
    var Layout = require("layout");


    var Composer = function( context ) {
        var that = this;

        Component.call( this, 'div', 'component-composer' );

        this._context = context;
        // Slot used to close this frame when a button of the `head` or `tail` is clicked.
        var onClose =  context.remove.bind( context, this );
        var head = new Head( onClose );
        var tail = new Tail( onClose );

        var autocomplete = new Autocomplete();
        this._autocomplete = autocomplete;
        var editor = new Editor();
        this._editor = editor;

        head.appendTo( this.element );
        tail.appendTo( this.element );
        addBody( this.element, autocomplete, editor );

        // Activate when clicked.
        this.element.addEventListener( 'click', function( evt ) {
            evt.stopPropagation();
            context.activate( that );
        });
    };

    // Inheritance from Component
    Composer.prototype = Object.create(Component.prototype);
    Composer.prototype.constructor = Composer;


    /**
     * This property is linked to the same autocomplete component's property.
     */
    Object.defineProperty( Composer.prototype, 'addresses', {
        get: function() { return this._autocomplete.addresses; },
        set: function(v) { this._autocomplete.addresses = v; },
        configurable: true,
        enumerable: true
    });

    /**
     * This property is linked to the same autocomplete component's property.
     */
    Object.defineProperty( Composer.prototype, 'emails', {
        get: function() { return this._autocomplete.emails; },
        set: function(v) { this._autocomplete.emails = v; },
        configurable: true,
        enumerable: true
    });

    /**
     * This property os linked to the same property on the `editor` component.
     */
    Object.defineProperty( Composer.prototype, 'content', {
        get: function() { return this._editor.content; },
        set: function(v) { this._editor.content = v; },
        configurable: true,
        enumerable: true
    });

    /**
     * Show the composer.
     */
    Composer.prototype.show = function() {
        this._context.add( this );
    };

    /**
     * Hide the composer.
     */
    Composer.prototype.hide = function() {
        this.detach();
        this._context.remove( this );
    };


    /**
     * To make the editor take the most space, we use a css table.
     */
    function addBody( element, autocomplete, editor ) {
        var table = div( 'table' );
        autocomplete.appendTo( table );
        editor.appendTo( table );
        element.appendChild( table );
    }

    /**
     * Helper to create a div with a potential className.
     */
    function div( className ) {
        var elem = document.createElement( 'div' );
        if( typeof className !== 'undefined' ) {
            elem.className = className;
        }
        return elem;
    }

    function createComposer( context ) {
        return new Composer( context );
    }

    //============================================================
    // Composer Factory.
    // ------------------------------------------------------------

    var ComposerFactory = function() {
        var context = {
            composers: [],
            container: document.body,
            activate: function( composer ) {
                this.composers.forEach(function ( instance ) {
                    var classList = instance.element.classList;
                    if( instance === composer ) {
                        classList.add( "active" );
                    } else {
                        classList.remove( "active" );
                    }
                });
            },
            add: function( composer ) {
                composer.appendTo( this.container );
                this.composers.push( composer );
                this.activate( composer );
                this.layout();
            },
            remove: function( composer ) {
                composer.detach();
                var idx = this.composers.indexOf( composer );
                if( idx < 0 ) {
                    // This should not happen. But it's better to be protective.
                    return;
                }
                this.composers.splice( idx, 1 );
                this.layout();
            },
            layout: function() {
                var positions = Layout(
                    this.composers.length, this.container.getBoundingClientRect()
                );
                // Applying positions using CSS `left` and `top`.
                this.composers.forEach(function ( composer, index ) {
                    var pos = positions[index];
                    composer.element.style.left = pos.left + "px";
                    composer.element.style.top = pos.top + "px";
                });
            }
        };
        this.create = createComposer.bind( undefined, context );

        // Watch for contianer size changing.
        window.setInterval( context.layout.bind( context ), 500 );
    };


    module.exports = ComposerFactory;
});
