import{ App, Model, HtmlItem } from '../app'

//Model
import pathToModel from './Column Splice GLB.glb'

//Calculations
import columnSpliceCalcs from './Column_Splice_Calculation.md'

new App({
    title: 'Column Splice Connection',
    groups:[
        {
            name: 'models',
            items: [
                new Model({ name: 'Column Splice', path: pathToModel })
            ]
        },
        {
            name: 'calculations',
            items: [
                new HtmlItem({ name: 'calculations', content: columnSpliceCalcs })
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