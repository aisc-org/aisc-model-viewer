import{App, HtmlItem, Model } from '../app'

// Model
import pathToModel from './Double Angle GLB.glb'

// Calculations
import doubleAngleCalcs from './DoubleAngleCalcs_Calculation.md'
new App({
    title: 'Double Angle Connection',
    groups:[
        {
            name: 'models',
            items: [
                new Model({ name: 'Double Angle Model', path: pathToModel })
            ]
        },
        {
            name: 'Calculations',
            items: [
                new HtmlItem({ name: 'Calculations', content: doubleAngleCalcs })
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