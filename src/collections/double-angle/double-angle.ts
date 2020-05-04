import { App, Link, Model } from '../../app'
import pathToModel from './Neyland Connection (centered).glb'
import pathToModel2 from './neyland-connection.gltf'
import pathToCalcs from './calculations.html'

const app = new App({
    title: 'Double Angle Connection',
    groups: [
        {
            name: 'models',
            items: [
                new Model({name: '3d model', path: pathToModel}),
                new Model({name: 'Other model', path: pathToModel2}),
            ]
        },
        {
            name: 'yay links',
            items: [
                new Link({name: 'Calculations', url: pathToCalcs}),
            ]
        }
    ]
})
