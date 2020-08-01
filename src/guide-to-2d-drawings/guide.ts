import { App, HtmlItem } from '../app'

// Content
import typesOfDrawings from './types-of-drawings.md'
import linework from './linework.md'
import boltsAndWelds from './bolts-and-welds.md'
import abbreviations from './abbreviations.md'

// Images/assets
import './linework-3d.svg'
import './linework-top.svg'
import './linework-side.svg'
import './weld-symbols-1.svg'
import './weld-symbols-2.svg'
import './weld-symbols-3.svg'


new App({
    title: 'Guide to 2D drawings',
    groups: [
        {
            name: '',
            items: [
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
    ],
    addGuideLink: false,
})
