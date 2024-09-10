const sidebar = document.getElementById("sidebar")

function toggleSidebar(){
 sidebar.classList.toggle('show')
}
//Add event listener for side bar
document.querySelector('#theme-switch').addEventListener('click', toggleSidebar)