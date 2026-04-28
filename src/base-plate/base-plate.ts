import{ App, HtmlItem, Model } from '../app'

//Calculations
import BasePlateCalcs from './base_plate_Calculation.md'

//Models
import pathToModel from './Base Plate GLB.glb'

new App({
    title: 'Base Plate Connection',
    groups:[
        {
            name: 'models',
            items: [
                new Model({ name: 'Base Plate', path: pathToModel })
            ]
        },
        {
            name: 'calculations',
            items: [
                new HtmlItem({ name: 'calculations', content: BasePlateCalcs })
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