const generateBtn = document.querySelector('.generate-btn');
const lockBtns = document.querySelectorAll('.fa-unlock-alt');
const unlockBtns = document.querySelectorAll('.fa-lock');
const savePaletteBtn = document.querySelector('.save-btn');
const deleteBtn = document.querySelector('.delete-btn');
let colorOne = document.querySelector('.color1');
let colorTwo = document.querySelector('.color2');
let colorThree = document.querySelector('.color3');
let colorFour = document.querySelector('.color4');
let colorFive = document.querySelector('.color5');
let hexOne = document.querySelector('.hex1');
let hexTwo = document.querySelector('.hex2');
let hexThree = document.querySelector('.hex3');
let hexFour = document.querySelector('.hex4');
let hexFive = document.querySelector('.hex5');
const saveProjectBtn = document.querySelector('.save-project-btn');
let projectDisplay = document.querySelector('.project-display');
const projectNameInput = document.querySelector('.project-name-input');
const select = document.querySelector('select');
const paletteNameInput = document.querySelector('.palette-name-input');
let savedColorsDisplay = document.querySelector('.saved-colors-display');

displayColors()
fetchAllProjects()


generateBtn.addEventListener('click', displayColors)
lockBtns.forEach((button) => {
  button.addEventListener('click', toggleLock)
})
saveProjectBtn.addEventListener('click', saveProject)
savePaletteBtn.addEventListener('click', savePalette)



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

function fetchAllProjects() {
  fetch('/api/v1/projects')
  .then(response => response.json())
  .then(projects => fetchPalettes(projects))
  .catch(error => console.log(error))
}

function fetchPalettes(projects) {
  displayProjects(projects)
  let projectIds = projects.map((project) => {
    return project.id
  })
  projectIds.forEach((projectId) => {
    fetch(`/api/v1/projects/${projectId}`)
    .then(response => response.json())
    .then(palettes => displayPalettes(palettes, projectId))
    .catch(error =>console.log(error))
  })
}


// function fetchAllPalettes() {
//   fetch('/api/v1/projects')
//   .then(response => response.json())
//   .then(palettes => console.log(palettes))
//   .catch(error => console.log(error))
// } 


function saveProject() {
  const projectName = projectNameInput.value
  fetch('/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({project: {
      name: projectName
    }}), 
    headers:  {
    'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(project => fetchAllProjects())
    .catch(error => console.log(error)) 
    projectNameInput.value = '' 
}

function displayProjects(projects) {
  projectDisplay.innerHTML = ''
    addToDropDown(projects)
    projects.forEach((project) => {
      var newProject = document.createElement('div')
      newProject.innerHTML = `<div class="project-name-header">
      <p class="project-name">${project.name}</p>
      </div>
      <div class="color-and-delete-container">
        <div class="color-and-delete-container" id=${project.id}></div>
      </div>`
    projectDisplay.appendChild(newProject)
    })
}

function displayPalettes(palettes, projectId) {
  let colorsDisplay = document.getElementById(`${projectId}`)
  colorsDisplay.innerHTML = ''
  palettes.forEach((palette) => {
    var newPalette = document.createElement('div')
    newPalette.classList.add('saved-colors-display')
   newPalette.innerHTML = `<div class="saved-color" style= "background:${palette.color_1}"></div>
   <div class="saved-color" style= "background:${palette.color_2}"></div>
   <div class="saved-color" style= "background:${palette.color_3}"></div>
   <div class="saved-color" style= "background:${palette.color_4}"></div>
   <div class="saved-color" style= "background:${palette.color_5}"></div>
   <div class="delete-display">
    <p class="palette-name">${palette.palette_name}</p>
   <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
 </div>`
   colorsDisplay.appendChild(newPalette)
  })
}

function addToDropDown(projects) {
  select.innerHTML = ''
  select.options.length = projects.length;
  for (let i=0; i<projects.length; i++) {
    select.options[i] = new Option(`${projects[i].name}`, `${projects[i].id}`)
  }
}

function savePalette() {
  const id = select.value
  const paletteName = paletteNameInput.value
  fetch(`/api/v1/projects/${id}/palettes`, {
    method: 'POST',
    body: JSON.stringify({palette: {
      palette_name: paletteName,
      color_1: hexOne.innerText,
      color_2: hexTwo.innerText,
      color_3: hexThree.innerText,
      color_4: hexFour.innerText,
      color_5: hexFive.innerText
    }}), 
    headers:  {
    'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(palette => fetchAllProjects())
    .catch(error => console.log(error))  
    paletteNameInput.value = ''
}





