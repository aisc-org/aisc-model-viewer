import { App, Model, HtmlItem } from '../app';

// Model files
import pathToXaxisFB from './Double-angle-X-axis-FB.glb'
import pathToYaxisFTB from './Double-angle-Y-axis-FTB.glb'
import pathToLocal from './Double-angle-Local-buckling.glb'
import pathToSingleAngle from './Double-angle-Single-angle.glb'

new App({
    title: 'Buckling of Double Angle',
    groups: [
        {
            name: 'models',
            items: [
                new Model({ name: 'Flexural buckling', path: pathToXaxisFB }),
                new Model({ name: 'Flexural-torsional buckling', path: pathToYaxisFTB, maxScale: 12 }),
                new Model({ name: 'Local buckling', path: pathToLocal, maxScale: 2 }),
                new Model({ name: 'Single-angle buckling', path: pathToSingleAngle }),
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
