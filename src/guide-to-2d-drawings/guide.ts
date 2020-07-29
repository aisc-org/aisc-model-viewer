import { App, HtmlItem } from '../app'

// Content
import guideLanding from './guide-to-2d-drawings.md'
import typesOfDrawings from './types-of-drawings.md'
import linework from './linework.md'
import boltsAndWelds from './bolts-and-welds.md'
import abbreviations from './abbreviations.md'

// Images/assets
// import '/relative/path/to/asset.ext'


new App({
    title: 'Guide to 2D drawings',
    groups: [
        {
            name: '',
            items: [
                new HtmlItem({ name: 'Landing', content: guideLanding }),
                new HtmlItem({ name: 'Types of drawings', content: typesOfDrawings }),
                new HtmlItem({ name: 'Linework', content: linework }),
                new HtmlItem({ name: 'Bolts and welds', content: boltsAndWelds }),
                new HtmlItem({ name: 'Abbreviations', content: abbreviations }),
            ]
        }
    ],
    contributors: [
        'Mark Denavit',
        'Peter Talley',
    ]
})
