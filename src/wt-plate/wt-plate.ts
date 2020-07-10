import { App, Model } from '../app'
import pathToModel from './WT Connection.glb'
import pathToRupture from './WT Connection -- Tensile rupture.glb'
import pathToWebShear from './WT Connection -- Web block shear.glb'
import pathToIntuitiveShear from './WT Connection -- Intuitive block shear.glb'
import pathToUnlikelyShear from './WT Connection -- Unlikely block shear.glb'
import pathToYield from './WT Connection -- Tensile yield.glb'

const app = new App({
    title: 'WT bolted to plate',
    groups: [
        {
            name: 'models',
            items: [
                new Model({name: '3D model', path: pathToModel}),
                new Model({name: 'Tensile rupture', path: pathToRupture}),
                new Model({name: 'Web block shear', path: pathToWebShear}),
                new Model({name: 'Block shear 2', path: pathToIntuitiveShear}),
                new Model({name: 'Block shear 3', path: pathToUnlikelyShear}),
                new Model({name: 'Tensile yield', path: pathToYield}),
            ]
        },
    ]
})
