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

The result can be viewed in a browser opening `www/index.html`.
Tested on Google Chrome and Firefox only.


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
