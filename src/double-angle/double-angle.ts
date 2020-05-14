import { App, HtmlItem, Model } from '../app'
import { siteRoot } from '../utils'
import pathToModel from './Neyland Connection (centered).glb'
import pathToNetSection from './Neyland Connection - NET SECTION.glb'
import pathToBlockShear from './Neyland Connection - BLOCK SHEAR 2.glb'
import pathToCalcs from './calculations.html'
import pathToDrawing from './2d-drawing.html'
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
                new Model({name: '3D model', path: pathToModel}),
                new Model({name: 'Tensile rupture', path: pathToNetSection}),
                new Model({name: 'Block shear rupture', path: pathToBlockShear}),
            ]
        },
        {
            name: 'more',
            items: [
                new HtmlItem({name: 'Calculations', url: siteRoot + pathToCalcs}),
                new HtmlItem({name: '2D structural drawing', url: siteRoot + pathToDrawing}),
                new HtmlItem({name: 'Photo', url: siteRoot + pathToPhoto}),
                new HtmlItem({name: 'More fun!', url: siteRoot + pathToMoreFun}),
            ]
        }
    ]
})
