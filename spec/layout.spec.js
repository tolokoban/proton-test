describe('Module "layout"', function() {
    // The default frame size is 500x480.
    var layout = require('layout');
    var desktop = { width: 1000, height: 500 };
    var mobile = { width: 320, height: 480 };

    it('should return an empty array if count is 0', function() {
        expect(layout( 0, desktop )).toEqual( [] );
    });

    it('should return an empty array if count is less than 0', function() {
        expect(layout( -1, desktop )).toEqual( [] );
        expect(layout( -2, desktop )).toEqual( [] );
    });

    it('should layout a single frame to the top left corner on small screens', function() {
        expect(layout( 1, mobile )).toEqual( [{ left: 0, top: 0 }] );
    });

    it('should layout 3 frames to the top left corner on small screens', function() {
        expect(layout( 3, mobile )).toEqual([
            { left: 0, top: 0 }, { left: 0, top: 0 }, { left: 0, top: 0 }
        ]);
    });

    it('should center a single frame on desktop', function() {
        expect(layout( 1, desktop )).toEqual([
            { left: 250, top: 10 }
        ]);
    });

    it('should place correctly two frames on desktop', function() {
        expect(layout( 2, desktop )).toEqual([
            { left: 32, top: 10 },
            { left: 468, top: 10 }
        ]);
    });

    it('should place correctly three frames on desktop', function() {
        expect(layout( 3, desktop )).toEqual([
            { left: 32, top: 10 },
            { left: 250, top: 10 },
            { left: 468, top: 10 }
        ]);
    });
});
