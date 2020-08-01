import { App, Model, HtmlItem } from '../app'

// Model files
import pathToModel from './WF Truss Connection.glb'
import pathToBlockShear from './WF Truss Connection -- Block shear.glb'
import pathToRupture from './WF Truss Connection -- Tensile rupture.glb'

// Content
import drawing from './2d-drawing.md'
import calculations from './calculations.md'
import moreFun from './more-fun.md'

// Images
import './wf-truss-full.svg'
import './wf-truss-detail.svg'
import './wf-truss-bolts.svg'
import './wf-truss-lag.svg'
import './x_bar.png'


new App({
    title: 'WF Truss Connection',
    groups: [
        {
            name: 'models',
            items: [
                new Model({ name: '3D model', path: pathToModel, center: false }),
                new Model({ name: 'Tensile rupture', path: pathToRupture, center: false }),
                new Model({ name: 'Block shear rupture', path: pathToBlockShear, center: false }),
            ]
        },
        {
            name: 'more',
            items: [
                new HtmlItem({ name: '2D drawing', content: drawing, classes: ['full-width'] }),
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
