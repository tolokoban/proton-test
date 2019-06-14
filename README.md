# ProtonMail Test Exercise

This project is made with __gulp__. You need to install it to be able to build it.

```
npm install -g gulp
```

Be sure to get all the dependencies because I don't store `node_modules` in git repository:

```
npm update
```

Then, to build the project, simply write this on command line:

```
gulp
```

To perform the Karma tests:

```
npm test
```

The result can be viewed in a browser opening `www/index.html`.
Tested on Google Chrome and Firefox only.

For the __editor__ component to work properly on Google Chrome, you'd better make the `www` folder to be on a webserver.


## Folders structure

* __src__: Here lies the page `index.html`.
  * __js__: All the javascript files are here.
  * __css__: All the styles are here.
  * __squire__: Files needed to the wysiwyg editor _squire_.
* __www__: Output folder. The resulting project is here.


## Release or Debug mode

Because this is an exercise, I do not use the minified version of my javascript stuff. But, it is easy to do so if we want to. Just replace `all.js` with `all.min.js` in the `index.html` file.

```
<script src="all.min.js"></script>
```

## Main modules

There are three steps in this exercise. So here are the main modules for each step:

* __component.editor.js__: wrapper for the Squire wysiwyg editor.
* __component.autocomplete.js__: component providing email autocompletion.
  It internally uses `completion-manager.js` for the completion algorithm.
* __layout.js__: this module provide only one function that will return the positions of frames in a specified container.

```
  var Editor = require("component.editor.js");
  var editor = new Editor();
  editor.appendTo( document.body );
  editor.content = "<h1>ProtonMail</h1>";  
```

```
  var AutoComplete = require("component.autocomplete");
  var comp = new AutoComplete();
  comp.addresses = [
      {label: 'Tolokoban', value: 'contact@tolokoban.org'},
      {label: 'Andy', value: 'andy@protonmail.com'},
      {label: "The galaxy's president", value: 'president@galaxy.com'},
      {label: 'Jason', value: 'jason@protonmail.com'},
      {label: 'Richard', value: 'richard@protonmail.com'},
      {label: 'Trekking', value: 'contact@trail-passion.org'}
  ];
  comp.emails = [
      {label: "The galaxy's president", value: 'president@galaxy.com'},
      {label: 'Trekking', value: 'contact@trail-passion.org'}
  ];  
```
