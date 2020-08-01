import { App, HtmlItem } from '../app'

// Content
import devEnvironment from './dev-environment.md'
import addingACollection from './adding-a-collection.md'
import addingAModel from './adding-a-model.md'
import exportingToGltf from './exporting-to-gltf.md'
import addingMoreFun from './adding-more-fun.md'

// Images
import './tools-for-native-modules.png'
import './screenshot-new-collection.png'
import './screenshot-new-collection-added-content.png'
import './screenshot-new-collection-sample-markdown.png'
import './screenshot-new-collection-with-dogs.png'

const app = new App({
    title: 'Documentation',
    groups: [
        {
            name: 'Tutorials',
            items: [
                new HtmlItem({ name: 'Setting up a development environment', content: devEnvironment }),
                new HtmlItem({ name: 'Adding a collection', content: addingACollection }),
                new HtmlItem({ name: 'Adding a model', content: addingAModel }),
                new HtmlItem({ name: 'Exporting to glTF', content: exportingToGltf }),
                new HtmlItem({ name: 'Adding a more fun item', content: addingMoreFun }),
            ]
        }
    ]
})

app.defaultHTML = `
<h2>Welcome to the contributor's documentation!</h2>
<p>Please select an item from the sidebar to continue.</p>
`

app.setDefaultContent()
