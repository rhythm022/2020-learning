import createHeading from './heading.js'
const heading = createHeading()
// document.body.append(heading)

// import './style.css'

import '../pad/index.js'
console.log((666).pad(3))

import p from '../package.json'
console.log(p);



import {camelCase} from 'lodash-es'
console.log(camelCase('HelloWorld'));


import axios from 'axios'
console.log(axios.defaults);




console.log(createHeading)
// if (module.hot) {
//   module.hot.accept('./heading.js', function() {
//     console.log(createHeading);
//   })
// }








// import about from './about.md'
//
// console.log(about)
