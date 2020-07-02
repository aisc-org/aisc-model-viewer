import { App, Model } from '../app'
import pathToModel from './WT Connection.glb'
import pathToYield from './WT Connection - Tee yield.glb'

const app = new App({
    title: 'WT bolted to plate',
    groups: [
        {
            name: 'models',
            items: [
                new Model({name: '3D model', path: pathToModel}),
                new Model({name: 'Tensile yield', path: pathToYield})
            ]
        },
    ]
})
