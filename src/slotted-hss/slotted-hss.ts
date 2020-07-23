import { App, HtmlItem, Model } from '../app'

import pathToModel from './Slotted HSS Connection.glb'

import calculations from './calculations.md'
import moreFun from './more-fun.md'

new App({
    title: 'Slotted HSS Connection',
    groups: [
        {
            name: 'models',
            items: [
                new Model({ name: '3D model', path: pathToModel }),
            ]
        },
        {
            name: 'more',
            items: [
                new HtmlItem({ name: 'Calculations', content: calculations }),
                new HtmlItem({ name: 'More fun!', content: moreFun })
            ]
        }
    ]
})
