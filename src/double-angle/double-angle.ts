import { App, HtmlItem, Model } from '../app'
import { siteRoot } from '../utils'
import pathToModel from './Neyland Connection (centered).glb'
import pathToNetSection from './Neyland Connection - NET SECTION.glb'
import pathToBlockShear from './Neyland Connection - BLOCK SHEAR 2.glb'
import pathToCalcs from './calculations.html'
import pathToMoreFun from './more_fun.html'
import pathToPhoto from './Photo.html'
import './Photo.jpg'
import './double-angle.svg'

const app = new App({
    title: 'Double Angle Connection',
    groups: [
        {
            name: 'models',
            items: [
                new Model({name: '3d model', path: pathToModel}),
                new Model({name: 'Net section rupture', path: pathToNetSection}),
                new Model({name: 'Block shear', path: pathToBlockShear}),
            ]
        },
        {
            name: 'yay links',
            items: [
                new HtmlItem({name: 'Calculations', url: siteRoot + pathToCalcs}),
                new HtmlItem({name: 'More fun', url: siteRoot + pathToMoreFun}),
                new HtmlItem({name: 'Photo', url: siteRoot + pathToPhoto}),
            ]
        }
    ]
})
