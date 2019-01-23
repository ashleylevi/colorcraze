const generateBtn = document.querySelector('.generate-btn');
const lockBtn = document.querySelector('.fa-unlock-alt');
const saveBtn = document.querySelector('.save-btn');
const deleteBtn = document.querySelector('.delete-btn');

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