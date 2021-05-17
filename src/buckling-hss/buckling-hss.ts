import { App, Model, HtmlItem } from '../app';

// Model files
import pathToFB from './HSS-Flexural-buckling.glb'
import pathToLB from './HSS-Local-buckling.glb'

new App({
    title: 'Buckling of HSS',
    groups: [
        {
            name: '',
            items: [
                new Model({ name: 'Flexural buckling', path: pathToFB }),
                new Model({ name: 'Local buckling', path: pathToLB, maxScale: 5 }),
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

Model.viewer.edgeThresholdAngle = 65
