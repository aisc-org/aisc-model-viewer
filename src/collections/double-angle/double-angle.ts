import { App } from '../../app'
import { Model } from '../../viewer'
import pathToModel from './neyland-connection.gltf'

const app = new App([
    new Model('Double Angle Connection', pathToModel)
])

app.viewer.setModelAsCurrent(app.children[0])
