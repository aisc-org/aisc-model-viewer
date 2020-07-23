import { App, HtmlItem } from '../app'

import devEnvironment from './dev-environment.md'
import addingAModel from './adding-a-model.md'
import exportingToGltf from './exporting-to-gltf.md'

import './tools-for-native-modules.png'

const app = new App({
    title: 'Documentation',
    groups: [
        {
            name: 'Tutorials',
            items: [
                new HtmlItem({ name: 'Setting up a development environment', content: devEnvironment }),
                new HtmlItem({ name: 'Adding a model', content: addingAModel }),
                new HtmlItem({ name: 'Exporting to glTF', content: exportingToGltf }),
            ]
        }
    ]
})

app.defaultHTML = `
<h2>Welcome to the contributor's documentation!</h2>
<p>Please select an item from the sidebar to continue.</p>
`

app.setDefaultContent()
