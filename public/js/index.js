
// function for side nav
document.addEventListener("DOMContentLoaded", function () {
  // Sidenav Initialization
  const menus = document.querySelector(".sidenav");
  M.Sidenav.init(menus, { edge: "right" });
  //Add Tasks
  const forms = document.querySelector(".side-form");
  M.Sidenav.init(forms, { edge: "left" });
});


//Function for button click
const button25s = document.getElementById('button25s');

button25s.addEventListener('click', () => {
  const message= "25 Second button clicked!"
  console.log(message);
  //send data to Back-end using fetch
  fetch('/', {
    method: 'POST',
    body: JSON.stringify( {
      data: message
    }),
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => response.json())
  .then(data => console.log('Success', data))
  .catch(error => console.error('Error:', error));
})