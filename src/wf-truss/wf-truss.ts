import { App, Model, HtmlItem } from '../app'

// Model files
import pathToBlockShear from './Gusset (centered).glb'

// Content
import moreFun from './more-fun.md'

// Images


const app = new App({
    title: 'Wide Flange Truss Connection',
    groups: [
        {
            name: 'models',
            items: [
                new Model({name: 'Block shear rupture', path: pathToBlockShear}),
            ]
        },
        {
            name: 'more',
            items: [
                new HtmlItem({ name: 'More fun!', content: moreFun }),
            ]
        }
    ]
})
