/**********************************************************************
 require( 'component.completion-box' )
 -----------------------------------------------------------------------
 A __CompletionBox__ displays emails the user can select by clicking or by pressing return.
 **********************************************************************/
require( 'component.completion-box', function( exports, module ) {
    "use strict";
    
    var Component = require( "component" );
    var CompletionItem = require("component.completion-item");
    var CompletionManager = require( "completion-manager" );

    var CompletionBox = function( onClick ) {
        Component.call( this, 'div', 'component-completion-box' );
        this._onClick = typeof onClick === 'function' ? onClick : function() {};
        this._completion = new CompletionManager();
    };

    // Inheritance from Component
    CompletionBox.prototype = Object.create(Component.prototype);
    CompletionBox.prototype.constructor = CompletionBox;
    
    /**
     * Addresses used for completion.
     */
    Object.defineProperty( CompletionBox.prototype, 'addresses', {
        get: function() { return this._completion.list; },
        set: function(v) { this._completion.list = v; },
        configurable: true,
        enumerable: true
    });

    /**
     * List of completions to display.
     */
    Object.defineProperty( CompletionBox.prototype, 'list', {
        get: function() { return this._list; },
        set: function(v) {
            this._list = v; 
            this.clear();
            var items = [];
            var onItemClick = this.selectEMail.bind( this );
            v.forEach(function ( email ) {
                var item = new CompletionItem( email, onItemClick );
                items.push( item );
                item.appendTo( this.element );
            }, this);
            if( items.length > 0 ) {
                items[0].selected = true;
            }
            this._items = items;            
        },
        configurable: true,
        enumerable: true
    });

    /**
     * Select an proposed email and fire the `onClick` event.
     * 
     * @param  email  {object|undefined}  -   EMail  to  fire  in  the
     * `onClick` event. Id not defined, the currently selected item is
     * used.
     */
    CompletionBox.prototype.selectEMail = function( email ) {
        this._onClick( email );
    };

    /**
     * Catch the following keys:
     * * __return__: Choose the currently selected item.
     * * __up__: Move selection up.
     * * __down__: Move selection down.
     *
     * @return {boolean} - `true`if the key has been handled.
     */
    CompletionBox.prototype.handleKeyDown = function( evt ) {
        // Index of the currently selected index.
        var idx;
        // Available items.
        var items = this._items;
        // If `capture` is  true, we must capture the  key event. That
        // means prevent it from bubbleling.
        var capture = false;

        switch( evt.keyCode ) {
        case 38:
            // Key UP.
            idx = this.getSelectedIndex();
            items[idx].selected = false;
            items[(idx - 1 + items.length) % items.length].selected = true;
            capture = true;
            break;

        case 40:
            // Key DOWN.
            idx = this.getSelectedIndex();
            items[idx].selected = false;
            items[(idx + 1) % items.length].selected = true;
            capture = true;
            break;
            
        case 13:
            // RETURN.
            idx = this.getSelectedIndex();
            this.selectEMail( items[idx].email );
            capture = true;
            break;
        }

        if( capture ) {
            evt.preventDefault();
            evt.stopPropagation();
        }
        return capture;
    };

    /**
     * @return Index of the currently  selected item. Or -1 if nothing
     * is selected. But this shouldn't occur.
     */
    CompletionBox.prototype.getSelectedIndex = function() {
        var k, item, items = this._items;
        for (k = 0 ; k < items.length ; k++) {
            item = items[k];
            if( item.selected ) return k;
        }
        return -1;
    };


    /**
     * Reveale the completion box.
     * @param text {string} - Text used to build the completion list.
     */
    CompletionBox.prototype.show = function( text ) {
        this.hide();
        var list = this._completion.complete( text );
        if( list.length == 0 ) {
            // No completion available.
            return;
        }

        this.list = list;
        this.element.classList.remove( 'hide' );
    };

    /**
     * hide the completion list.
     */
    CompletionBox.prototype.hide = function() {
        this.element.classList.add( 'hide' );
    };


    module.exports = CompletionBox;
});
