import{App, HtmlItem, Model } from '../app'

//Calculations
import FlangePlateCalcs from './Flange_Plated_Moment_Connection_Calculation.md'

//Models
import FlangePlateModel from './Flange Plated Moment GLB.glb'

new App({
    title: 'Flange Plated Moment Connection',
    groups:[
        {
            name: 'models',
            items: [
                new Model({ name: 'Flange Plated Moment Connection Model', path: FlangePlateModel })
            ]
        },
        {
            name: 'Calculations',
            items: [
                new HtmlItem({ name: 'Calculations', content: FlangePlateCalcs })
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