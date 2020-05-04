import { App, Model } from '../../app'
import pathToModel from './Gusset (centered).glb'

const app = new App({
    title: 'Wide Flange Truss Connection',
    groups: [
        {
            name: 'basics',
            items: [
                new Model({name: '3d model', path: pathToModel}),
            ]
        },
        {
            name: 'failure modes',
        }
    ]
})
