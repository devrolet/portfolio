const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID});
const router = vertex.router();

const controllers = require('../controllers');
// 

router.get('/', (req, res) => {
  const data = req.context;
  const ctr = new controllers.project();
  ctr.get()
    .then(projects => {
      data.projects = projects;
      const servicesCtr = new controllers.service();
      return servicesCtr.get();
    })
    .then(services => {
      data.services = services;
      const postsCtr = new controllers.post();
      return postsCtr.get();
    })
    .then(posts => {
      data.posts = posts;
      data.post1 = posts[0];
      data.post2 = posts[1];
      data.post3 = posts[2];

      res.render('landing', data);
    })
    .catch(err => {
      res.json({
        confirmation: 'fail',
        message: err.message
      });
    });
});

router.get('/project/:slug', (req, res) => {
  const data = req.context;
  const projectSlug = req.params.slug;

  const projectCtr = new controllers.project();
  projectCtr.get({slug:projectSlug})
    .then(projects => {
      if (projects.length == 0){
        throw new Error('Project not found');
        return
      }

      const project = projects[0];
      data.project = project;
      res.render('project', data);
    })
    .catch(err => {
      res.send('Error -' + err.message);
    });
});

router.get('/post/:slug', (req, res) => {
  const data = req.context;
  const postSlug = req.params.slug;
  const postCtr = new controllers.post();

  postCtr.get({slug:postSlug})
    .then(posts => {
      if (posts.length == 0){
        throw new Error('Post not found');
        return
      }

      const post = posts[0];
      data.post = post;
      res.render('post', data);
    })
    .catch(err => {
      res.send('Error -' + err.message);
    });
});

router.get('/blog', (req, res) => {
  const data = req.context; // {cdn:<STRING>, global:<OBJECT>}

	let ctr = new controllers.post();
	ctr.get()
	.then(posts => {
		data.posts = posts;
    	res.render('blog', data);
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		});
	});
});

module.exports = router;