const environment = process.env.NODE_ENV || "development"
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

// app.set('port', process.env.PORT || 3000)
app.locals.title = 'Colorcraze'

app.use(express.static('public'))

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
    color_2: '#1E4A77',
    color_3: '#EC90A9',
    color_4: '#EC62D4',
    color_5: '#901346',
  },
  {
    id: 3,
    project_id: 2,
    color_1: '#BCD04E',
    color_2: '#326F64',
    color_3: '#28E5B4',
    color_4: '#289FD3',
    color_5: '#134D26',
  }
]

//works
app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects)
    })
    .catch((error) => {
      response.status(500).json({ error });
    })
  // const projects = app.locals.projects
  // response.status(200).json({projects})
})

//works
app.get('/api/v1/palettes', (request, response) => {
  const palettes = app.locals.palettes
  response.status(200).json({palettes})
})

//works
app.get('/api/v1/projects/:id', (request, response) => {
  const id = parseInt(request.params.id)
   const palettes = app.locals.palettes
  const matchingProject = app.locals.projects.find((project) => {
    return project.id === id
  })
  const matchingPalettes = palettes.filter((palette) => {
    return palette.project_id === id
  })

  if (matchingPalettes.length > 0) {
    response.status(200).json({matchingPalettes})
  } else {
    response.sendStatus(404)
  }
})

// works
app.get('/api/v1/palettes/:id', (request, response) => {
  const id = parseInt(request.params.id)
  console.log(id)
  const matchingPalette = app.locals.palettes.find((palette) => {
    return palette.id === id
  })
  if (matchingPalette) {
    response.status(200).json({matchingPalette})
  } else {
    response.sendStatus(404)
  }
})

//this works
app.post('/api/v1/projects', (request, response) => {
  const project = request.body.project
  const id = Date.now() 
  if (project) {
    app.locals.projects.push({...project, id})
    response.status(201).json({...project, id})
  } else {
    response.status(422).send({
      error: 'No palette provided'
    })
  }
})

//this works
app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body.palette
  const id = Date.now() 
  if (palette) {
    app.locals.palettes.push({...palette, id})
    response.status(201).json({...palette, id})
  } else {
    response.status(422).send({
      error: 'No palette provided'
    })
  }
})

//this works
app.delete('/api/v1/palettes/:id', (request, response) => {
  const id = parseInt(request.params.id)
  let filteredPalettes = app.locals.palettes.filter((palette) => {
    return palette.id !== id
  })
  app.locals.palettes = filteredPalettes
  response.status(200).json({filteredPalettes})
})


app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});


// {	"palette": {
//   "project_id": "2",
//   "color_1": "#000000",
//   "color_2": "#FFFFFF",
//   "color_3": "#BBBBBB",
//   "color_4": "#000000",
//   "color_5": "#FFFFFF"
// }
// }