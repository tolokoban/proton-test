require( 'component.autocomplete', function( exports, module ) {
    "use strict";

    var Component = require( "component" );
    var EmailItem = require( "component.email-item" );
    var CompletionBox = require( "component.completion-box" );


    var Autocomplete = function( options ) {
        Component.call( this, 'div', 'component-autocomplete' );

        var emailsContainer = document.createElement( 'span' );
        this._emailsContainer = emailsContainer;
        var input = document.createElement( 'input' );
        input.setAttribute( 'placeholder', 'To' );
        this._input = input;
        var box = new CompletionBox( addEMail.bind( this ) );
        this._box = box;
        this._emails = [];

        // Bind component's focus to inner input's focus.
        this.focus = input.focus.bind( input );

        // Add children.
        this.element.appendChild( emailsContainer );
        this.element.appendChild( input );
        box.appendTo( this.element );

        // If the component is clicked, it will get the focus.
        this.element.addEventListener( 'click', this.focus, false );

        // Completion box must be hidden if input looses focus.
        input.addEventListener( 'blur', box.hide.bind( box ) );
        // KeyUp event listener.
        input.addEventListener( 'keyup', function( evt ) {
            // Don't autocomplete on Tab.
            if( evt.keyCode == 9 ) return;

            if( box.handleKeyDown( evt ) ) {
                // The key has been handled by the completion box.
                return;
            }

            var text = input.value.trim();
            box.show( text );
        }, false);

        // If argument `options` is defined, we use it to initialise this component.
        if( typeof options !== 'undefined' ) {
            if( typeof options.emails !== 'undefined' ) this.emails = options.emails;
            if( typeof options.addresses !== 'undefined' ) {
                this.addresses = options.addresses;
            }
        }
    };

    // Inheritance from Component.
    Autocomplete.prototype = Object.create(Component.prototype);
    Autocomplete.prototype.constructor = Autocomplete;

    /**
     * Array of emails addresses displayed.
     * Each email is an object of the form `{ label: 'Tolokoban', value: 'contact@tolokoban.org' }`.
     */
    Object.defineProperty( Autocomplete.prototype, 'emails', {
        get: function() {
            return this._emails.map(function( item ) {
                return item.email;
            });
        },
        set: function(v) {
            if( !Array.isArray( v ) ) {
                // `emails`must be an array.
                return;
            }
            // Reset the internal emails items container.
            this._emails = [];
            v.forEach( addEMail.bind( this ), this );
        },
        configurable: true,
        enumerable: true
    });

    /**
     * Array of addresses used for auto-completion.
     * Each address is an object of the form
     * `{ label: 'Tolokoban', value: 'contact@tolokoban.org' }`.
     */
    Object.defineProperty( Autocomplete.prototype, 'addresses', {
        get: function() { return this._box.addresses; },
        set: function(v) { this._box.addresses = v; },
        configurable: true,
        enumerable: true
    });

    /**
     * If the completion box is open, hide it.
     * @param box {object} - Element containing the completion box.
     */
    function hideCompletionBox( box ) {
        box.classBox.add( 'hide' );
    };

    /**
     * Private function to add an email in the current list.
     * @param email {object} - EMail description in the form `{ label: '', value: '' }`.
     */
    function addEMail( email ) {
        var item = new EmailItem( email, removeEMail.bind( this, email ));
        item.appendTo( this._emailsContainer );
        this._emails.push( item );
        this._input.value = "";
        this._box.hide();
        this.focus();
    }

    function removeEMail( email ) {
        var idx = findEMailIndex.call( this, email );
        if( idx < 0 ) {
            // There is nothing to remove.
            return;
        }

        var item = this._emails[idx];
        // Remove from the DOM.
        item.detach();
        // Remove from the array.
        this._emails.splice( idx, 1 );
        this.focus();
    }

    /**
     * Private function to find an email item by `value`.
     * @return {number} - The index of the email item or -1 if not found.
     */
    function findEMailIndex( email ) {
        var k, item, items = this._emails;
        for (k = 0 ; k < items.length ; k++) {
            item = items[k];
            if( email.value == item.email.value ) {
                return k;
            }
        }
        return -1;
    }

    module.exports = Autocomplete;
});
