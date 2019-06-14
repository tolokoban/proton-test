require( 'layout', function( exports, module ) {
    "use strict";
    
    /**
     * @param count {number} - Number of frames to layout.
     * @param refContainer {object} - Size  of the container. Must own
     * properties `width` and `height`.
     * @param refFrame {object} - Size  of a frame. Must own
     * properties `width` and `height`. Default is `{ width: 500, height: 480 }`.
     * @param  margin {number}  - Distance  from the  container's left
     * border and the first frame. Default is 32.
     *
     * @return {array}
     * An array of `count` positions. A position is an object with two
     * attributes: `top` and `left`. They are numbers.
     */
    module.exports = function( count, rectContainer, rectFrame, margin ) {
        // Noting to compute if the number of frames is lesser than 1.
        if( count < 1 ) return [];
        // Default arguments.
        if( typeof rectFrame === 'undefined' ) rectFrame = { width: 500, height: 480 };
        if( typeof margin === 'undefined' ) margin = 32;

        if( rectContainer.width < rectFrame.width || rectContainer.height < rectFrame.height ) {
            // The  screen  is  small.   It  must  be  a  smartphone's
            // screen. So we move to the  top left corner and the size
            // will be adjusted to the fullscreen size.
            var arr = [];
            while( count --> 0 ) {
                arr.push({ left: 0, top: 0 });
            }
            return arr;
        }

        // Vertically centered.
        var top = Math.floor( .5 + ( rectContainer.height - rectFrame.height ) / 2 );

        // If there is only one frame, we will center it horizontally.
        if( count == 1 ) {
            return [{
                top: top,
                left: Math.floor( .5 + ( rectContainer.width - rectFrame.width ) / 2 )
            }];
        }
        
        // Width of the container after excluding margin.
        var innerWidth = rectContainer.width - 2 * margin;
        // Several frames. The idea is  to align left the first, align
        // right the second and spread the others between.
        var leftFirst = margin;
        var leftLast = margin + innerWidth - rectFrame.width;
        // Distance between two adjacent frames.
        var spread = ( leftLast - leftFirst )  / ( count - 1 );
        // Array to return initialized with the first frame.
        var result = [{ top: top, left: leftFirst }];
        // Computing other frames positions.
        for( var i = 1 ; i < count - 1 ; i++ ) {            
            result.push({ 
                top: top, 
                left: Math.floor( .5 + leftFirst + i * spread )
            } );
        }
        // Adding the last one.
        result.push( { top: top, left: leftLast } );

        return result;
    };
});
