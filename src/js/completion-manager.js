require( 'completion-manager', function( exports, module ) {
    "use strict";
    
    var CompletionManager = function( list ) {
        this._list = list || [];
    };
    
    /**
     * Getter/setter for the completion list.
     */
    Object.defineProperty( CompletionManager.prototype, 'list', {
        get: function() { return this._list; },
        set: function(v) { this._list = v; },
        configurable: true,
        enumarable: true
    });

    /**
     * @return void
     */
    CompletionManager.prototype.complete = function( text ) {
        text = text.trim();
        if( text.length == 0 ) {
            // Empty string matches nothing.
            return [];
        }
        var result = [];

        this._list.forEach(function ( item ) {
            var posLabel = item.label.indexOf( text );
            var posValue = item.value.indexOf( text );
            if( posLabel < 0 && posValue < 0 ) {
                // No match.
                return;
            }

            var priority;
            if( posLabel < 0 ) priority = posValue;
            else if( posValue < 0) priority = posLabel;
            else priority = Math.min( posLabel, posValue );

            result.push({ priority: priority, item: item });
        });

        // Sorting. First items with a match at the beginning of label or value.
        // Then alphabetical sort by label and value.
        result.sort( function(a, b) {
            if( a.priority < b.priority ) return -1;
            if( a.priority > b.priority ) return 1;
            // Let's sort by label.
            if( a.item.label < b.item.label ) return -1;
            if( a.item.label > b.item.label ) return 1;
            // Let's sort by value.
            if( a.item.value < b.item.value ) return -1;
            if( a.item.value > b.item.value ) return 1;
            return 0;
        });

        return result.map( function( occurence ) {
            return { label: occurence.item.label, value: occurence.item.value };
        });
    };

    
    module.exports = CompletionManager;
});
