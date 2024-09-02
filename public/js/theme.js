//Switch function
const switchTheme = () => {
  // Get root element and data-theme value
  const rootElem = document.documentElement
  let dataTheme = rootElem.getAttribute('data-theme'),
    newTheme

  newTheme = (dataTheme == 'light') ? 'dark' : 'light'

  // Set the new HTML attribute
  rootElem.setAttribute('data-theme', newTheme)

  //Set the new local storage item
  localStorage.setItem('theme', newTheme)
}

//Add event listener for theme switch
document.querySelector('#theme-switch').addEventListener('click', switchTheme)