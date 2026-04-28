import{App, HtmlItem, Model } from '../app'

//Calculations
import DirectWeldCalcs from './Directly_Welded_Flange_Calculation.md'

//Models
import pathToModel from './Directly Welded Flange Moment GLB.glb'

new App({
    title: 'Directly Welded Flange Moment Connection',
    groups:[
        {
            name: 'models',
            items: [new Model({ name: 'Directly Welded Flange Moment', path: pathToModel })
            ]
        },
        {
            name: 'calculations',
            items: [new HtmlItem({ name: 'calculations', content: DirectWeldCalcs })]
        }
    ],
    addGuideLink: false,
    contributors:[
        'Samuel Leman',
        'Sophia Mitchell',
        'Samuel Nash',
    ]
})