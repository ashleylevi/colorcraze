const generateBtn = document.querySelector('.generate-btn');
const lockBtns = document.querySelectorAll('.fa-unlock-alt');
const unlockBtns = document.querySelectorAll('.fa-lock');
const savePaletteBtn = document.querySelector('.save-btn');
const deleteBtn = document.querySelector('.delete-btn');
const colorOne = document.querySelector('.color1');
const colorTwo = document.querySelector('.color2');
const colorThree = document.querySelector('.color3');
const colorFour = document.querySelector('.color4');
const colorFive = document.querySelector('.color5');
const hexOne = document.querySelector('.hex1');
const hexTwo = document.querySelector('.hex2');
const hexThree = document.querySelector('.hex3');
const hexFour = document.querySelector('.hex4');
const hexFive = document.querySelector('.hex5');
const saveProjectBtn = document.querySelector('.save-project-btn');
const projectDisplay = document.querySelector('.project-display');

displayColors()
getProjects()
// displayAllProjects()

generateBtn.addEventListener('click', displayColors)
lockBtns.forEach((button) => {
  button.addEventListener('click', toggleLock)
})
saveProjectBtn.addEventListener('click', createProject)



function generateHex() {
  let color = '#';
  for (let i=0; i < 6; i++) {
    let hexValues = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F' ]
    let value = hexValues[Math.floor(Math.random() *16)]
    color+= value
  }
  return color
}

function generateColors() {
  let colors = [];
  for (let i=0; i < 5; i++) {
    let color = generateHex()
    colors.push(color)
  }
  return colors
}

function displayColors() {
  let colors = generateColors()
  if (!colorOne.classList.contains('locked')) {
    colorOne.setAttribute('style', `background-color: ${colors[0]}`)
    hexOne.innerText = colors[0]
  }
  if (!colorTwo.classList.contains('locked')) {
    colorTwo.setAttribute('style', `background-color: ${colors[1]}`)
    hexTwo.innerText = colors[1]
  }
  if (!colorThree.classList.contains('locked')) {
    colorThree.setAttribute('style', `background-color: ${colors[2]}`)
    hexThree.innerText = colors[2]
  }
  if (!colorFour.classList.contains('locked')) {
    colorFour.setAttribute('style', `background-color: ${colors[3]}`)
    hexFour.innerText = colors[3]
  }
  if (!colorFive.classList.contains('locked')) {
    colorFive.setAttribute('style', `background-color: ${colors[4]}`) 
    hexFive.innerText = colors[4]
  }
}

function toggleLock(e) {
    e.target.classList.toggle('fa-unlock-alt')
    e.target.classList.toggle('fa-lock')
    e.target.parentElement.classList.toggle('locked')
}

function createProject() {


//   let newProject = document.createElement('div')
//   newProject.innerHTML = `<div class="project-name-header">
//   <p class="project-name">project one</p>
// </div>
// <div class="color-and-delete-container">
//   <div class="saved-colors-display">
//     <div class="saved-color"></div>
//     <div class="saved-color"></div>
//     <div class="saved-color"></div>
//     <div class="saved-color"></div>
//     <div class="saved-color"></div>
//   <div class="delete-display">
//     <p class="palette-name">palette name</p>
//     <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
//   </div>
// </div>`
//   projectDisplay.appendChild(newProject)
}

function getProjects() {
  fetch('/api/v1/projects')
    .then(response => response.json())
    .then(projects => displayProjects((projects)))
}

function displayProjects(array) {
  let newProject = document.createElement('div')
  array.forEach((project) => {
    newProject.innerHTML = `<div class="project-name-header">
    <p class="project-name">${project.name}</p>
    </div>`
  projectDisplay.appendChild(newProject)
  })
}


    // let nonDuplicateProjects = []
    // fetch('/api/v1/projects')
    //   .then(response => response.json())
    //   .then(projects => projects.forEach((project) => {
    //     if(!nonDuplicateProjects.includes(project)) {
    //       nonDuplicateProjects.push(project)
    //     }
    //   }))
    //   nonDuplicateProjects.forEach((proj) => {
    //     let newProject = document.createElement('div')
    //     newProject.innerHTML = `<div class="project-name-header">
    //     <p class="project-name">${proj.name}</p>
    //     </div>`
    //   projectDisplay.appendChild(newProject)
    
    //   })


function getPalettes() {
  fetch('/api/v1/palettes')
    .then(response => response.json())
    .then(palettes => console.log(palettes) )
    .catch(error => console.log(error))
}

function displayAllProjects() {
  const projects = getProjects()
  const palettes = getPalettes()
  projects.forEach((project) => {
    let newProject = document.createElement('div')
    newProject.innerHTML = `<div class="project-name-header">
  <p class="project-name">${project.name}</p>
</div>
<div class="color-and-delete-container">
  <div class="saved-colors-display">
    <div class="saved-color"></div>
    <div class="saved-color"></div>
    <div class="saved-color"></div>
    <div class="saved-color"></div>
    <div class="saved-color"></div>
  <div class="delete-display">
    <p class="palette-name">palette name</p>
    <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
  </div>
</div>`
  projectDisplay.appendChild(newProject)


  })
}



