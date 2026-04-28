import { App, HtmlItem, Model } from '../app'

// Model files
import pathToModel from './Sculture_glf_test2.glb'

// Content
import commentary from './commentary.md'
import './GonzagaSpires.jpg'


new App({
    title: 'AISC Steel Sculpture',
    groups:[
        { 
            name: 'Models',
            items: [
                new Model({ name: 'AISC Steel Sculpture',path: pathToModel }),
            ]
        },
        {
            name: 'Commentary',
            items: [
                new HtmlItem({
                    name: 'commentary', content: commentary
                }),
            ]
        },
    ],
    addGuideLink: false,
    contributors: [
        'Samuel Leman',
        'Sophia Mitchell',
        'Samuel Nash',  
    ]
})