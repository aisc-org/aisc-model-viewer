import { App, HtmlItem } from '../app'

// Content
import guideLanding from './guide-to-2d-drawings.md'

// Images/assets
// import '/relative/path/to/asset.ext'


new App({
    title: 'Guide to 2D drawings',
    groups: [
        {
            name: '',
            items: [
                new HtmlItem({ name: 'Landing', content: guideLanding }),
            ]
        }
    ],
    contributors: [
        'Mark Denavit',
        'Peter Talley',
    ]
})
