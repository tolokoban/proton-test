/**
 * This function allows us to use modules as in NodeJS.
 * 
 * @example
 * require( 'mymodule', { value: 1.618 } );
 * var goldenNumber = require( ' mymodule' ).value;
 */
var require = function() {
    // Modules definitions.
    var definitions = {};
    // Modules once instantiated.
    var modules = {};

    return function(id, body) {
        if( typeof body === 'function' ) {
            // If `body` is specified and if it is a function,
            // this is a module's definition.
            definitions[id] = body;
            return;
        }
        var mod;
        body = definitions[id];
        if( typeof body === 'undefined' ) {
            var err = new Error( "Required module is missing: " + id );   
            console.error( err.stack );
            throw err;
        }
        mod = modules[id];
        if( typeof mod === 'undefined' ) {
            mod = { exports: {} };
            var exports = mod.exports;
            body( exports, mod );
            modules[id] = mod.exports;
            mod = mod.exports;
        }
        return mod;
    };
}();
