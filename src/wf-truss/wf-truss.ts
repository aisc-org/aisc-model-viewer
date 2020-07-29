import { App, Model, HtmlItem } from '../app'

// Model files
import pathToBlockShear from './Gusset (centered).glb'

// Content
import calculations from './calculations.md'
import moreFun from './more-fun.md'

// Images


new App({
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
                new HtmlItem({ name: 'Calculations', content: calculations }),
                new HtmlItem({ name: 'More fun!', content: moreFun }),
            ]
        }
    ],
    contributors: [
        'Peter Talley',
        'Nicolo Franceschetti',
        'Mark Denavit',
    ],
})
