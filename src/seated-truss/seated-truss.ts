import{App, HtmlItem, Model } from '../app'

//Calculations
import SeatedTrussCalcs from './Seated_Truss_Connection_Calculation.md'

//Models
import pathToModel from './SeatedTruss.glb'
new App({
    title: 'Seated Truss',
    groups:[
        {
            name: 'models',
            items: [
                new Model({ name: 'Seated Truss Model', path: pathToModel })
            ]
        },
        {
            name: 'Calculations',
            items: [
                new HtmlItem({ name: 'Calculations', content: SeatedTrussCalcs}),
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