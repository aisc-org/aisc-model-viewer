import { App, Model, HtmlItem } from '../app'

// Models
import pathToModel from './WT Connection.glb'
import pathToRupture from './WT Connection -- Tensile rupture.glb'
import pathToWebShear from './WT Connection -- Web block shear.glb'
import pathToIntuitiveShear from './WT Connection -- Intuitive block shear.glb'
import pathToUnlikelyShear from './WT Connection -- Unlikely block shear.glb'
import pathToYield from './WT Connection -- Tensile yield.glb'

// Content
import drawingPage from './2d-drawing.md'
import calculations from './calculations.md'
import moreFun from './more-fun.md'

// Assets specified in the MD files
import './bolted-wt-top.svg'
import './bending-of-tee-when-cut.gif'

new App({
    title: 'WT bolted to plate',
    groups: [
        {
            name: 'models',
            items: [
                new Model({name: '3D model', path: pathToModel}),
                new Model({name: 'Tensile yield', path: pathToYield}),
                new Model({name: 'Tensile rupture', path: pathToRupture}),
                new Model({name: 'Block shear 1', path: pathToWebShear}),
                new Model({name: 'Block shear 2', path: pathToIntuitiveShear}),
                new Model({name: 'Block shear 3', path: pathToUnlikelyShear}),
            ]
        },
        {
            name: 'more',
            items: [
                new HtmlItem({name: '2D structural drawing', content: drawingPage}),
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
