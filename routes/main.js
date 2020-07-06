const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID});
const router = vertex.router();

const ProjectController = require('../controllers/ProjectController');
const ServiceController = require('../controllers/ServiceController');

router.get('/', (req, res) => {
  const data = req.context;
  const projectCtr = new ProjectController();
  const serviceCtr = new ServiceController();

  projectCtr.get()
    .then(projects => {
      data['projects'] = projects;
      // console.log('Projects ' + JSON.stringify(projects));
      res.render('landing', data);
    })
    .catch(err => {
      res.send('Error: ' + err.message);
    });

    // services controller
  serviceCtr.get()
    .then(services => {
      data.services = services;
      console.log('Services ' + JSON.stringify(services));
      // res.render('landing', data);
    })
    .catch(err => {
      res.send('Error: ' + err.message);
    });
  // posts controller
    
});

router.get('/', (req, res) => {
  
});

router.get('/project/:slug', (req, res) => {
  const data = req.context;
  const projectSlug = req.params.slug;

  const projectCtr = new ProjectController();
  projectCtr.get({slug:projectSlug})
    .then(projects => {
      if (projects.length == 0){
        throw new Error('Project not found');
        return
      }

      const project = projects[0];
      data['project'] = project;
      res.render('project', data);
    })
    .catch(err => {
      res.send('Error -' + err.message);
    });
});

router.get('/blog', (req, res) => {
  res.send('<h1>Welcome to the Blog</h1>');
  // res.render('posts', data);
});

module.exports = router;