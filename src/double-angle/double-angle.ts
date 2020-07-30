import { App, HtmlItem, Model } from '../app'

// Models
import pathToModel from './Neyland Connection (centered).glb'
import pathToNetSection from './Neyland Connection - NET SECTION.glb'
import pathToBlockShear from './Neyland Connection - BLOCK SHEAR 2.glb'

// Content
import calcs from './calculations.md'
import drawing from './2d-drawing.md'
import moreFun from './more-fun.md'
import photo from './photo.md'

// Assets specified in the HTML files
import './Photo.jpg'
import './double-angle.svg'
import './gross-tension.svg'
import './net-tension.svg'
import './net-area-3d-view.jpg'
import './block-shear-path.svg'
import './block-shear-3d-view.jpg'
import './bolt-numbering.svg'
import './workpoint.svg'

const app = new App({
    title: 'Double Angle Connection',
    groups: [
        {
            name: 'models',
            items: [
                new Model({name: '3D model', path: pathToModel}),
                new Model({name: 'Tensile rupture', path: pathToNetSection}),
                new Model({name: 'Block shear rupture', path: pathToBlockShear}),
            ]
        },
        {
            name: 'more',
            items: [
                new HtmlItem({name: 'Calculations', content: calcs}),
                new HtmlItem({name: '2D structural drawing', content: drawing, classes: ['full-width']}),
                new HtmlItem({name: 'Photo', content: photo}),
                new HtmlItem({name: 'More fun!', content: moreFun}),
            ]
        }
    ],
    contributors: [
        'Peter Talley',
        'Nicolo Franceschetti',
        'Mark Denavit',
    ]
})
