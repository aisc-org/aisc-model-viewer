Setting up a development environment
====================================

In order to build the website for testing on your own machine, you'll need to
set up a [Node.js](https://nodejs.org) development environment. The site targets
the LTS version of Node (currently major version 12).

Building the site requires the following dependencies:

- Node.js
- Yarn
- Pandoc, v2.0 or higher. Make sure it's available on your `PATH`.


Windows
-------

#### Node

Download the latest 12.X release from [the Node.js website](https://nodejs.org).
When installing, make sure to check "Automatically install the necessary tools"
on the "Tools for Native Modules" screen -- or follow the link to the manual
instructions.

![The "Tools for Native Modules" screen. Make sure the highlighted box is checked.](./tools-for-native-modules.png)

#### Yarn

Once Node is installed, run 

``` powershell
npm install -g yarn
```

from an administrator terminal.

#### Pandoc

If you don't already have it installed, and you used the "Automatically install
the necessary tools" option when installing Node, you can easily install Pandoc
by running

``` powershell
choco install -y pandoc
```

from an administrator terminal.


Linux
-----

On Ubuntu, the easiest way to install Node is to run

``` sh
snap install --classic node --channel=12
```

For other distros, download the
[Linux binaries](https://nodejs.org/en/download/) or consult the
[instructions for installing via package manager](https://nodejs.org/en/download/package-manager/).

macOS
-----

(I have no idea.)
