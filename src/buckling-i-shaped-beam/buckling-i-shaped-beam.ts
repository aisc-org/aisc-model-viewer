import { App, Model, HtmlItem } from '../app';

// Model files
import pathToFlangeLB from './I-shaped-beam-Flange-LB.glb'
import pathToWebLB from './I-shaped-beam-Web-LB.glb'
import pathToShearBuckling1 from './I-shaped-beam-Shear-buckling-no-stiffeners.glb'
import pathToShearBuckling2 from './I-shaped-beam-Shear-buckling-with-stiffeners.glb'
import pathToLTB from './I-shaped-beam-Lateral-torsional-buckling.glb'
import pathToLTB2 from './I-shaped-beam-LTB-braced.glb'

// Content
import commentary from './commentary.md'
import moreFun from './more-fun.md'

new App({
    title: 'Buckling of I-shaped Plate Girder',
    groups: [
        {
            name: 'lateral-torsional',
            items: [
                new Model({
                    name: 'Lateral-torsional',
                    title: 'Lateral-torsional buckling',
                    path: pathToLTB,
                    maxScale: 50,
                }),
                new Model({
                    name: 'Lateral-torsional (braced)',
                    title: 'Lateral-torsional buckling (braced)',
                    path: pathToLTB2,
                    maxScale: 50,
                }),
            ]
        },
        {
            name: 'local',
            items: [
                new Model({
                    name: 'Flange',
                    title: 'Flange local buckling',
                    path: pathToFlangeLB,
                    maxScale: 10
                }),
                new Model({
                    name: 'Web',
                    title: 'Web local buckling',
                    path: pathToWebLB,
                    maxScale: 16
                }),
            ]
        },
        {
            name: 'shear',
            items: [
                new Model({
                    name: 'No transverse stiffeners',
                    title: 'Shear buckling with no transverse stiffeners',
                    path: pathToShearBuckling1,
                    maxScale: 14,
                }),
                new Model({
                    name: 'With transverse stiffeners',
                    title: 'Shear buckling with transverse stiffeners',
                    path: pathToShearBuckling2,
                }),
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
