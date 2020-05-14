import { App, Model } from '../app'
import pathToModel from './Gusset (centered).glb'

const app = new App({
    title: 'Wide Flange Truss Connection',
    groups: [
        {
            name: 'models',
            items: [
                new Model({name: 'Block shear rupture', path: pathToModel}),
            ]
        },
    ]
})
