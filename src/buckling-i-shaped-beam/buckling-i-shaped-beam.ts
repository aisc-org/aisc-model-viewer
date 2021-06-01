import { App, Model, HtmlItem } from '../app';

// Model files
import pathToFlangeLB from './I-shaped-beam-Flange-LB.glb'
import pathToWebLB from './I-shaped-beam-Web-LB.glb'
import pathToShearBuckling1 from './I-shaped-beam-Shear-buckling-no-stiffeners.glb'
import pathToShearBuckling2 from './I-shaped-beam-Shear-buckling-with-stiffeners.glb'
import pathToLTB from './I-shaped-beam-Lateral-torsional-buckling.glb'

// Content
import commentary from './commentary.md'
import moreFun from './more-fun.md'

new App({
    title: 'Buckling of I-Shaped Beam',
    groups: [
        {
            name: 'lateral-torsional',
            items: [
                new Model({ name: 'Lateral-torsional', path: pathToLTB, maxScale: 50 }),
            ]
        },
        {
            name: 'local',
            items: [
                new Model({ name: 'Flange', path: pathToFlangeLB, maxScale: 10 }),
                new Model({ name: 'Web', path: pathToWebLB, maxScale: 16 }),
            ]
        },
        {
            name: 'shear',
            items: [
                new Model({ name: 'No transverse stiffeners', path: pathToShearBuckling1, maxScale: 14 }),
                new Model({ name: 'With transverse stiffeners', path: pathToShearBuckling2 }),
            ]
        },
        {
            name: 'more',
            items: [
                new HtmlItem({ name: 'Commentary', content: commentary }),
                new HtmlItem({ name: 'More fun!', content: moreFun }),
            ]
        }
    ],
    addGuideLink: false,
    contributors: [
        'Michael Hadley',
        'Tsu-Jung Denavit',
        'Peter Talley',
        'Mark Denavit',
    ],
})

Model.viewer.edgeThresholdAngle = 35
