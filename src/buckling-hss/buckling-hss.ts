import { App, Model, HtmlItem } from '../app';

// Model files
import pathToFB from './HSS-Flexural-buckling.glb'
import pathToLB from './HSS-Local-buckling.glb'

// Content
import commentary from './commentary.md'
import moreFun from './more-fun.md'

new App({
    title: 'Buckling of HSS',
    groups: [
        {
            name: 'models',
            items: [
                new Model({ name: 'Flexural buckling', path: pathToFB }),
                new Model({ name: 'Local buckling', path: pathToLB, maxScale: 5 }),
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
        'Peter Talley',
        'Mark Denavit',
    ],
})

Model.viewer.edgeThresholdAngle = 65
