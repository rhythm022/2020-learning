// ./src/index.js

import createCheckbox from './heading.js'
import css from "./styles.css";
import favicon from "../static/favicon.jpg";

let box = createCheckbox()


const img = new Image()
img.src = favicon
document.body.append(img)
document.body.append(box)

module.hot.accept('../static/favicon.jpg', () => {
  img.src = favicon

})

module.hot.accept('./heading.js', () => {
  document.body.removeChild(box) // 移除之前创建的元素
  const originState = box.value

  box = createCheckbox() // 用新模块创建新元素
  box.setAttribute('value', originState)
  document.body.appendChild(box)

})

