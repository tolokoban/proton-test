describe('Component "editor"', function() {
    var Editor = require("component.editor");
    var editor = new Editor();
    editor.appendTo( document.body );

    it('should return an empty string by default', function() {
        expect(editor.content).toBe("");
    });

    it('should get what has been set', function( done ) {
        // Wait for the iframe to be loaded.
        // A better way  to do this will  be to add a  `load` event on
        // the editor and to wait for it before performing the test.
        window.setTimeout(function() {
            editor.content = "Blablabla...";
            expect(editor.content).toBe("Blablabla...");
            done();
        }, 1000);
    });
});
