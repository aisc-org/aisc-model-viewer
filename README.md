Testing yarn!!!

To run:

````````````````````````````````````````````````````````````````````````````````
yarn install
yarn start
````````````````````````````````````````````````````````````````````````````````

Then open a new tab pointing to `localhost:8080`.

Note that Yarn and `webpack-dev-server` aren't playing along nicely right now if
you try to have `webpack-dev-server` automatically open a new tab for you (see
[the relevant yarn issue](https://github.com/yarnpkg/berry/issues/856)).
