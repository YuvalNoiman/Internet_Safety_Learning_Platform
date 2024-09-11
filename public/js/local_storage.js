// Check local storage maybe move to file
let localTheme = localStorage.getItem('theme')
themeToSet = localTheme
let localFontSize = localStorage.getItem('fontSize')
fontSize = localFontSize
let localFont = localStorage.getItem('font')
font = localFont

// If local storage is not set, we check OS preference
if (!localTheme){
  themeToSet = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

if (!localFontSize){
  fontSize = 'small'
}

if (!localFont){
  font = 'sans serif'
}
//if (localS == 'dark'){
//    document.documentElement.setAttribute('data-theme', 'dark')
//}

//Set the correct theme
document.documentElement.setAttribute('data-theme', themeToSet)
document.documentElement.setAttribute('font-size', fontSize)
document.documentElement.setAttribute('font', font)