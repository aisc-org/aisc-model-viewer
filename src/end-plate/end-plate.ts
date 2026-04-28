import{App, HtmlItem, Model } from '../app'

//Calculations
import EndPlateCalcs from './End_Plate_Moment_Connection_Calculation.md'

//Models
import EndPlateModel from './End Plate Moment GLB.glb'

new App({
    title: 'End Plate Connection',
    groups:[
        {
            name: 'models',
            items: [
                new Model({ name: 'End Plate Connection Model', path: EndPlateModel })
            ]
        },
        {
            name: 'Calculations',
            items: [
                new HtmlItem({ name: 'Calculations', content: EndPlateCalcs })
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