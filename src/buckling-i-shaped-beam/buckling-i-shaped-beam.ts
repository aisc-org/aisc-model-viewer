import { App, Model, HtmlItem } from '../app';

// Model files
import pathToFlangeLB from './I-shaped-beam-Flange-LB.glb'
import pathToWebLB from './I-shaped-beam-Web-LB.glb'
import pathToShearBuckling1 from './I-shaped-beam-Shear-buckling-no-stiffeners.glb'
import pathToShearBuckling2 from './I-shaped-beam-Shear-buckling-with-stiffeners.glb'
import pathToLTB from './I-shaped-beam-Lateral-torsional-buckling.glb'

new App({
    title: 'I-Shaped Beam',
    groups: [
        {
            name: '',
            items: [
                new Model({ name: 'Flange local buckling', path: pathToFlangeLB, maxScale: 10 }),
                new Model({ name: 'Web local buckling', path: pathToWebLB, maxScale: 16 }),
                new Model({ name: 'Shear buckling (no stiffeners)', path: pathToShearBuckling1, maxScale: 14 }),
                new Model({ name: 'Shear buckling (with stiffeners)', path: pathToShearBuckling2 }),
                new Model({ name: 'Lateral-torsional buckling', path: pathToLTB, maxScale: 50 }),
            ]
        },
    ],
    addGuideLink: false,
    contributors: [
        'Michael Hadley',
        'Peter Talley',
        'Mark Denavit',
    ],
})

Model.viewer.edgeThresholdAngle = 35
