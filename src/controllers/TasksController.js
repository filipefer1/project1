const Task = require('../models/task');
const Project = require('../models/project');

module.exports = {
    async store(req, res, next) {
        const {title} = req.body;
        const {id: projectId} = req.params;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data is incorrect.');
            error.statusCode = 422;
            error.data = errors.array();
            next(error);
        };

        try {
            
            const task = new Task({
                title,
                projeto: projectId
            });
    
            const savedTask = await task.save();
    
            const project = await Project.findById(projectId);
 
            if (!project) {
                const error = new Error('Project not found!');
                error.statusCode = 404;
                throw error;
            }
            
            project.tasks.push(savedTask);

            await project.save()
    
            return res.status(201).json(savedTask);

        } catch(err) {

            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        };
    }
}