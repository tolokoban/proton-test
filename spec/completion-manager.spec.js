describe('Module "completion-manager"', function() {
    var CompletionManager = require("completion-manager");
    var addresses = [
        {label: "Arthur", value: "arthur@gmail.com"},
        {label: 'Tolokoban', value: 'contact@tolokoban.org'},
        {label: "The galaxy's president", value: 'president@galaxy.com'},
        {label: 'Andy', value: 'andy@protonmail.com'},
        {label: 'Jason', value: 'jason@protonmail.com'},
        {label: 'Richard', value: 'richard@protonmail.com'},
        {label: 'Trekking', value: 'contact@trail-passion.org'}
    ];

    it('should complete nothing if there is no list defined', function() {
        var comp = new CompletionManager();
        expect(comp.complete("a")).toEqual([]);
    });

    it('should complete nothing is the text is empty', function() {
        var comp = new CompletionManager( addresses );
        expect(comp.complete("")).toEqual([]);
    });

    it('should complete nothing is the text is made only of spaces', function() {
        var comp = new CompletionManager( addresses );
        expect(comp.complete("    ")).toEqual([]);
        expect(comp.complete("\n")).toEqual([]);
    });

    it('should complete "xy"', function() {
        var comp = new CompletionManager( addresses );
        expect(comp.complete("xy")).toEqual([
            {label: "The galaxy's president", value: 'president@galaxy.com'}
        ]);
    });

    it('should complete "y"', function() {
        var comp = new CompletionManager( addresses );
        expect(comp.complete("y")).toEqual([
            {label: 'Andy', value: 'andy@protonmail.com'},
            {label: "The galaxy's president", value: 'president@galaxy.com'}
        ]);
    });

    it('should complete "@"', function() {
        var comp = new CompletionManager( addresses );
        expect(comp.complete("@")).toEqual([
            {label: 'Andy',                   value: 'andy@protonmail.com'},
            {label: 'Jason',                  value: 'jason@protonmail.com'},
            {label: "Arthur",                 value: "arthur@gmail.com"},
            {label: 'Richard',                value: 'richard@protonmail.com'},
            {label: 'Tolokoban',              value: 'contact@tolokoban.org'},
            {label: 'Trekking',               value: 'contact@trail-passion.org'},
            {label: "The galaxy's president", value: 'president@galaxy.com'}
        ]);
    });

    it('should deal with priority', function() {
        var comp = new CompletionManager( addresses );
        expect(comp.complete("an")).toEqual([
            {label: 'Andy', value: 'andy@protonmail.com'},
            {label: 'Tolokoban', value: 'contact@tolokoban.org'}
        ]);
    });

});
