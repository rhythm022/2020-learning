import createHeading from './heading.js'
const heading = createHeading()
document.body.append(heading)
import './style.css'

import '../pad'
console.log((5).pad(3))

import axios from 'axios'
console.log(axios);

console.log(
    API_BASE_URL
)




console.log(createHeading)
if (module.hot) {
  module.hot.accept('./heading.js', function() {
    console.log(createHeading);
  })
}








// import about from './about.md'
//
// console.log(about)
