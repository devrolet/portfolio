const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID});
const router = vertex.router();

const ProjectController = require('../controllers/ProjectController');

router.get('/', (req, res) => {
  const data = req.context;

  const projectCtr = new ProjectController();

  projectCtr.get()
    .then(projects => {
      console.log('Projects ' + JSON.stringify(projects));
      res.render('landing', data);
    })
    .catch(err => {
      res.send('Error: ' + err.message);
    });
});

module.exports = router;