import { App, Model } from '../../app'
import pathToModel from './Gusset.gltf'

const app = new App([
    new Model('Wide Flange Truss Connection', pathToModel)
])

app.viewer.setModelAsCurrent(app.children[0])
