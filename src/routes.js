const express = require('express');

const routes = express.Router();

const ProjectsController = require('./controllers/ProjectsController');
const TasksController = require('./controllers/TasksController');

// Projects routes
routes.get('/projects', ProjectsController.index);
routes.post('/projects', ProjectsController.store);
routes.put('/projects/:id', ProjectsController.update);
routes.delete('/projects/:id', ProjectsController.destroy);

// Tasks routes
routes.post('/projects/:id/tasks', TasksController.store);
module.exports = routes;