let projectsData = [{
  name: 'Project 1',
  palettes: [{
    palette_name: 'cool colors',
    color_1: '#0E9ABC',
    color_2: '#AA3916',
    color_3: '#4C74A8',
    color_4: '#0ADFC5',
    color_5: '#6EA952'
  },
  {
    palette_name: 'warm colors',
    color_1: '#1830E0',
    color_2: '#5616D1',
    color_3: '#A6970A',
    color_4: '#732FA6',
    color_5: '#289FD3'
  }]
},
{
  name: 'Project 2',
  palettes: [{
    palette_name: 'great colors',
    color_1: '#134D26',
    color_2: '#326F64',
    color_3: '#4C74A8',
    color_4: '#0ADFC5',
    color_5: '#6EA952'
  },
  {
    palette_name: 'amazing colors',
    color_1: '#F1E523',
    color_2: '#0A6A36',
    color_3: '#BC06EF',
    color_4: '#DBF2C9',
    color_5: '#AF9256'
  }]
}]

const createProject = (knex, project) => {
  return knex('projects').insert({
    name: project.name
  }, 'id')
  .then(projectId => {
    let palettePromises = [];

    project.palettes.forEach(palette => {
      palettePromises.push(
        createPalette(knex, {...palette, project_id: projectId[0]
        })
      )
    });

    return Promise.all(palettePromises);
  })
};

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette);
};

exports.seed = (knex, Promise) => {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      let projectPromises = [];

      projectsData.forEach(project => {
        projectPromises.push(createProject(knex, project));
      });

      return Promise.all(projectPromises);
    })
    .catch(error => console.log(`Error seeing data: ${error}`));
};


