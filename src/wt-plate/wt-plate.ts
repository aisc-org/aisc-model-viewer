import { App, Model, HtmlItem } from '../app'

// Models
import pathToModel from './WT Connection.glb'
import pathToRupture from './WT Connection -- Tensile rupture.glb'
import pathToWebShear from './WT Connection -- Web block shear.glb'
import pathToIntuitiveShear from './WT Connection -- Intuitive block shear.glb'
import pathToUnlikelyShear from './WT Connection -- Unlikely block shear.glb'

// Content
import drawingPage from './2d-drawing.md'
import calculations from './calculations.md'
import moreFun from './more-fun.md'

// Assets specified in the MD files
import './bolted-wt-top.svg'
import './wt-rupture-area.svg'
import './wt-shear-lag.svg'
import './wt-block-shear-1-area-shear.svg'
import './wt-block-shear-1-area-tension.svg'
import './wt-block-shear-2-area-shear.svg'
import './wt-block-shear-2-area-tension.svg'
import './wt-block-shear-2-path.svg'
import './wt-block-shear-3-area-shear.svg'
import './wt-block-shear-3-area-tension.svg'
import './wt-block-shear-3-path.svg'
import './bending-of-tee-when-cut.gif'

new App({
    title: 'WT Bolted Connection',
    groups: [
        {
            name: 'models',
            items: [
                new Model({name: '3D model', path: pathToModel}),
                new Model({name: 'Tensile rupture', path: pathToRupture}),
                new Model({
                    name: 'Block shear 1',
                    path: pathToWebShear,
                    desc: 'Tension in the flange and shear in the stem',
                }),
                new Model({
                    name: 'Block shear 2',
                    path: pathToIntuitiveShear,
                    desc: 'Tension in the outside of the flange and shear along the bolt lines',
                }),
                new Model({
                    name: 'Block shear 3',
                    path: pathToUnlikelyShear,
                    desc: 'Tension in the stem and the inside of the flange and shear along the bolt lines',
                }),
            ]
        },
        {
            name: 'more',
            items: [
                new HtmlItem({name: '2D structural drawing', content: drawingPage, classes: ['full-width']}),
                new HtmlItem({name: 'Calculations', content: calculations}),
                new HtmlItem({name: 'More fun!', content: moreFun}),
            ]
        }
    ],
    contributors: [
        'Peter Talley',
        'Mark Denavit',
    ],
})
