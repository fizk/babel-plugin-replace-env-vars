## babel-plugin-replace-env-vars


Does exactly the same as https://github.com/wssgcg1213/babel-plugin-inline-replace-variables
the only difference is that it pulls the value
from ENV and not from a config file.

if you have a code like this;

```js
const __SOME_CONST__ + ' string value';
```

and if you run it with

```sh
$ __SOME_CONST__="I am a " babel --plugins=env-replace ./file.js
```

this plugin will output it as

```js
const 'I am a ' + ' string value';
```
