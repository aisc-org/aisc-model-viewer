Adding a model
==============

Format
------

Models must be in [glTF format](https://www.khronos.org/gltf/). They may be
`.gltf` or `.glb`, with or without compression. Binary (`.glb`) with compression
is preferred for simplicity and reduced asset size. See
[Exporting to glTF](./#Exporting-to-glTF) for instructions for common modeling
software.

Licensing
---------

Please ensure that you have permission to re-distribute any content submitted to
the site.

Section on licensing. Do models/words become (c) AISC? Will contributors have to
sign a [contributor license agreement](https://en.wikipedia.org/wiki/Contributor_License_Agreement)?
Does AISC have existing boilerplate for this kinda thing?

Code
----

To add a model to an existing collection, you'll need to add a new `Model` to
the `App` definition for the collection. The `name` and `path` parameters are
required; you should also add the names of the people who made the model so they
can be credited for their work.

<details class="sourceCode" open>
<summary>collection.ts</summary>

``` diff
  import { App, Model } from '../app'
+ import pathToModel from './My Model.glb'
  
  new App({
      title: 'My Collection',
      groups: [
          {
              name: 'models',
              items: [
+                 new Model({ name: 'My model', path: pathToModel }),
              ]
          },
      ]
  })
```

</details>
