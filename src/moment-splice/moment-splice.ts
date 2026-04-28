import{ App, HtmlItem, Model } from '../app'

//Calculations
import MomentSpliceCalcs from './Moment_Splice_Calculation.md'

//Models
import pathToModel from './Moment Splice GLB.glb'

new App({
    title: 'moment splice Connection',
    groups:[
        {
            name: 'models',
            items: [
                new Model({ name: 'Moment Splice', path: pathToModel })
            ]
        },
        {
            name: 'Calculations',
            items: [
                new HtmlItem({ name: 'Calculations', content: MomentSpliceCalcs}),
            ]
        }
    ],
    addGuideLink: false,
    contributors:[
        'Samuel Leman',
        'Sophia Mitchell',
        'Samuel Nash',
    ]
})