import { App, Model, HtmlItem } from '../app';

// Model files
import pathToXaxisFB from './Double-angle-X-axis-FB.glb'
import pathToYaxisFTB from './Double-angle-Y-axis-FTB.glb'

new App({
    title: 'Buckling of Double Angle',
    groups: [
        {
            name: '',
            items: [
                new Model({ name: 'Flexural buckling', path: pathToXaxisFB }),
                new Model({ name: 'Flexural-torsional buckling', path: pathToYaxisFTB, maxScale: 12 }),
            ]
        },
    ],
    addGuideLink: false,
    contributors: [
        'Michael Hadley',
        'Tsu-Jung Denavit',
        'Peter Talley',
        'Mark Denavit',
    ],
})

Model.viewer.edgeThresholdAngle = 50
