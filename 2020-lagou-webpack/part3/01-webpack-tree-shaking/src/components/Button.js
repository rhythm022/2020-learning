// ./src/heading.js


console.log('sideEffects~Button')
export default () => {

    const element = document.createElement('h2')
  
    element.textContent = 'Hello webpack'
  
    element.addEventListener('click', () => alert('Hello webpack'))
  
    return element
  
  }
  

  export const unReference = 'unReference'