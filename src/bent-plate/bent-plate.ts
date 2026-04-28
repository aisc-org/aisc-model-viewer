import {App, HtmlItem, Model } from '../app'

//Models
import pathToModel from './Bent Plate GLB.glb'

//Calculations
import BentPlateCalcs from './BentPlateCnxnCalc_Calculation.md'

new App({
    title: 'Bent Plate',
    groups:[
        {
            name: 'models',
            items: [
                new Model({ name: 'Bent Plate', path: pathToModel })
            ]
        },
        {
            name: 'calculations',
            items: [
                new HtmlItem({ name: 'calculations', content: BentPlateCalcs })
            ]
        },
    ],
    addGuideLink: false,
    contributors:[
        'Samuel Leman',
        'Sophia Mitchell',
        'Samuel Nash',
    ]
})