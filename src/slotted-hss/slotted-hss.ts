import { App, HtmlItem, Model } from '../app'

import pathToModel from './Slotted HSS Connection.glb'
import pathToRupture from './Slotted HSS Connection -- Tensile rupture.glb'
import pathToWeldFracture from './Slotted HSS Connection -- Weld fracture.glb'

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
            ]
        },
        {
            name: 'more',
            items: [
                new HtmlItem({ name: 'Calculations', content: calculations }),
                new HtmlItem({ name: 'More fun!', content: moreFun })
            ]
        }
    ]
})
