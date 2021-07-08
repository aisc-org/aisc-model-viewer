import { App, Model, HtmlItem } from '../app'

// Models
import pathToCaseA from './Wide-flange-column-models-W8x31-Case-A.glb'
import pathToCaseB from './Wide-flange-column-models-W8x31-Case-B.glb'
import pathToCaseC from './Wide-flange-column-models-W8x31-Case-C.glb'
import pathToCaseD from './Wide-flange-column-models-W8x31-Case-D.glb'
import pathToCaseE from './Wide-flange-column-models-W8x31-Case-E.glb'
import pathToCaseF from './Wide-flange-column-models-W8x31-Case-F.glb'
import pathToFlangeLB from './Wide-flange-column-models-W8x31-Flange-LB.glb'
import pathToMajorFB from './Wide-flange-column-models-W8x31-Major-FB.glb'
import pathToMinorFBMode2 from './Wide-flange-column-models-W8x31-Minor-FB-Mode-2.glb'
import pathToTB from './Wide-flange-column-models-W8x31-TB.glb'
import pathToWebLB from './Wide-flange-column-models-W8x31-Web-LB.glb'

// Content
const aiscTable = '<img src="./AISC-360-Table-C-A-7.1.png"></img>'
import commentary from './commentary.md'
import moreFun from './more-fun.md'

// Assets
import './AISC-360-Table-C-A-7.1.png'
import './W14x159.jpg'


new App({
    title: 'Buckling of Wide-flange Columns',
    groups: [
        {
            name: 'minor-axis flexural',
            items: [
                new HtmlItem({name: 'Table C-A-7.1', content: aiscTable, classes: ['full-width'] }),
                new Model({
                    name: 'Case A',
                    path: pathToCaseA,
                    desc: "<i>K</i> = 0.5 (theoretical), <i>K</i> = 0.65 (design)",
                }),
                new Model({
                    name: 'Case B',
                    path: pathToCaseB,
                    desc: "<i>K</i> = 0.7 (theoretical), <i>K</i> = 0.8 (design)",
                }),
                new Model({
                    name: 'Case C',
                    path: pathToCaseC,
                    desc: "<i>K</i> = 1.0 (theoretical), <i>K</i> = 1.0 (design)",
                }),
                new Model({
                    name: 'Case D',
                    path: pathToCaseD,
                    desc: "<i>K</i> = 1.0 (theoretical), <i>K</i> = 1.2 (design)",
                }),
                new Model({
                    name: 'Case E',
                    path: pathToCaseE,
                    desc: "<i>K</i> = 2.0 (theoretical), <i>K</i> = 2.1 (design)",
                }),
                new Model({
                    name: 'Case F',
                    path: pathToCaseF,
                    desc: "<i>K</i> = 2.0 (theoretical), <i>K</i> = 2.0 (design)",
                }),
            ]
        },
        {
            name: 'braced column',
            items: [
                new Model({
                    name: 'Minor-axis flexural',
                    title: 'Minor-axis flexural buckling (braced)',
                    path: pathToMinorFBMode2,
                }),
                new Model({
                    name: 'Major-axis flexural',
                    title: 'Major-axis flexural buckling (braced)',
                    path: pathToMajorFB,
                }),
                new Model({
                    name: 'Torsional',
                    title: 'Torsional buckling (braced)',
                    path: pathToTB,
                    maxScale: 3.5,
                }),
            ]
        },
        {
            name: 'local',
            items: [
                new Model({
                    name: 'Flange',
                    title: 'Flange local buckling',
                    path: pathToFlangeLB,
                    maxScale: 5,
                }),
                new Model({
                    name: 'Web',
                    title: 'Web local buckling',
                    path: pathToWebLB,
                    maxScale: 3.5,
                }),
            ]
        },
        {
            name: 'more',
            items: [
                new HtmlItem({ name: 'Commentary', content: commentary }),
                new HtmlItem({ name: 'More fun!', content: moreFun }),
            ]
        },
    ],
    addGuideLink: false,
    contributors: [
        'Michael Hadley',
        'Peter Talley',
        'Mark Denavit',
    ],
});

Model.viewer.edgeThresholdAngle = 50
