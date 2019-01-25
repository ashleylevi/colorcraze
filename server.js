const environment = process.env.NODE_ENV || "development"
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Colorcraze'

app.use(express.static('public'))


//get all projects
app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects)
    })
    .catch((error) => {
      response.status(500).json({ error });
    })
})

//get all palettes
app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
    .then((palettes) => {
      response.status(200).json(palettes)
    })
    .catch((error) => {
      response.status(500).json({ error });
    })
})

//get all palettes for a specific project
app.get('/api/v1/projects/:id', (request, response) => {
  const id = parseInt(request.params.id)
  database('palettes').select()
    .then((palettes) => {
      const matchingPalettes = palettes.filter((palette) => {
        return palette.project_id === id
      })
      response.status(200).json(matchingPalettes)
    })
    .catch((error) => {
      response.status(500).json({ error });
    })

})

// get a specific palette from a project
app.get('/api/v1/projects/:id/palettes/:palette_id', (request, response) => {
  const paletteId = parseInt(request.params.palette_id)
  database('palettes').select()
    .then((palettes) => {
      const matchingPalette = palettes.find((palette) => {
        return palette.id === paletteId
      })
      response.status(200).json(matchingPalette)
    })
    .catch((error) => {
      response.status(500).json({ error });
    })
})

//post a new project
app.post('/api/v1/projects', (request, response) => {
  const { project } = request.body;
  
  for (let requiredParameter of ['name']){
    if (!project[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: {name: <string>}. You're missing a "${requiredParameter}" property`})
    }
  }

  database('projects').insert(project, 'id')
    .then(projectId => {
      response.status(201).json({...project, id: projectId[0] })
    })
    .catch(error => {
      response.status(500).json({ error})
    });
})

//post a new palette
app.post('/api/v1/projects/:id/palettes', (request, response) => {
  const { palette } = request.body;
  const project_id = parseInt(request.params.id)
  
  for (let requiredParameter of ['palette_name', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5']){
    if (!palette[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: {palette_name: <string>, color_1: <string>, color_2: <string>, color_3: <string>, color_4: <string>, color_5: <string>}. You're missing a "${requiredParameter}" property`})
    }
  }

  database('palettes').insert({...palette, project_id}, 'id')
    .then(paletteId => {
      response.status(201).json({...palette, id: paletteId[0] })
    })
    .catch(error => {
      response.status(500).json({ error})
    });
})

//delete a palette from a project
app.delete('/api/v1/palettes/:id', (request, response) => {

  const palette_id = parseInt(request.params.id)

  database('palettes').where('id', palette_id).delete()
    .then(palette => {
      response.status(201).json({ id: palette[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })


  // database('palettes').select()
  //   .then((palettes) => {
  //     const filteredPalettes = palettes.filter((palette) => {
  //       return palette.id !== palette_id
  //     })
  //     response.status(200).json(filteredPalettes)
  //   })
  //   .catch((error) => {
  //     response.status(500).json({ error });
  //   })
})


app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});

