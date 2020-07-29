import { App, Model, HtmlItem } from '../app'

// Model files
import pathToModel from './WF Truss Connection.glb'
import pathToBlockShear from './WF Truss Connection -- Block shear.glb'
import pathToRupture from './WF Truss Connection -- Tensile rupture.glb'

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
                new Model({ name: '3D model', path: pathToModel}),
                new Model({ name: 'Tensile rupture', path: pathToRupture }),
                new Model({ name: 'Block shear rupture', path: pathToBlockShear }),
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
