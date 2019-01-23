const generateBtn = document.querySelector('.generate-btn');
const lockBtn = document.querySelector('.fa-unlock-alt');
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
  colorOne.setAttribute('style', `background-color: ${colors[0]}`)
  hexOne.innerText = colors[0]
  colorTwo.setAttribute('style', `background-color: ${colors[1]}`)
  hexTwo.innerText = colors[1]
  colorThree.setAttribute('style', `background-color: ${colors[2]}`)
  hexThree.innerText = colors[2]
  colorFour.setAttribute('style', `background-color: ${colors[3]}`)
  hexFour.innerText = colors[3]
  colorFive.setAttribute('style', `background-color: ${colors[4]}`) 
  hexFive.innerText = colors[4]
}

generateBtn.addEventListener('click', displayColors)