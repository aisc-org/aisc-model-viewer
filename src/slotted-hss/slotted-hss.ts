import { App, HtmlItem, Model } from '../app'

// Models
import pathToModel from './Slotted HSS Connection.glb'
import pathToRupture from './Slotted HSS Connection -- Tensile rupture.glb'
import pathToWeldFracture from './Slotted HSS Connection -- Weld fracture.glb'
import pathToBaseMetalHSS from './Slotted HSS Connection -- Base metal (HSS).glb'
import pathToBaseMetalPlate from './Slotted HSS Connection -- Base metal (Plate).glb'

// Content
import calculations from './calculations.md'
import moreFun from './more-fun.md'

new App({
    title: 'Slotted HSS Connection',
    groups: [
        {
            name: 'models',
            items: [
                new Model({ name: '3D model', path: pathToModel }),
                new Model({ name: 'Tensile rupture', path: pathToRupture }),
                new Model({ name: 'Weld fracture', path: pathToWeldFracture }),
                new Model({ name: 'Base metal (HSS)', path: pathToBaseMetalHSS }),
                new Model({ name: 'Base metal (Plate)', path: pathToBaseMetalPlate }),
            ]
        },
        {
            name: 'more',
            items: [
                new HtmlItem({ name: 'Calculations', content: calculations }),
                new HtmlItem({ name: 'More fun!', content: moreFun })
            ]
        }
    ],
    contributors: [
        'Peter Talley',
        'Mark Denavit',
    ],
})
