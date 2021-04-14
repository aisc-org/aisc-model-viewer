import { App, Model } from '../app'

// Models
import pathToCaseA from './Wide-flange-column-models-W8x31-Case-A.glb'

new App({
    title: 'Buckling of wide flange columns',
    groups: [
        {
            name: 'models',
            items: [
                new Model({ name: 'Case A', path: pathToCaseA })
            ]
        }
    ],
    addGuideLink: false,
    contributors: [
        'Michael Hadley',
        'Peter Talley',
        'Mark Denavit',
    ],
});
