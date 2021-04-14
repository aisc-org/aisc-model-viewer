import { App, Model, HtmlItem } from '../app';

// Model files
import pathToFlangeLB from './I-shaped-beam-Flange-LB.glb'
import pathToWebLB from './I-shaped-beam-Web-LB.glb'
import pathToShearBuckling from './I-shaped-beam-Shear-buckling.glb'

new App({
    title: 'I-Shaped Beam',
    groups: [
        {
            name: '',
            items: [
                new Model({ name: 'Flange local buckling', path: pathToFlangeLB }),
                new Model({ name: 'Web local buckling', path: pathToWebLB }),
                new Model({ name: 'Shear buckling', path: pathToShearBuckling }),
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
