const express = require('express');
const {body} = require('express-validator');
const routes = express.Router();

const ProjectsController = require('./controllers/ProjectsController');
const TasksController = require('./controllers/TasksController');

// Projects routes
routes.get('/projects', ProjectsController.index);
routes.post('/projects', [
    body('title')
    .isLength({min: 5})
    .trim()
], ProjectsController.store);
routes.put('/projects/:id', [
    body('title')
    .isLength({min: 5})
    .trim()
], ProjectsController.update);
routes.delete('/projects/:id', ProjectsController.destroy);

// Tasks routes
routes.post('/projects/:id/tasks', [
    body('title')
    .isLength({min: 5})
    .trim()
], TasksController.store);

module.exports = routes;