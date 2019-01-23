const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

// app.set('port', process.env.PORT || 3000)
app.locals.title = 'Colorcraze'

app.use(express.static('public'));

app.locals.projects = [
  {
    id: 1,
    name: 'Project 1'
  },
  {
    id: 2,
    name: 'Project 2'
  },
  {
    id: 3,
    name: 'Project 3'
  }

]

app.locals.palettes = [
  {
    id: 1,
    project_id: 1,
    color_1: '#0E9ABC',
    color_2: '#AA3916',
    color_3: '#5BAFDF',
    color_4: '#289FD3',
    color_5: '#6EA952',
  },
  {
    id: 2,
    project_id: 1,
    color_1: '#5616D1',
    color_2: '#4C74A8',
    color_3: '#0ADFC5',
    color_4: '#4D57D7',
    color_5: '#E36A76',
  },
  {
    id: 3,
    project_id: 2,
    color_1: '#1830E0',
    color_2: '#C3319A',
    color_3: '#28E5B4',
    color_4: '#289FD3',
    color_5: '#134D26',
  }
]

app.get('/api/v1/projects', (request, response) => {
  const projects = app.locals.projects
  response.json({projects})
})

app.get('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params
  const palettes = app.locals.palettes
  const matchingPalettes = palettes.filter((palette) => {
    return palette.project_id === parseInt(id)
  })
  response.json({matchingPalettes})
})


app.post('/api/v1/projects', (request, response) => {
  const { project } = request.body
  const id = Date.now() 
  if (project) {
    app.locals.projects.push({...project, id})
    response.status(201).json({id, project})
  } else {
    response.status(422).send({
      error: 'No Project'
    })
  }
})

app.post('/api/v1/projects/:project_id/palettes', (request, response) => {
  const { palette } = request.body
  const id = Date.now() 
  const { project_id } = request.params
  if (palette) {
    app.locals.palettes.push({...palette, id, project_id})
    response.status(201).json({id, palette, project_id})
  } else {
    response.status(422).send({
      error: 'No Palette'
    })
  }
})

app.delete('/api/v1/projects/:project_id/palettes/:id', (request, response) => {
  const { id } = request.params
  let filteredPalettes = app.locals.palettes.filter((palette) => {
    return palette.id !== id
  })
  app.locals.palettes = filteredPalettes
  response.json({filteredPalettes})
})


app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});