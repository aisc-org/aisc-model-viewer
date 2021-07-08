Adding a Model
==============

To add a model to an existing collection, you'll need:

- A model file in [glTF format](https://www.khronos.org/gltf/)
- A name to call it

You can preview your exported glTF models using Don McCurdy's online
[glTF viewer](https://gltf-viewer.donmccurdy.com/), which is powered by the same
[three.js](https://threejs.org/) library as this site.


Format
------

Models must be in [glTF format](https://www.khronos.org/gltf/). They may be
`.gltf` or `.glb`, with or without compression. Binary (`.glb`) with compression
is preferred for simplicity and reduced asset size. See
[Exporting to glTF](./#Exporting-to-glTF) for instructions for common modeling
software.


Code
----

To add a model to an existing collection, you'll need to add a new `Model` to
the `App` definition for the collection. You should also add any new
contributors to the collection to the `contributors` list.

**collection.ts**
``` diff
  import { App, Model } from '../app'
  import pathToOtherModel from './Some other model.glb'
+ import pathToModel from './My Model.glb'
  
  new App({
      title: 'My Collection',
      groups: [
          {
              name: 'models',
              items: [
                  new Model({ name: 'Some other model', path: pathToOtherModel }),
+                 new Model({ name: 'My model', path: pathToModel }),
              ]
          },
      ],
      contributors: [
          'Wirt',
+         'Jason Funderberker',
      ]
  })
```

What's happening:

- Specify the model file (`My Model.glb`) as a dependency:
  ``` typescript
  import pathToModel from './My Model.glb'
  ```
  The relative path to the file is returned in the variable `pathToModel`.
- Create a new `Model` instance:
  ``` typescript
  new Model({ name: 'My model', path: pathToModel })
  ```
  `name` specifies the name used in the sidebar, which is also used to create
  the unique link to the item. `path` tells the code where to look for the model
  file.
- Credit the appropriate contributors:
  ``` typescript
  contributors: [
      'Wirt',
      'Jason Funderberker',
  ]
  ```
  The `contributors` array is used to populate the list of contributors on the
  credits page of the collection.
