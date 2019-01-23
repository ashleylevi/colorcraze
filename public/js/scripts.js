const generateBtn = document.querySelector('.generate-btn');
const lockBtns = document.querySelectorAll('.fa-unlock-alt');
const unlockBtns = document.querySelectorAll('.fa-lock');
const saveBtn = document.querySelector('.save-btn');
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

generateHex = () => {
  let color = '#';
  for (let i=0; i < 6; i++) {
    let hexValues = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F' ]
    let value = hexValues[Math.floor(Math.random() *16)]
    color+= value
  }
  return color
}

generateColors = () => {
  let colors = [];
  for (let i=0; i < 5; i++) {
    let color = generateHex()
    colors.push(color)
  }
  return colors
}

displayColors = () => {
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
  if (!colorOne.classList.contains('locked')) {
    colorFive.setAttribute('style', `background-color: ${colors[4]}`) 
    hexFive.innerText = colors[4]
  }
}

toggleLock = (e) => {
    e.target.classList.toggle('fa-unlock-alt')
    e.target.classList.toggle('fa-lock')
    e.target.parentElement.classList.toggle('locked')
}

generateBtn.addEventListener('click', displayColors)
lockBtns.forEach((button) => {
  button.addEventListener('click', toggleLock)
})
