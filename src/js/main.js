//================================================================================
// Wait for DOM full load.
window.addEventListener(
    'DOMContentLoaded',
    function () {
        var addresses = [
            {label: 'Tolokoban', value: 'contact@tolokoban.org'},
            {label: 'Andy', value: 'andy@protonmail.com'},
            {label: "The galaxy's president", value: 'president@galaxy.com'},
            {label: 'Jason', value: 'jason@protonmail.com'},
            {label: 'Richard', value: 'richard@protonmail.com'},
            {label: 'Trekking', value: 'contact@trail-passion.org'}
        ];
        var words = [
            "Hello world!", "ProtonMail", "Tolokoban", "42 is the answer", "Don't panic",
            "Do you like fishing?", "Javascript", "HTML5", "WebMail", "Welcome on board"
        ];
        function pickWord() {
            return words[Math.floor( Math.random() * words.length )];
        }

        var Factory = require("composer-factory");

        var factory = new Factory();
        document.getElementById( 'compose' ).addEventListener( 'click', function() {
            var composer = factory.create();
            composer.addresses = addresses;
            var emails = [];
            for( var i = 0 ; i < Math.random() * 5 ; i++ ) {
                emails.push(
                    addresses[Math.floor( Math.random() * addresses.length )]
                );
            }
            composer.emails = emails;
            composer.content = "<h1>" + pickWord() + "</h1>" + pickWord();
            composer.show();
        });
    },
    false
);
