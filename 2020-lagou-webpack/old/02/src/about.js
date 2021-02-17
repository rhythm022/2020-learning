import createHeading from './heading.js'
const heading = createHeading()
document.body.append(heading)
import './style.css'
import '../pad'



console.log((666).pad(3))








console.log(createHeading)
if (module.hot) {
  module.hot.accept('./heading.js', function() {
    console.log(createHeading);
  })
}








// import about from './about.md'
//
// console.log(about)
