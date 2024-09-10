const toggleSidebar = () => {
  const sidebar = document.getElementById("sidebar")
  sidebar.classList.toggle('show')
}
//Add event listener for side bar
document.querySelector('#side-button').addEventListener('click', toggleSidebar)